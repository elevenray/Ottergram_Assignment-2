var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var currentSlide = 0;


function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
  detailImage.setAttribute('src', imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR)
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
  // print title to console
  // var title = thumbnail.getAttribute('data-image-title');
  // console.log(title);
  // return title;
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail),titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailsArray = [].slice.call(thumbnails);
  return thumbnailsArray;
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function plusSlide(){
  if (currentSlide === 4) {
    currentSlide = 0;
    showSlide(currentSlide)
  }
  else {
    currentSlide++;
    showSlide(currentSlide);
  }
}
function minusSlide(){
  if (currentSlide === 0){
    currentSlide = 4;
    showSlide(currentSlide);
  }
  else {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function showSlide(n) {
  'use strict';
  var slide = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  setDetailsFromThumb(slide[n]);
}

//Take the list and convert it to an array
function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function (event) {
     event.preventDefault();
     console.log(event.keyCode);
     if (event.keyCode === ESC_KEY) {
       hideDetails();
     }
  });
}
initializeEvents();
