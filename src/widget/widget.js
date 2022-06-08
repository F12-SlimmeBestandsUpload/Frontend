let override= null;
let key = null;
let connection_state = 0; //receiving QR=0, receiving bitmap=1



const socket = new WebSocket('ws://'+getIpOfServer()+':6969');
socket.addEventListener('message', async function (event) {

  if(connection_state == 0) {
    let img = document.getElementById("result");
    img.src = event.data;
    connection_state= 1;
    return
  }

  let Json = JSON.parse(event.data);
  console.log(atob(Json["key"]))
  key = await importSecretKey(str2ab(atob(Json["key"])));

  let reference = Json["references"][0]
  console.log(key)



   getReference(reference, async function(blob){
     let img = document.getElementById("tex");
     img.src = "https://media.istockphoto.com/vectors/legal-document-vector-id166011405";
    // console.log(blob);
    // const arr = [255,255,255,255,40,92,143,2,1,1,1,1];
    // const iv = new Uint8Array(arr);
    // try{
    //   blob = await window.crypto.subtle.decrypt({
    //     name: "AES-GCM",
    //     iv: iv
    //   }, key, blob)
    // } catch(error){
    //
    //  }
    // console.log(blob)
    // let reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = function() {
      // let base64data = reader.result;
      // let img = document.getElementById("tex");
    // }

   });
})

function getIpOfServer(){
  let ipPlusRoute = location.hostname;
  if(override!= null){
    ipPlusRoute = override;
  }
  return ipPlusRoute;
}

function getReference(url, callback) {
  let xhr = new XMLHttpRequest();
  let ip = "http://" + getIpOfServer() + ":8000";
  xhr.open('get', ip + "/ttl-reference?ref=" + url);
  xhr.onload = function () {
    callback(this.response);
  };
  xhr.send();
}

function str2ab(str) {
  const buff = new ArrayBuffer(str.length);
  const buffView = new Uint8Array(buff);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    buffView[i] = str.charCodeAt(i);
  }
  console.log(buff)
  return buff;
}

function importSecretKey(rawKey) {
  return window.crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );
}
