document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.querySelector(".stars-background");
  
    function createStar() {
      const star = document.createElement("div");
      star.classList.add("star");
  
      const size = Math.random() * 3 + 1; 
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.background = "rgba(255, 255, 255, 0.7)";
      star.style.position = "absolute";

      star.style.top = `${Math.random() * 70 + 15}%`; 
      star.style.left = `${Math.random() * 100}%`;
  
      starsContainer.appendChild(star);
  
      setTimeout(() => {
        star.remove();
      }, 5000);
    }
  
    setInterval(createStar, 150);
  });
  