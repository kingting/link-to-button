var sectionHeight = function() {
  var total = $(window).height(),
      $section = $('section').css('height', 'auto');

  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height', 'auto');
  }
}

$(window).resize(sectionHeight);

$(document).ready(function() {
  // Generate the Table of Contents
  $("section h1, section h2, section h3").each(function() {
    console.log("Heading found:", $(this).text());
    var $heading = $(this); // Select the current heading
    var id = $heading.text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''); // Create an ID based on the heading text
    $heading.attr("id", id); // Set the ID attribute of the heading

    // Append a new list item to the TOC's <ul> with a link to the heading
    var $listItem = $("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + id + "'>" + $heading.text() + "</a></li>");
    console.log("Appending list item:", $listItem[0]);
    $("nav#toc ul").append($listItem);
  });

  // Highlight the first TOC item
  $("nav#toc ul li:first-child a").parent().addClass("active");

  // Smooth scrolling for TOC links
  $("nav#toc ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190; // Calculate the position to scroll to
    $("html, body").animate({ scrollTop: position }, 400); // Animate the scrolling
    $("nav#toc ul li a").parent().removeClass("active"); // Remove the active class from all TOC items
    $(this).parent().addClass("active"); // Add the active class to the clicked TOC item
    event.preventDefault(); // Prevent the default link behavior
  });

  sectionHeight();
  $('img').on('load', sectionHeight); // Adjust section height when images load
});
