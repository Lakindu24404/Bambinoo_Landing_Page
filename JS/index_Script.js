    // Current language state
    let currentLang = "en";

    // Function to update page content based on language
    function updateLanguage(lang) {
      currentLang = lang;
      const t = translations[lang];

      // Update navigation
      document.querySelector('.nav-menu a[href="#home"]').textContent =
        t.navHome;
      document.querySelector(".nav-menu .dropdown > a").innerHTML =
        t.navEducation + ' <i class="fas fa-chevron-down"></i>';
      document.querySelector('.nav-menu a[href="#videos"]').textContent =
        t.navVideos;
      document.querySelector('.nav-menu a[href="#features"]').textContent =
        t.navFeatures;
      document.querySelector('.nav-menu a[href="#aim-mission"]').textContent =
        t.navAimMission;
      document.querySelector('.nav-menu a[href="#faq"]').textContent =
        t.navQA;
      document.querySelector('.nav-menu a[href="#team"]').textContent =
        t.navTeam;

      // Update buttons
      document
        .querySelectorAll(".nav-buttons .btn-outline")
        .forEach((btn) => (btn.textContent = t.btnSignIn));
      document
        .querySelectorAll(".nav-buttons .btn-primary")
        .forEach((btn) => (btn.textContent = t.btnRegister));

      // Update hero
      document.querySelector(".hero h1").textContent = t.heroTitle;
      document.querySelector(".hero p").textContent = t.heroSubtitle;
      document.querySelectorAll(".hero-buttons .btn-primary")[0].textContent =
        t.btnGetStarted;
      document.querySelectorAll(".hero-buttons .btn-outline")[0].textContent =
        t.btnWatchIntro;

      // Update quick features
      const quickFeatures = document.querySelectorAll(
        ".quick-features .feature-card"
      );
      if (quickFeatures[0]) {
        quickFeatures[0].querySelector("h3").textContent =
          t.quickFeature1Title;
        quickFeatures[0].querySelector("p").textContent = t.quickFeature1Desc;
      }
      if (quickFeatures[1]) {
        quickFeatures[1].querySelector("h3").textContent =
          t.quickFeature2Title;
        quickFeatures[1].querySelector("p").textContent = t.quickFeature2Desc;
      }
      if (quickFeatures[2]) {
        quickFeatures[2].querySelector("h3").textContent =
          t.quickFeature3Title;
        quickFeatures[2].querySelector("p").textContent = t.quickFeature3Desc;
      }
      if (quickFeatures[3]) {
        quickFeatures[3].querySelector("h3").textContent =
          t.quickFeature4Title;
        quickFeatures[3].querySelector("p").textContent = t.quickFeature4Desc;
      }
      if (quickFeatures[4]) {
        quickFeatures[4].querySelector("h3").textContent =
          t.quickFeature5Title;
        quickFeatures[4].querySelector("p").textContent = t.quickFeature5Desc;
      }

      // Update Aim & Mission
      document.querySelector(".aim-mission .section-title").textContent =
        t.aimMissionTitle;
      document.querySelector(".aim-card h3").innerHTML =
        '<i class="fas fa-bullseye"></i> ' + t.aimTitle;
      document.querySelector(".aim-card p").textContent = t.aimText;
      document.querySelector(".mission-card h3").innerHTML =
        '<i class="fas fa-heart"></i> ' + t.missionTitle;
      document.querySelector(".mission-card p").textContent = t.missionText;

      // Update Education section
      document.querySelector(
        ".education-section .section-title"
      ).textContent = t.educationTitle;
      document.querySelector(
        ".education-section .section-subtitle"
      ).textContent = t.educationSubtitle;

      // Update Video section
      document.querySelector("#videos .section-title").textContent =
        t.videoTitle;
      document.querySelector("#videos .section-subtitle").textContent =
        t.videoSubtitle;

      // Update Features section
      document.querySelector(
        ".features-detailed .section-title"
      ).textContent = t.featuresTitle;
      document.querySelector(
        ".features-detailed .section-subtitle"
      ).textContent = t.featuresSubtitle;

      // Update Team section
      document.querySelector("#team .section-title").textContent =
        t.teamTitle;
      document.querySelector("#team .section-subtitle").textContent =
        t.teamSubtitle;

      // Update FAQ section
      document.querySelector("#faq .section-title").textContent = t.faqTitle;
      document.querySelector("#faq .section-subtitle").textContent =
        t.faqSubtitle;

      // Update Footer
      document.querySelector(".footer-brand p").textContent = t.footerText;

      // Update language buttons
      document
        .querySelectorAll(".language-switcher button")
        .forEach((btn) => {
          btn.classList.remove("active");
          if (btn.dataset.lang === lang) {
            btn.classList.add("active");
          }
        });
    }
    // Navigation scroll effect
    const navbar = document.getElementById("navbar");
    const goTop = document.getElementById("goTop");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
        goTop.classList.add("visible");
      } else {
        navbar.classList.remove("scrolled");
        goTop.classList.remove("visible");
      }

      // Scroll animations
      const fadeElements = document.querySelectorAll(".fade-in");
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    });

    // Hamburger menu
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Smooth scroll
    function smoothScroll(target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        navMenu.classList.remove("active");
      }
    }

    // Education section switching --------------------------------------------------------
    const educationItems = document.querySelectorAll(".education-item");
    const educationData = {
      "before-birth": {
        title: "Before Birth",
        cards: [
          {
            title: "Prenatal Care",
            desc: "Essential vitamins, nutrition, and health checkups during pregnancy",
          },
          {
            title: "Fetal Development",
            desc: "Understanding your baby's growth stages month by month",
          },
          {
            title: "Preparing for Birth",
            desc: "Hospital bags, birth plans, and what to expect",
          },
          {
            title: "Mental Health",
            desc: "Managing stress and emotions during pregnancy",
          },
        ],
      },
      "0-3": {
        title: "0–3 Months",
        cards: [
          {
            title: "Newborn Care",
            desc: "Feeding, sleeping, and basic newborn needs",
          },
          {
            title: "First Vaccines",
            desc: "Understanding initial immunization requirements",
          },
          {
            title: "Sleep Patterns",
            desc: "Establishing healthy sleep routines",
          },
          {
            title: "Bonding",
            desc: "Building emotional connections with your baby",
          },
        ],
      },
      "3-12": {
        title: "3–12 Months",
        cards: [
          {
            title: "Solid Foods",
            desc: "Introducing first foods and managing allergies",
          },
          {
            title: "Motor Skills",
            desc: "Crawling, sitting, and early movement milestones",
          },
          {
            title: "Language Development",
            desc: "First words and communication skills",
          },
          { title: "Safety Tips", desc: "Babyproofing your home" },
        ],
      },
      "1-2": {
        title: "1–2 Years",
        cards: [
          {
            title: "Walking & Running",
            desc: "Supporting physical development and coordination",
          },
          { title: "Balanced Diet", desc: "Nutrition for active toddlers" },
          { title: "Social Skills", desc: "Interaction with other children" },
          {
            title: "Potty Training",
            desc: "When and how to start toilet training",
          },
        ],
      },
      "2-5": {
        title: "2–5 Years",
        cards: [
          {
            title: "Preschool Readiness",
            desc: "Preparing for educational environments",
          },
          {
            title: "Emotional Intelligence",
            desc: "Understanding and managing emotions",
          },
          {
            title: "Physical Activities",
            desc: "Sports and exercise for young children",
          },
          {
            title: "Healthy Habits",
            desc: "Establishing lifelong wellness routines",
          },
        ],
      },
    };

    educationItems.forEach((item) => {
      item.addEventListener("click", () => {
        educationItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        const target = item.dataset.target;
        const data = educationData[target];

        document.getElementById("currentSection").textContent = data.title;

        const contentCards = document.querySelector(".content-cards");
        contentCards.innerHTML = data.cards
          .map(
            (card) => `
                    <div class="content-card">
                        <h3>${card.title}</h3>
                        <p>${card.desc}</p>
                    </div>
                `
          )
          .join("");
      });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains("active");

        // Close all
        document
          .querySelectorAll(".faq-question")
          .forEach((q) => q.classList.remove("active"));
        document
          .querySelectorAll(".faq-answer")
          .forEach((a) => a.classList.remove("active"));

        // Open clicked if it wasn't active
        if (!isActive) {
          question.classList.add("active");
          answer.classList.add("active");
        }
      });
    });

    // Modal functions
    function openModal(modalId) {
      document.getElementById(modalId).classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Video modal
    function openVideoModal(videoId) {
      const modal = document.getElementById("videoModal");
      const iframe = document.getElementById("videoFrame");
      iframe.src = `https://www.youtube.com/watch?v=${videoId}`;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeVideoModal() {
      const modal = document.getElementById("videoModal");
      const iframe = document.getElementById("videoFrame");
      iframe.src = "";
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Password toggle
    function togglePassword(inputId) {
      const input = document.getElementById(inputId);
      const icon = input.nextElementSibling;

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    // Language switcher
    const langButtons = document.querySelectorAll(
      ".language-switcher button"
    );
    langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        langButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const lang = button.dataset.lang;
        // Save to memory (not localStorage as per requirements)
        window.currentLanguage = lang;
        console.log("Language switched to:", lang);
      });
    });

    // Close modals on outside click
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
        document.body.style.overflow = "auto";
        // Stop video if it's the video modal
        if (e.target.id === "videoModal") {
          document.getElementById("videoFrame").src = "";
        }
      }
    });

    // Growth Chart with Chart.js
    window.addEventListener("load", () => {
      const ctx = document.getElementById("growthChart");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: ["0m", "3m", "6m", "9m", "12m", "15m", "18m", "24m"],
            datasets: [
              {
                label: "Weight (kg)",
                data: [3.5, 6.0, 7.8, 9.0, 10.2, 11.0, 11.8, 12.5],
                borderColor: "#0ea5a4",
                backgroundColor: "rgba(14, 165, 164, 0.1)",
                tension: 0.4,
                fill: true,
              },
              {
                label: "Height (cm)",
                data: [50, 60, 67, 72, 76, 79, 82, 87],
                borderColor: "#fb7185",
                backgroundColor: "rgba(251, 113, 133, 0.1)",
                tension: 0.4,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });

    // Trigger initial scroll animation check
    window.dispatchEvent(new Event("scroll"));

    // Form validation example
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Check if it's register form
        if (form.closest("#registerModal")) {
          const password = document.getElementById("registerPassword").value;
          const confirmPassword =
            document.getElementById("confirmPassword").value;

          if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
          }

          if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
          }
        }

        // Simulate form submission
        alert("Form submitted successfully! Welcome to Bambinoo.");

        // Close modal
        const modal = form.closest(".modal");
        if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        }

        // Reset form
        form.reset();
      });
    });

    // Dropdown menu for mobile
    document.querySelectorAll(".dropdown > a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = link.parentElement;
          const menu = dropdown.querySelector(".dropdown-menu");

          // Toggle visibility
          if (menu.style.display === "block") {
            menu.style.display = "none";
          } else {
            // Close all other dropdowns
            document
              .querySelectorAll(".dropdown-menu")
              .forEach((m) => (m.style.display = "none"));
            menu.style.display = "block";
            menu.style.position = "relative";
            menu.style.opacity = "1";
            menu.style.visibility = "visible";
            menu.style.transform = "none";
          }
        }
      });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href !== "#" && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            navMenu.classList.remove("active");
          }
        }
      });
    });

    // Add parallax effect to hero
    window.addEventListener("scroll", () => {
      const hero = document.querySelector(".hero");
      if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector(".hero-content");
        if (heroContent && scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
          heroContent.style.opacity = 1 - scrolled / window.innerHeight;
        }
      }
    });

    // Add hover effect to feature cards
    document
      .querySelectorAll(".feature-card, .detailed-card, .team-card")
      .forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transition = "all 0.3s ease";
        });
      });

    // Chatbot interaction simulation
    const chatWidget = document.querySelector(".chat-widget");
    if (chatWidget) {
      chatWidget.addEventListener("click", () => {
        const newMessage = document.createElement("div");
        newMessage.className = "chat-message";
        newMessage.innerHTML =
          "<strong>Bambinoo AI:</strong> How can I help you today?";
        chatWidget.appendChild(newMessage);
        chatWidget.scrollTop = chatWidget.scrollHeight;
      });
    }

    // Initialize language from memory
    window.currentLanguage = "en";

    // Add loading animation
    window.addEventListener("load", () => {
      document.body.style.opacity = "0";
      setTimeout(() => {
        document.body.style.transition = "opacity 0.5s";
        document.body.style.opacity = "1";
      }, 100);
    });

    // Prevent video modal from closing when clicking inside
    document
      .querySelector(".video-modal .modal-content")
      ?.addEventListener("click", (e) => {
        e.stopPropagation();
      });

    document.querySelectorAll(".modal-content").forEach((content) => {
      content.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    // Add animation delay to feature cards
    document
      .querySelectorAll(".features-grid .feature-card")
      .forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });

    // Add real-time input validation
    document.querySelectorAll('input[type="email"]').forEach((input) => {
      input.addEventListener("blur", function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailPattern.test(this.value)) {
          this.style.borderColor = "#ef4444";
          let errorMsg = this.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains("error-msg")) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-msg";
            errorMsg.style.color = "#ef4444";
            errorMsg.style.fontSize = "0.875rem";
            errorMsg.textContent = "Please enter a valid email address";
            this.parentNode.appendChild(errorMsg);
          }
        } else {
          this.style.borderColor = "#e2e8f0";
          const errorMsg = this.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains("error-msg")) {
            errorMsg.remove();
          }
        }
      });
    });

    // Add phone number formatting
    document.querySelectorAll('input[type="tel"]').forEach((input) => {
      input.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 10) value = value.slice(0, 10);
        this.value = value;
      });
    });

    // Scroll indicator functionality
    document
      .querySelector(".scroll-indicator")
      ?.addEventListener("click", () => {
        document
          .querySelector("#quick-features")
          .scrollIntoView({ behavior: "smooth" });
      });

    // Add intersection observer for better performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".fade-in")
      .forEach((el) => observer.observe(el));

    // Add active section highlighting in nav
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.style.color = "var(--primary)";
        } else {
          link.style.color = "";
        }
      });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Reset mobile menu on resize
        if (window.innerWidth > 768) {
          navMenu.classList.remove("active");
          document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.style.display = "";
            menu.style.position = "";
          });
        }
      }, 250);
    });

    // Add copyright year update
    const currentYear = new Date().getFullYear();
    document.querySelector(
      ".footer-bottom p"
    ).innerHTML = `&copy; ${currentYear} Bambinoo CHDR System — All rights reserved.`;

    // Easter egg: Konami code
    let konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.style.animation = "rainbow 2s infinite";
          setTimeout(() => {
            document.body.style.animation = "";
            konamiIndex = 0;
          }, 5000);
        }
      } else {
        konamiIndex = 0;
      }
    });