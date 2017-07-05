var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", '/photo', false );
xmlHttp.send( null );

var data = JSON.parse(xmlHttp.responseText);
console.log(data);

document.querySelector('body').innerHTML += '<img src="'+data.url+'">';