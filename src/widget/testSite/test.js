let ipServer = "localhost";
let portServer = "8000" ;
let httpVSHttps = "http";

let keyElement = document.getElementById('key');
let ivElement = document.getElementById('iv');
let referencesElement = document.getElementById('references');

let key;
let keyString;
let iv;
let references = ["5ee5d7cf-b1ff-4aeWOAHc-bd5e-97894d6b2709", "5ee5d7cf-b1ff-4aec-bd5e-97894d6b2709"];

window.addEventListener("message", async (event) => {
  // extract the data from the message event
  const { data } = event;
  let data2 = JSON.parse(JSON.stringify(data, null, 2)).request.data;
  // display it in our textarea as formatted JSON
  keyElement.innerHTML += data2.keyString;
  ivElement.innerHTML += data2.iv[0];
  for(let each in data2.iv) {
    if(each!= 0) {
      ivElement.innerHTML += ", "+data2.iv[each];
    }
  }
  referencesElement.innerHTML += data2.references;
  key = data2.key;
  keyString = data2.keyString;
  iv = data2.iv;
  references = data2.references;
});

function accept(){
    let xhr = new XMLHttpRequest();
    let ip = httpVSHttps+"://" + ipServer + ":"+portServer;
    xhr.open('post', ip + "/finalize");
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = {"reference": references};
    xhr.send(JSON.stringify(data));
}
