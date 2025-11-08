document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactForm = document.querySelector("form[data-form='contact']");
  const successMessage = document.querySelector(".success-message");

  // Header elevation on scroll
  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
  }

  // Close mobile menu after selecting a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
        menuToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Contact form submission via FormSubmit AJAX endpoint
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const payload = {
        nombre: formData.get("nombre") || "",
        email: formData.get("email") || "",
        telefono: formData.get("telefono") || "",
        asunto: formData.get("asunto") || "",
        mensaje: formData.get("mensaje") || "",
        origen: window.location.href,
      };

      try {
        const response = await fetch("https://formsubmit.co/ajax/atencionalcliente@karrerain.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Error al enviar el formulario");
        }

        if (successMessage) {
          successMessage.textContent = "¡Gracias! Tu mensaje fue enviado correctamente. Te contactaremos muy pronto.";
          successMessage.classList.add("visible");
        }
        contactForm.reset();
      } catch (error) {
        if (successMessage) {
          successMessage.textContent = "Algo salió mal al enviar el formulario. Por favor intenta nuevamente o escríbenos a atencionalcliente@karrerain.com.";
          successMessage.classList.add("visible");
        }
        console.error(error);
      }
    });
  }
});

