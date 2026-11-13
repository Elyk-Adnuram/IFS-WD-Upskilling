document.addEventListener("DOMContentLoaded", () => {
  // 1. Copy-to-Clipboard Functionality for Prompt Blocks
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      const textToCopy = targetElement.innerText;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalLabel = button.textContent;
        button.textContent = "Copied!";
        button.classList.add("copied");

        setTimeout(() => {
          button.textContent = originalLabel;
          button.classList.remove("copied");
        }, 2000);
      } catch (err) {
        // Fallback for restricted clipboard contexts
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        const originalLabel = button.textContent;
        button.textContent = "Copied!";
        button.classList.add("copied");

        setTimeout(() => {
          button.textContent = originalLabel;
          button.classList.remove("copied");
        }, 2000);
      }
    });
  });

  // 2. Interactive Revision Filter Tabs (Section 6)
  const revTabs = document.querySelectorAll(".rev-tab");
  const revisionCards = document.querySelectorAll(".revision-card");

  revTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedRev = tab.getAttribute("data-rev");

      revTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      revisionCards.forEach((card) => {
        const cardRev = card.getAttribute("data-rev-item");
        if (selectedRev === "all" || selectedRev === cardRev) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 3. Mobile Sidebar Drawer Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // 4. Scroll-Spy Active Navigation Highlighting
  const sections = document.querySelectorAll(".portfolio-section");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -65% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
