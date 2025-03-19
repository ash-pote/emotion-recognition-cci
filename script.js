// Select the path and calculate its total length
let line = document.querySelector(".theGreenLine");
let pathLength = line.getTotalLength();

// Set up the initial stroke-dasharray and stroke-dashoffset for the path
line.style.strokeDasharray = pathLength;
line.style.strokeDashoffset = pathLength;

// Create an IntersectionObserver to detect when the line enters the screen
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: line,
          strokeDashoffset: 0,
          easing: "easeInOutQuad",
          duration: 1500,
        });
        observer.unobserve(line); // Stop observing after animation starts
      }
    });
  },
  { threshold: 1 } // Lower threshold to trigger earlier
);

// Start observing the line element
observer.observe(line);

// Track position of the line relative to viewport
let lineTop = line.getBoundingClientRect().top + window.scrollY;
let triggerPoint = lineTop - 300; // Adjust trigger point

// Scroll-based animation for gradual stroke reveal
window.addEventListener("scroll", function () {
  let scrollY = window.scrollY;

  if (scrollY >= triggerPoint) {
    let scrollPercent =
      (scrollY - triggerPoint) /
      (document.documentElement.scrollHeight -
        triggerPoint -
        window.innerHeight);

    let progressAction = Math.min(Math.max(scrollPercent, 0), 1); // Clamp between 0-1

    anime({
      targets: line,
      strokeDashoffset: pathLength - progressAction * pathLength,
      easing: "linear",
      duration: 50, // Smooth animation updates
    });
  }
});

/* Animate circles with scrolltrigger */

// GSAP animation for the circle
gsap.utils.toArray(".circle").forEach(function (circle) {
  gsap.to(circle, {
    scrollTrigger: {
      trigger: circle, // The trigger is the current `.circle` element
      start: "top 90%", // Trigger animation when the circle is 70% down the viewport
      end: "top 0%", // End the animation when the circle reaches 0% of the viewport
      scrub: false, // Disable scrubbing for smoother animation
      markers: false, // Optional: Shows markers for debugging
      onEnter: () => {
        gsap.set(circle, { transformOrigin: "center center" });
        // Animation when the `.circle` enters the viewport
        gsap.to(circle, {
          scale: 200, // Animate the circle to double its size (200%)
          opacity: 1, // Make the circle visible
          ease: "power1.out", // Easing for smooth scaling
          duration: 2, // Duration of the animation
        });
      },
      onLeaveBack: () => {
        // Reverse animation when scrolling up (leaving viewport)
        gsap.to(circle, {
          scale: 0, // Scale back to 0 (hidden again)
          opacity: 0, // Fade out the circle
          ease: "power1.in", // Easing for smooth reverse
          duration: 1, // Duration of the reverse animation
        });
      },
    },
  });
});

gsap.utils.toArray(".text-fade").forEach(function (text) {
  gsap.to(text, {
    scrollTrigger: {
      trigger: text, // The trigger is the current `.text-fade` element
      start: "top 65%", // Trigger animation when the element is 45% down the viewport
      end: "top 0%", // End the animation when the element reaches 0% of the viewport
      scrub: false, // Disable scrubbing for smoother animation
      markers: false, // Optional: Shows markers for debugging
      onEnter: () => {
        // Animation when the `.text-fade` enters the viewport
        gsap.to(text, {
          opacity: 1, // Make the text visible
          ease: "power1.out", // Easing for smooth fade-in
          duration: 2.5, // Duration of the animation
        });
      },
      onLeaveBack: () => {
        // Reverse animation when scrolling up (leaving viewport)
        gsap.to(text, {
          opacity: 0, // Fade out the text
          ease: "power1.in", // Easing for smooth reverse
          duration: 1, // Duration of the reverse animation
        });
      },
    },
  });
});
