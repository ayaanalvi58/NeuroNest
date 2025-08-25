document.addEventListener("DOMContentLoaded", () => {
  const iframeContainer = document.querySelector(".iframe-container");
  
  // Slide in on load
  iframeContainer.classList.add("slide-in");
  
  // Optional: fade in any other elements as you scroll
  const fadeElements = document.querySelectorAll(".fade-on-scroll");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => observer.observe(el));
});
