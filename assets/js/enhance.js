// Lightweight section interactions. The home section is intentionally untouched.
(function () {
  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn, { once: true });

  ready(() => {
    const sectionIds = [
      "about",
      "skills",
      "education",
      "projects",
      "experience",
      "research",
      "certifications",
      "contact"
    ];

    const staggerSelectors = [
      ".about-grid",
      ".about-mini-grid",
      ".about-points",
      ".skills-grid",
      ".education-wrapper",
      ".projects-grid",
      ".experience-list",
      ".research-grid",
      ".certification-showcase",
      ".contact-layout"
    ];

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const heading = section.querySelector(".section-heading");
      if (heading) heading.dataset.reveal = "up";

      staggerSelectors.forEach((selector) => {
        section.querySelectorAll(selector).forEach((element) => {
          element.dataset.stagger = "";
        });
      });
    });

    const revealTargets = document.querySelectorAll(
      "[data-reveal], [data-stagger], .skill-card"
    );

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
      );

      revealTargets.forEach((element) => revealObserver.observe(element));
    } else {
      revealTargets.forEach((element) => element.classList.add("in-view"));
    }
  });
})();

// Project details and image gallery.
(function () {
  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn, { once: true });

  ready(() => {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    const image = document.getElementById("pmImage");
    const previous = document.getElementById("pmPrev");
    const next = document.getElementById("pmNext");
    const dots = document.getElementById("pmDots");
    const type = document.getElementById("pmType");
    const title = document.getElementById("pmTitle");
    const description = document.getElementById("pmDesc");
    const highlights = document.getElementById("pmHighlights");
    const technology = document.getElementById("pmTech");
    const github = document.getElementById("pmGithub");
    const closeButton = modal.querySelector(".project-modal__close");
    const fallbackImage = "./assets/images/projects/project-fallback.svg";

    const projects = {
      "student-excuse": {
        type: "Desktop Application",
        icon: "fa-solid fa-file-circle-check",
        title: "Student Excuse Generator",
        description: "A Java and JavaFX application that generates polished student excuse documents. Built with a clean OOP structure, it takes structured user input, processes it through templated logic, and outputs ready-to-submit formatted documents — including validation, reusable components, and file handling.",
        highlights: [
          "Java and JavaFX interface with a clear workflow",
          "Template-driven excuse generation engine",
          "Structured input validation and error handling",
          "File handling for export and reuse",
          "Modular OOP design for easy extension"
        ],
        technology: ["Java", "JavaFX", "OOP", "GUI", "File Handling"],
        github: "https://github.com/Safayet19/Student-Excuse-Generator",
        images: [
          "./assets/images/optimized/projects/student-excuse/01-login.webp",
          "./assets/images/optimized/projects/student-excuse/02-dashboard.webp",
          "./assets/images/optimized/projects/student-excuse/03-generate-excuse.webp"
        ]
      },
      hospital: {
        type: "Desktop Application",
        icon: "fa-solid fa-hospital",
        title: "Hospital Management System",
        description: "A Java and JavaFX based hospital management application for managing hospital records, patients, doctors, appointments, and administrative workflow. Built with an OOP-driven architecture and database-backed persistence for reliable day-to-day operations.",
        highlights: [
          "Patient, doctor, and staff record management",
          "Appointment scheduling and tracking",
          "Role-based dashboards and workflow screens",
          "Database-backed persistence with clean data models",
          "OOP architecture for maintainability and extension"
        ],
        technology: ["Java", "JavaFX", "OOP", "Database", "GUI"],
        github: "https://github.com/Safayet19/Hospital-Management-System-JavaFX-",
        images: [
          "./assets/images/optimized/projects/hospital/01-login.webp",
          "./assets/images/optimized/projects/hospital/02-admin-dashboard.webp",
          "./assets/images/optimized/projects/hospital/03-doctor-dashboard.webp",
          "./assets/images/optimized/projects/hospital/04-feedback.webp"
        ]
      },
      "plant-disease": {
        type: "Deep Learning",
        icon: "fa-solid fa-seedling",
        title: "Plant Disease Recognition",
        description: "A CNN-based plant disease recognition web app that classifies plant leaf conditions using deep learning image classification. Users upload a leaf image and the trained model predicts the disease class from a curated dataset.",
        highlights: [
          "Convolutional Neural Network trained on a plant leaf dataset",
          "Instant disease classification from uploaded images",
          "Clear upload interface with image preview",
          "Result panel with the detected disease label",
          "Lightweight interactive web application"
        ],
        technology: ["Python", "CNN", "Deep Learning", "TensorFlow", "Image Classification"],
        github: "https://github.com/Safayet19/Plant-Disease-Detection-CNN-model",
        images: [
          "./assets/images/optimized/projects/plant-disease/01-upload.webp",
          "./assets/images/optimized/projects/plant-disease/02-result.webp"
        ]
      }
    };

    let currentProject = null;
    let currentImage = 0;
    let returnFocus = null;

    function projectData() {
      return projects[currentProject];
    }

    function updateDots() {
      Array.from(dots.children).forEach((dot, index) => {
        dot.classList.toggle("is-active", index === currentImage);
        dot.setAttribute("aria-current", index === currentImage ? "true" : "false");
      });
    }

    function showImage(index) {
      const project = projectData();
      if (!project) return;

      currentImage = (index + project.images.length) % project.images.length;
      image.classList.add("swap");

      window.setTimeout(() => {
        image.src = project.images[currentImage];
        image.alt = `${project.title} screenshot ${currentImage + 1} of ${project.images.length}`;
        image.classList.remove("swap");
      }, 150);

      updateDots();
    }

    function buildDots() {
      const project = projectData();
      dots.replaceChildren();

      project.images.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Show screenshot ${index + 1}`);
        dot.addEventListener("click", () => showImage(index));
        dots.appendChild(dot);
      });

      updateDots();
    }

    function openModal(key, trigger) {
      const project = projects[key];
      if (!project) return;

      currentProject = key;
      currentImage = 0;
      returnFocus = trigger;

      type.innerHTML = `<i class="${project.icon}"></i> ${project.type}`;
      title.textContent = project.title;
      description.textContent = project.description;
      highlights.replaceChildren(
        ...project.highlights.map((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          return listItem;
        })
      );
      technology.replaceChildren(
        ...project.technology.map((item) => {
          const tag = document.createElement("span");
          tag.textContent = item;
          return tag;
        })
      );
      github.href = project.github;
      image.src = project.images[0];
      image.alt = `${project.title} screenshot 1 of ${project.images.length}`;
      buildDots();

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      closeButton.focus();
    }

    function closeModal() {
      if (!modal.classList.contains("is-open")) return;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      if (returnFocus) returnFocus.focus();
    }

    document.querySelectorAll("[data-project]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openModal(trigger.dataset.project, trigger);
      });
    });

    modal.querySelectorAll("[data-close]").forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    previous.addEventListener("click", () => showImage(currentImage - 1));
    next.addEventListener("click", () => showImage(currentImage + 1));

    image.addEventListener("error", () => {
      if (!image.src.endsWith("project-fallback.svg")) image.src = fallbackImage;
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showImage(currentImage - 1);
      if (event.key === "ArrowRight") showImage(currentImage + 1);
    });
  });
})();
