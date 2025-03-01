document.addEventListener("DOMContentLoaded", function () {
  const typewriterText = document.querySelector('#mateo-name');
  // Typewriter Effect
  const text = "Mateo ";  // The text to type
  const speed = 100;  // Speed of typing
  const textElement = document.querySelector(".typewriter-text");
  let textIndex = 0;  // Track which character we're typing

  // Function to type the text
  function typeWriter() {
    if (textIndex < text.length) {
      textElement.innerHTML += text.charAt(textIndex);
      textIndex++;
      setTimeout(typeWriter, speed);  // Continue typing
    } else {
      setTimeout(eraseText, 1000);  // Wait for 1 second before erasing
    }
  }

  // Function to erase the text
  function eraseText() {
    if (textElement.innerHTML.length > 0) {
      textElement.innerHTML = textElement.innerHTML.slice(0, -1);  // Remove one character at a time
      setTimeout(eraseText, 50);  // Continue erasing
    } else {
      textIndex = 0;  // Reset to start typing "Mateo" again
      setTimeout(typeWriter, 500);  // Wait for half a second before typing again
    }
  }

// Start typing when the page loads
  window.onload = typeWriter;
});

$(document).ready(function () {
  $(".menu-toggle").click(function () {
    $(".menu-toggle").toggleClass("menu-open");
    $(".menu").toggleClass("active");
  });
  $(".link").click(function () {
    $(".menu-toggle").toggleClass("menu-open");
    $(".menu").toggleClass("active");
  });
  $(".videoOne").click(function () {
    $(".overlayOne").toggleClass("active");
  });
  $(".videoTwo").click(function () {
    $(".overlayTwo").toggleClass("active");
  });
  $(".videoThree").click(function () {
    $(".overlayThree").toggleClass("active");
  });
  $(".videoFour").click(function () {
    $(".overlayFour").toggleClass("active");
  });
  $(".closeOverlayOne").click(function () {
    $(".overlayOne").toggleClass("active");
  });
  $(".closeOverlayTwo").click(function () {
    $(".overlayTwo").toggleClass("active");
  });
  $(".closeOverlayThree").click(function () {
    $(".overlayThree").toggleClass("active");
  });
  $(".closeOverlayFour").click(function () {
    $(".overlayFour").toggleClass("active");
  });
});


<!--Cursor effect in javascript-->

document.addEventListener("DOMContentLoaded", function () {
  const coords = { x: 0, y: 0 };
  const circles = [];
  const colors = [
    "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
    "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
    "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
    "#680060", "#60005f", "#48005f", "#3d005e"
  ];

  // Function to create circles
  function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    document.body.appendChild(circle);
    circles.push(circle);
  }

  // Create the initial set of circles
  for (let i = 0; i < 20; i++) {
    createCircle();
  }

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  // When mouse is clicked, transform the circle at the mouse position into a ring
  window.addEventListener("mousedown", function (e) {
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Find the nearest circle to the click position
    let closestCircle = null;
    let minDistance = Infinity;

    circles.forEach(function (circle) {
      const circleRect = circle.getBoundingClientRect();
      const distance = Math.sqrt(Math.pow(clickX - circleRect.left, 2) + Math.pow(clickY - circleRect.top, 2));
      if (distance < minDistance) {
        minDistance = distance;
        closestCircle = circle;
      }
    });

    // Add the click animation (ring effect) to the closest circle
    if (closestCircle) {
      closestCircle.classList.add("circle-click");

      // Remove the ring effect after animation is done (0.6s)
      setTimeout(() => {
        closestCircle.classList.remove("circle-click");
      }, 600);
    }
  });

  // Reset effect when the mouse starts moving again
  window.addEventListener("mousemove", function () {
    // Reset all circles to their normal state (removes ring effect)
    circles.forEach(function (circle) {
      circle.classList.remove("circle-click");
    });
  });

  // Function to animate circles in normal trailing effect
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      circle.style.backgroundColor = colors[index % colors.length];

      // Position the circles close to each other
      circle.style.left = `${x - 7}px`;
      circle.style.top = `${y - 7}px`;

      // Scale the circles based on their position in the array
      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

      // Update the position for the next circle
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.offsetLeft - x) * 0.4;  // Tighter following
      y += (nextCircle.offsetTop - y) * 0.4;   // Tighter following
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
});

$(document).ready(function() {
  let currentPage = 1;
  const photosPerPage = 6;
  const totalPhotos = $(".photo-card").length;
  const totalPages = Math.ceil(totalPhotos / photosPerPage);

  function showPage(page) {
    $(".photo-card").hide();  // Hide all photos
    const startIndex = (page - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    $(".photo-card").slice(startIndex, endIndex).show();  // Show only photos for the current page

    // Update the page number
    $(".page-number").text(page);

    // Disable the Prev/Next buttons when on the first/last page
    if (page === 1) {
      $(".prev").prop("disabled", true);
    } else {
      $(".prev").prop("disabled", false);
    }

    if (page === totalPages) {
      $(".next").prop("disabled", true);
    } else {
      $(".next").prop("disabled", false);
    }
  }

  // Show the first page by default
  showPage(currentPage);

  // Pagination Controls
  $(".next").click(function() {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  $(".prev").click(function() {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });
});

$(document).ready(function() {
  let currentPage = 1;
  const itemsPerPage = 3;  // Adjust the number of videos per page
  const totalVideos = $(".video-card").length;
  const totalPages = Math.ceil(totalVideos / itemsPerPage);

  // Function to show videos for the current page
  function showPage(page) {
    $(".video-card").hide();  // Hide all videos
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    $(".video-card").slice(startIndex, endIndex).show();  // Show only videos for the current page

    // Update the page number
    $(".page-number").text(page);

    // Disable Prev/Next buttons when on the first/last page
    $(".prev").prop("disabled", page === 1);
    $(".next").prop("disabled", page === totalPages);
  }

  // Show the first page by default
  showPage(currentPage);

  // Pagination Controls
  $(".next").click(function() {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  $(".prev").click(function() {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });
});












