//settable variables
let ipServer = "localhost";
let portServer = "8000" ;
let portWebsocket = "6969" ;
let httpVSHttps = "https";

let override= null;
let connection_state = 0; //receiving QR=0, receiving imageInfo=1
let references = [];
let blobs = [];
let selectedBlob;


const socket = new WebSocket('ws://'+ipServer+":"+portWebsocket);
socket.addEventListener('message', async function (event) {

  if (connection_state == 0) {
    let img = document.getElementById("QR-code");
    img.src = event.data;
    connection_state = 1;
    return
  }
  this.references = [];
  blobs = [];

  let [keyString, key, iv, references] = await parseJson(event.data);
  const data = {};
  data.iv = iv;
  data.key = key;
  data.keyString = keyString;
  data.references = references;
  const response = {
    success: true,
    request: { data },
  };
  parent.postMessage(response);

  this.references = references;
  for (const reference of references) {
    getReference(reference, async function (blob) {

      blob = await blob.arrayBuffer();

      let decryptedBlob = await decrypt(blob, key, iv)

      addImage(decryptedBlob)

      //initialize first image
      if( selectedBlob === undefined){
        changeSelection(0)
      }
    });
  }
})

async function parseJson(data){
  //parse as Json
  let Json = JSON.parse(data);
  //parse the IV
  let iv = JSON.parse(Json.iv)
  iv = Uint8Array.from(iv);
  //parse the key
  let key = JSON.parse(Json.key)
  let keyString = key.k;
  key = await importSecretKey(key)
  //get references
  let references = Json["references"]
  return [keyString, key, iv, references]
}

async function importSecretKey(jwk) {
  return await window.crypto.subtle.importKey(
    "jwk",
    jwk,
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

function getReference(url, callback) {
  let xhr = new XMLHttpRequest();
  let ip = httpVSHttps+"://" + ipServer + ":"+portServer;
  xhr.open('get', ip + "/ttl-reference?ref=" + url);
  xhr.responseType = "blob";
  xhr.overrideMimeType('binary');
  xhr.onload = function () {
    callback(this.response);
  };
  xhr.send();
}

async function decrypt(blob, key, iv){
  return await window.crypto.subtle.decrypt({
    name: "AES-GCM",
    iv: iv
  }, key, blob)
}


// image selection
function goLeft(){
  if(selectedBlob=== undefined){
    return
  }
  if(selectedBlob == 0){
    changeSelection(blobs.length-1)
  }
  else{
    changeSelection(selectedBlob-1)
  }
}

function goRight(){
  if(selectedBlob=== undefined){
    return
  }
  if(selectedBlob == blobs.length-1){
    changeSelection(0)
  }
  else{

    changeSelection(selectedBlob+1)
  }
}

function changeSelection(index){
  selectedBlob = index;
  let img = document.getElementById("tex");
  img.src = URL.createObjectURL(new Blob([blobs[index]]));
}

function addImage(blob){
  blobs.push(blob)
}

