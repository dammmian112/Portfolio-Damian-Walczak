document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});


// Karuzela umiejętności
const track = document.querySelector(".skills-track");
let index = 0;

function moveCarousel() {
  index++;
  if (index >= track.children.length / 2) {
    index = 0;
  }
  const offset = -index * track.children[0].offsetWidth;
  track.style.transform = `translateX(${offset}px)`;
}

let carouselInterval = setInterval(moveCarousel, 2000);

// Zatrzymaj karuzelę po najechaniu na kartę
track.addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

// Wznów karuzelę po opuszczeniu kursora
track.addEventListener("mouseleave", () => {
  carouselInterval = setInterval(moveCarousel, 2000);
});

document
  .querySelector(".scroll-to-top")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

particlesJS.load("particles-js", "particles.json", function () {
  console.log("Particles.js loaded!");
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Wysyłanie danych do backendu
    fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd sieciowy lub serwerowy");
        }
        return response.text();
      })
      .then((data) => {
        alert(data); // Pokazuje odpowiedź z backendu
        document.getElementById("contactForm").reset(); // Czyści formularz po wysłaniu
      })
      .catch((error) => {
        console.error("Błąd:", error);
        alert("Wystąpił błąd podczas wysyłania wiadomości.");
      });
  });

document
  .querySelector('.hero-buttons a[href="#contact"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });

function expandProject(event, button) {
  event.preventDefault();
  const projectCard = button.closest(".project-card");

  // Zwiń wszystkie inne rozszerzone karty
  document.querySelectorAll(".project-card.expanded").forEach((card) => {
    if (card !== projectCard) {
      card.classList.remove("expanded");
    }
  });

  // Przełącz stan klikniętej karty
  projectCard.classList.toggle("expanded");

  // Blokuj przewijanie strony, gdy karta jest rozszerzona
  document.body.style.overflow = projectCard.classList.contains("expanded")
    ? "hidden"
    : "auto";
}

// Zamknij rozszerzoną kartę po kliknięciu poza nią
document.addEventListener("click", (event) => {
  const expandedCard = document.querySelector(".project-card.expanded");
  if (expandedCard && !expandedCard.contains(event.target)) {
    expandedCard.classList.remove("expanded");
    document.body.style.overflow = "auto";
  }
});

// Funkcja do powiększania zdjęć po kliknięciu
function setupImageZoom() {
  const images = document.querySelectorAll(".additional-images img");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      const zoomContainer = document.createElement("div");
      zoomContainer.classList.add("zoom-container");

      const zoomedImage = document.createElement("img");
      zoomedImage.src = image.src;
      zoomedImage.classList.add("zoomed-image");

      zoomContainer.appendChild(zoomedImage);

      document.body.appendChild(zoomContainer);

      zoomContainer.addEventListener("click", () => {
        document.body.removeChild(zoomContainer);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", setupImageZoom);

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) {
    console.error("Nie znaleziono elementów nawigacji!");
    return;
  }

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
