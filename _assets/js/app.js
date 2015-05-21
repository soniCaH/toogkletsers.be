$(document).foundation('interchange', 'reflow');


var $container = $('.isotope').isotope({
  layoutMode: 'packery',
  itemSelector: '.item'
});

// layout Isotope again after all images have loaded
$container.imagesLoaded( function() {
  $container.isotope('layout');
});
