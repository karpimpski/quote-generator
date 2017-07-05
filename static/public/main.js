request('/photo', function(data){
  document.getElementById('result').innerHTML = '<img src="'+data+'" class="photo">';
  
});

function request(url, cb){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
  
  var data = xmlHttp.responseText;
  
  cb(data);
}
