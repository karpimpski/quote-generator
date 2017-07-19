var background = document.getElementById('background');
var text = document.getElementById('text');

setPage();

document.addEventListener('click', function(){
  setPage();
});

function getResources(cb){
  request('/photo', function(photoData){
    var photo = photoData.photo;
    request('/quote', function(quoteData){
      quoteData = JSON.parse(quoteData);
      console.log(quoteData.quoteText);
      var text = quoteData.quoteText;
      cb({photo: photo, text: text});
    });
  });
}

function setPage(){
  getResources(function(first){
    background.style.backgroundImage = "url('"+first.photo+"')";
    text.innerHTML = first.text;
    getResources(function(second){
      background.style.backgroundImage = "url('"+second.photo+"')";
      text.innerHTML = second.text;
    });
  });
}



function request(url, cb){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
  
  var data = JSON.parse(xmlHttp.responseText);
  
  cb(data);
}
