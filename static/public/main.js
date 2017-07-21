var background = document.getElementById('background');
var text = document.getElementById('text');

var secondBackground = document.getElementById('second_background');
var secondText = document.getElementById('second_text');

setPage();

document.addEventListener('click', clickFunction);

function clickFunction(){
  console.log('click');
  document.removeEventListener('click', clickFunction);
  console.log('gone');
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
}

function getResources(cb){
  request('/photo', function(photoData){
    request('/quote', function(quoteData){
      console.log(quoteData.quoteText);
      cb({photo: photoData.photo, text: quoteData.quoteText});
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
      console.log('back');
      setTimeout(function(){
        document.addEventListener('click', clickFunction);
      }, 20);
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
