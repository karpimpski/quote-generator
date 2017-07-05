var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", '/photo', false );
xmlHttp.send( null );

var data = xmlHttp.responseText;
console.log(data)
document.getElementById('result').innerHTML = '<img src="'+data+'" class="photo">';
