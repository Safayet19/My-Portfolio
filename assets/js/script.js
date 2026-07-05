const menuButton = document.getElementById("menu");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const scrollTopBtn = document.getElementById("scroll-top");

menuButton.addEventListener("click", () => {
  navbar.classList.toggle("open");
  const isOpen = navbar.classList.contains("open");
  menuButton.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  const scrollY = window.scrollY;
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  if (scrollY > 600) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Typing effect
const typedElement = document.querySelector(".typing-text");
const typingWords = [
  "Machine Learning",
  "Deep Learning",
  "Federated Learning",
  "Explainable AI",
  "Agentic AI",
  "Software Development",
  "Cybersecurity"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const currentWord = typingWords[wordIndex];

  if (!isDeleting) {
    typedElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex += 1;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeText, 1400);
      return;
    }
  } else {
    typedElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex -= 1;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  setTimeout(typeText, isDeleting ? 45 : 85);
}

if (typedElement) {
  typeText();
}

// Particle background for home section
const canvas = document.getElementById("particles-js");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  initParticles();
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1.2;
    this.speedX = Math.random() * 0.7 - 0.35;
    this.speedY = Math.random() * 0.7 - 0.35;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 1.15;
        this.y -= Math.sin(angle) * force * 1.15;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(37, 99, 235, 0.42)";
    ctx.shadowColor = "rgba(37, 99, 235, 0.26)";
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 45 : 95;
  for (let i = 0; i < count; i += 1) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a += 1) {
    for (let b = a + 1; b < particles.length; b += 1) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 135) {
        ctx.strokeStyle = `rgba(37, 99, 235, ${0.48 - distance / 290})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

if (canvas) {
  resizeCanvas();
  animateParticles();
}

// Contact form: open Gmail compose with the visitor's message pre-filled.
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "Portfolio Message").trim();
    const message = String(formData.get("message") || "").trim();

    const body = [
      message,
      "",
      "---",
      `Name: ${name}`,
      `Email: ${email}`
    ].join("\n");

    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", "safayeullah019@gmail.com");
    gmailUrl.searchParams.set("su", subject);
    gmailUrl.searchParams.set("body", body);

    window.open(gmailUrl.toString(), "_blank", "noopener,noreferrer");
    contactForm.reset();
  });
}
