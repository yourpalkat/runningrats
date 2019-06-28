var jquery = require("jquery");
window.$ = window.jQuery = jquery;
var jQueryBridget = require('jquery-bridget');
var Flickity = require('flickity');
jQueryBridget( 'flickity', Flickity, $ );

require('@fancyapps/fancybox');
require('flickity-fade');
require('jquery-csv');
require('spectragram');

var data;
var routeData;
let $carousel = $('.main-carousel');

$('[data-fancybox="gallery"]').fancybox({});

$('.hamburger').on('click', function () {
  $('.main-menu').toggleClass('show');
});

$('.exit-responsive').on('click', function () {
  $('.main-menu').toggleClass('show');
});

$carousel.on('ready.flickity', function() {});
$carousel.flickity({
  prevNextButtons: false,
  autoPlay: 5000,
  fade: true
});
$('.main-carousel').flickity('resize');

jQuery.fn.spectragram.accessData = {
  accessToken: '1991068484.b4f806b.bb8f883fbf7e40deb854feaddaf026ce'
};
$('.insta-embed').spectragram('getUserFeed', {
  size: 'small',
  max: 4,
  wrapEachWith: '<div class="insta-photo"></div>'
});

$.ajax({
  type: "GET",
  url: "crew-calendar.csv",
  dataType: "text",
  success: function (response) {
    data = $.csv.toArrays(response);
    generateCalendar(data);
  }
});

function generateCalendar(data) {
  var html = '';

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

$.ajax({
  type: "GET",
  url: "routes.csv",
  dataType: "text",
  success: function (response) {
    routeData = $.csv.toArrays(response);
    generateRouteCards(routeData);
  }
});

function generateRouteCards(routeData) {
  var html = '';
  var currentRoute = {};
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
    // $('.route-wrapper').append(html);
  }
}