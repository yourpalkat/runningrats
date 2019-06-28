let jquery = require("jquery");
window.$ = window.jQuery = jquery;
let jQueryBridget = require('jquery-bridget');
let Flickity = require('flickity');
jQueryBridget('flickity', Flickity, $);

require('@fancyapps/fancybox');
require('flickity-fade');
require('jquery-csv');
require('spectragram');

// GENERAL
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.main-menu').classList.toggle('show');
});

document.querySelector('.exit-responsive').addEventListener('click', () => {
  document.querySelector('.main-menu').classList.toggle('show');
});

// CAROUSEL
let carousel = $('.main-carousel');
carousel.on('ready.flickity', function () {});
carousel.flickity({
  prevNextButtons: false,
  autoPlay: 5000,
  fade: true,
  resize: true
});

// INSTAGRAM
jQuery.fn.spectragram.accessData = {
  accessToken: '1991068484.b4f806b.bb8f883fbf7e40deb854feaddaf026ce'
};

$('.insta-embed').spectragram('getUserFeed', {
  max: 4,
  size: 'small',
  wrapEachWith: '<div class="insta-photo"></div>'
});

// AJAX
let data;
let routeData;

$.ajax({
  type: "GET",
  url: "crew-calendar.csv",
  dataType: "text",
  success: function (response) {
    data = $.csv.toArrays(response);
    generateCalendar(data);
  }
});

$.ajax({
  type: "GET",
  url: "routes.csv",
  dataType: "text",
  success: function (response) {
    routeData = $.csv.toArrays(response);
    generateRouteCards(routeData);
  }
});

function generateCalendar(data) {
  let html = '';
  if (typeof (data[0]) === 'undefined') {
    return null;
  } else {
    $.each(data, function (index, row) {
      if (index == 0) {
        html += '<ul class="crew-table table-header">'
        $.each(row, function (index, colData) {
          html += '<li class="row head">';
          html += colData;
          html += '</li>';
        });
        html += '</ul>';
      } else {
        html += '<ul class="crew-table">';
        $.each(row, function (index, colData) {
          html += '<li class="row">';
          html += colData;
          html += '</li>';
        });
        html += '</ul>';
      }
    });
    $('.crew-table-wrap').append(html);
  }
}

function generateRouteCards(routeData) {
  let html = '';
  let currentRoute = {};
  if (typeof (routeData[0]) === 'undefined') {
    return null;
  } else {
    $.each(routeData, function (index, row) {
      html += '<ul class="crew-table">';
      $.each(row, function (index, colData) {
        html += '<li class="row">';
        html += colData;
        html += '</li>';
      });
      html += '</ul>';
    });
  }
}