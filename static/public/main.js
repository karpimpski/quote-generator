var background = document.getElementById('background');
var text = document.getElementById('text');

var secondBackground = document.getElementById('second_background');
var secondText = document.getElementById('second_text');

setPage();

document.addEventListener('click', function(){
  if(background.classList.contains('inactive')){
    background.classList.remove('inactive');
    secondBackground.classList.add('inactive');
    resetPage(secondBackground, secondText)
  }
  else{
    background.classList.add('inactive');
    secondBackground.classList.remove('inactive');
    resetPage(background, text);
  }
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
      secondBackground.style.backgroundImage = "url('"+second.photo+"')";
      secondText.innerHTML = second.text;
    });
  });
}

function resetPage(bg, txt){
  setTimeout(function(){
    getResources(function(data){
      bg.style.backgroundImage = "url('"+data.photo+"')";
      txt.innerHTML = data.text;
    });
  }, 10);
  
}



function request(url, cb){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false );
  xmlHttp.send( null );
  
  var data = JSON.parse(xmlHttp.responseText);
  
  cb(data);
}
