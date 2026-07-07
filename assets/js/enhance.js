// Portfolio enhancements — reveal on scroll, stagger, cursor glow, skill fill.
(function () {
  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  ready(() => {
    // 1) Tag sections/cards for animation.
    const sections = ["about", "skills", "education", "projects", "experience", "research", "certifications", "contact"];
    sections.forEach((id) => {
      const sec = document.getElementById(id);
      if (!sec) return;

      if (!sec.querySelector(":scope > .night-bg")) {
        const bg = document.createElement("div");
        bg.className = "night-bg";
        bg.setAttribute("aria-hidden", "true");

        const aurora = document.createElement("span");
        aurora.className = "night-bg__aurora";

        const waves = document.createElement("span");
        waves.className = "night-bg__waves";

        const shooting = document.createElement("span");
        shooting.className = "night-bg__shooting";

        const stars = document.createElement("span");
        stars.className = "night-bg__stars";

        const sectionIndex = sections.indexOf(id);
        for (let i = 0; i < 44; i += 1) {
          const star = document.createElement("span");
          star.className = "night-star";

          const x = (7 + i * 19 + sectionIndex * 11) % 96;
          const y = (8 + i * 13 + sectionIndex * 17) % 82;
          const size = 1.4 + ((i + sectionIndex) % 5) * 0.55;
          const delay = -1 * (((i * 0.37) + sectionIndex * 0.61) % 6);
          const duration = 2.2 + ((i + sectionIndex) % 7) * 0.42;
          const glow = 0.45 + ((i + 2) % 4) * 0.13;

          star.style.setProperty("--x", `${x}%`);
          star.style.setProperty("--y", `${y}%`);
          star.style.setProperty("--s", `${size}px`);
          star.style.setProperty("--d", `${delay}s`);
          star.style.setProperty("--dur", `${duration}s`);
          star.style.setProperty("--glow", glow.toFixed(2));

          stars.appendChild(star);
        }

        bg.append(aurora, waves, shooting, stars);
        sec.prepend(bg);
      }

      const heading = sec.querySelector(".section-heading");
      if (heading && !heading.hasAttribute("data-reveal")) heading.setAttribute("data-reveal", "up");

      const staggerTargets = sec.querySelectorAll(
        ".about-grid, .about-mini-grid, .about-points, .skills-grid, .education-wrapper, .projects-grid, .experience-list, .research-grid, .certification-showcase, .contact-grid, .contact-wrapper, .contact-layout, .certification-showcase, form"
      );
      staggerTargets.forEach((el) => {
        if (!el.hasAttribute("data-stagger")) el.setAttribute("data-stagger", "");
      });

      // Individual cards get a soft reveal too, in case they're direct children of the section.
      sec.querySelectorAll(".about-card, .mini-card, .skill-card, .education-card, .project-card, .experience-item, .research-card, .cert-info-card, .cert-image-card, .contact-info-panel, .contact-form")
        .forEach((el) => {
          if (!el.closest("[data-stagger]") && !el.hasAttribute("data-reveal")) {
            el.setAttribute("data-reveal", "up");
          }
        });
    });

    // 2) Skill bars — capture inline width into a CSS var and clear the inline width.
    document.querySelectorAll(".skill-bar > span").forEach((bar) => {
      const w = bar.style.width || bar.getAttribute("style")?.match(/width\s*:\s*([^;]+)/i)?.[1];
      if (w) {
        bar.parentElement.style.setProperty("--fill", w.trim());
      }
    });

    // 3) IntersectionObserver — add .in-view when visible.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            // Also flip nearest skill-card so its bar fills.
            if (e.target.matches(".skills-grid")) {
              e.target.querySelectorAll(".skill-card").forEach((c) => c.classList.add("in-view"));
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );

    document
      .querySelectorAll("[data-reveal], [data-stagger], .section-heading, .skill-card")
      .forEach((el) => io.observe(el));

    // 4) Cursor-follow glow for interactive cards.
    const glowCards = document.querySelectorAll(
      ".mini-card, .skill-card, .project-card, .research-card, .education-card, .cert-info-card, .cert-image-card, .contact-info-panel, .contact-form"
    );
    glowCards.forEach((card) => {
      card.addEventListener("pointermove", (ev) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    });
  });
})();

// Project detail modal + image gallery with arrow swap
(function () {
  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  ready(() => {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    // Keep the modal out of section stacking contexts so it always sits above the page.
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    const imgEl  = document.getElementById("pmImage");
    const prevBtn = document.getElementById("pmPrev");
    const nextBtn = document.getElementById("pmNext");
    const dotsEl = document.getElementById("pmDots");
    const typeEl = document.getElementById("pmType");
    const titleEl = document.getElementById("pmTitle");
    const descEl = document.getElementById("pmDesc");
    const highlightsEl = document.getElementById("pmHighlights");
    const techEl = document.getElementById("pmTech");
    const githubEl = document.getElementById("pmGithub");

    const fallbackImage = "./assets/images/projects/project-fallback.svg";
    document.querySelectorAll(".project-cover img, #pmImage").forEach((img) => {
      img.addEventListener("error", () => {
        if (!img.src.endsWith("project-fallback.svg")) {
          img.src = fallbackImage;
        }
      });
    });


    const projects = {
      "student-excuse": {
        type: "Desktop Application",
        icon: "fa-solid fa-file-circle-check",
        title: "Student Excuse Generator",
        desc: "A Java and JavaFX application that generates polished student excuse documents. Built with a clean OOP structure, it takes structured user input, processes it through templated logic, and outputs ready-to-submit formatted documents — including validation, reusable components, and file handling.",
        highlights: [
          "Java + JavaFX GUI with responsive layout",
          "Template-driven excuse generation engine",
          "Structured input validation and error handling",
          "File handling for export and reuse",
          "Modular OOP design for easy extension"
        ],
        tech: ["Java", "JavaFX", "OOP", "GUI", "File Handling"],
        github: "https://github.com/Safayet19/Student-Excuse-Generator",
        images: [
          "./assets/images/projects/student-excuse/01-login.png",
          "./assets/images/projects/student-excuse/02-dashboard.png",
          "./assets/images/projects/student-excuse/03-generate-excuse.png"
        ]
      },
      "hospital": {
        type: "Desktop Application",
        icon: "fa-solid fa-hospital",
        title: "Hospital Management System",
        desc: "A Java and JavaFX based hospital management application for managing hospital records, patients, doctors, appointments, and administrative workflow. Built with an OOP-driven architecture and database-backed persistence for reliable day-to-day operations.",
        highlights: [
          "Patient, doctor and staff record management",
          "Appointment scheduling and tracking",
          "Role-based dashboards and workflow screens",
          "Database-backed persistence with clean data models",
          "OOP architecture for maintainability and extension"
        ],
        tech: ["Java", "JavaFX", "OOP", "Database", "GUI"],
        github: "https://github.com/Safayet19/Hospital-Management-System-JavaFX-",
        images: [
          "./assets/images/projects/hospital/01-login.png",
          "./assets/images/projects/hospital/02-admin-dashboard.png",
          "./assets/images/projects/hospital/03-doctor-dashboard.png",
          "./assets/images/projects/hospital/04-feedback.png"
        ]
      },
      "plant-disease": {
        type: "Deep Learning",
        icon: "fa-solid fa-seedling",
        title: "Plant Disease Recognition",
        desc: "A CNN-based plant disease recognition web app that classifies plant leaf conditions using deep learning image classification. Users upload a leaf image and the trained model instantly predicts the disease class from a curated dataset.",
        highlights: [
          "Convolutional Neural Network trained on plant leaf dataset",
          "Instant disease classification from uploaded JPG/PNG",
          "Clean upload UI with drag-and-drop and preview",
          "Result panel with detected disease label",
          "Deployed as a lightweight interactive web app"
        ],
        tech: ["Python", "CNN", "Deep Learning", "TensorFlow", "Image Classification"],
        github: "https://github.com/Safayet19/Plant-Disease-Detection-CNN-model",
        images: [
          "./assets/images/projects/plant-disease/01-upload.png",
          "./assets/images/projects/plant-disease/02-result.png"
        ]
      }
    };

    let current = { key: null, index: 0 };

    function renderDots(count) {
      dotsEl.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Go to image ${i + 1}`);
        if (i === current.index) b.classList.add("is-active");
        b.addEventListener("click", () => swapTo(i));
        dotsEl.appendChild(b);
      }
    }

    function swapTo(i) {
      const data = projects[current.key];
      if (!data) return;
      const len = data.images.length;
      current.index = (i + len) % len;
      imgEl.classList.add("swap");
      setTimeout(() => {
        imgEl.src = data.images[current.index];
        imgEl.classList.remove("swap");
      }, 180);
      [...dotsEl.children].forEach((d, idx) =>
        d.classList.toggle("is-active", idx === current.index)
      );
    }

    function openModal(key) {
      const data = projects[key];
      if (!data) return;
      current = { key, index: 0 };

      typeEl.innerHTML = `<i class="${data.icon}"></i> ${data.type}`;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      highlightsEl.innerHTML = data.highlights.map((h) => `<li>${h}</li>`).join("");
      techEl.innerHTML = data.tech.map((t) => `<span>${t}</span>`).join("");
      githubEl.href = data.github;

      imgEl.src = data.images[0];
      renderDots(data.images.length);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
    }

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    }

    function closeModalAndNavigate(hash) {
      closeModal();
      if (!hash || hash === "#") return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      window.history.pushState(null, "", hash);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.querySelectorAll("[data-project]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(a.getAttribute("data-project"));
      });
    });

    modal.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );

    document.addEventListener(
      "click",
      (e) => {
        if (!modal.classList.contains("is-open")) return;
        if (modal.contains(e.target)) return;

        const hashLink = e.target.closest('a[href^="#"]');
        if (hashLink) {
          e.preventDefault();
          e.stopPropagation();
          closeModalAndNavigate(hashLink.getAttribute("href"));
          return;
        }

        e.preventDefault();
        e.stopPropagation();
      },
      true
    );

    prevBtn.addEventListener("click", () => swapTo(current.index - 1));
    nextBtn.addEventListener("click", () => swapTo(current.index + 1));

    window.addEventListener("hashchange", () => {
      if (modal.classList.contains("is-open")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") swapTo(current.index - 1);
      if (e.key === "ArrowRight") swapTo(current.index + 1);
    });
  });
})();
