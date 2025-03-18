// Select the path and calculate its total length
let line = document.querySelector(".theGreenLine");
let pathLength = line.getTotalLength();

let circle = document.querySelector(".circle");
let circle2 = document.querySelector(".circle2");

// Set up the initial stroke-dasharray and stroke-dashoffset for the path
line.style.strokeDasharray = pathLength;
line.style.strokeDashoffset = pathLength;

// Animate the line immediately on page load
anime({
  targets: line,
  strokeDashoffset: 0, // Immediately animate to full visibility
  easing: "easeInOutQuad",
  duration: 0, // No delay for the start, make it instant when the page loads
});

// Track last scroll position
let lastScrollY = window.scrollY;

// Triggering the scroll event
window.addEventListener("scroll", function () {
  let scrollPercent =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  let progressAction = Math.min(Math.max(scrollPercent, 0), 1); // Clamping value between 0 and 1

  // Animate stroke-dashoffset based on scroll position
  anime({
    targets: line,
    strokeDashoffset: pathLength - progressAction * pathLength,
    easing: "linear",
    duration: 50, // Smoothing the animation during scroll
  });

  // Track scroll direction
  let circleProgress = progressAction * pathLength;

  // Animation for the first circle
  if (window.scrollY > lastScrollY) {
    // If scrolling down, trigger circle animation when it reaches specific progress
    if (circleProgress > 200 && circleProgress < 500) {
      anime({
        targets: circle,
        opacity: 1,
        r: 20, // Circle grows bigger
        easing: "easeOutQuad",
        duration: 500,
      });
    } else {
      anime({
        targets: circle,
        opacity: 0,
        r: 5, // Reset circle size
        easing: "easeOutQuad",
        duration: 500,
      });
    }

    // Animation for the second circle
    if (circleProgress > 550 && circleProgress < 950) {
      anime({
        targets: circle2,
        opacity: 1,
        r: 20, // Circle grows bigger
        easing: "easeOutQuad",
        duration: 500,
      });
    } else {
      anime({
        targets: circle2,
        opacity: 0,
        r: 5, // Reset circle size
        easing: "easeOutQuad",
        duration: 500,
      });
    }
  } else {
    // If scrolling up, reset circle to initial state
    anime({
      targets: circle,
      opacity: 0,
      r: 5, // Reset circle size and opacity when scrolling up
      easing: "easeOutQuad",
      duration: 1000,
    });

    anime({
      targets: circle2,
      opacity: 0,
      r: 5, // Reset circle size and opacity when scrolling up
      easing: "easeOutQuad",
      duration: 1000,
    });
  }

  // Update last scroll position
  lastScrollY = window.scrollY;
});
