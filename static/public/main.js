var background = document.getElementById('background');
var text = document.getElementById('text');

setPage();

document.addEventListener('click', function(){
  setPage();
});

function setPage(){
  request('/photo', function(data){
    background.style.backgroundImage = "url('"+data.photo+"')";
    request('/quote', function(d){
      d = JSON.parse(d);
      console.log(d.quoteText);
      text.innerHTML = d.quoteText;
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
