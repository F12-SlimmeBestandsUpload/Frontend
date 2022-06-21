let keyElement = document.getElementById('key');
let ivElement = document.getElementById('iv');
let referencesElement = document.getElementById('references');

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
});
