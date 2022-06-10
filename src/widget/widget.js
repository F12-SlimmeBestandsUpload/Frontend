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
  console.log(Json)
  let iv = Array.from(Json.iv)
  console.log(iv);
  let key = JSON.parse(Json.key)

  key = importSecretKey(Json.key)
  console.log(key)
  let reference = Json["references"][0]



   getReference(reference, async function(blob){
     // let img = document.getElementById("tex");
     // img.src = "https://media.istockphoto.com/vectors/legal-document-vector-id166011405";
      console.log(str2ab(blob))
      blob = blob.arrayBuffer();

      try{
        blob = await window.crypto.subtle.decrypt({
          name: "AES-GCM",
          iv: iv
        }, key, blob)
      } catch(error){
        console.log("huzzah")
      }
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
      let base64data = reader.result;
      let img = document.getElementById("tex");
      img.src = base64data
    }

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
  return buff;
}

async function importSecretKey(rawKey) {
  return await window.crypto.subtle.importKey(
    "jwk",
    key,
    {
      name: "AES-GCM",
    },
    true,
    [
      "encrypt",
      "decrypt"
    ]
  );
}
