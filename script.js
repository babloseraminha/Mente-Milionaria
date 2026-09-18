/* ==========================================================
   MENTE MILIONÁRIA — SCRIPT
========================================================== */

/* =========================================================
   LINK DO CHECKOUT — COLE SEU LINK DA KIWIFY AQUI
   Todos os botões de compra do site usam esta variável.
========================================================= */
const CHECKOUT_URL = "https://pay.kiwify.com.br/EI49dXx";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Aplica o link de checkout em todos os botões ---------- */
  document.querySelectorAll(".js-checkout").forEach((btn) => {
    btn.setAttribute("href", CHECKOUT_URL);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });

  /* ---------- Header: muda de estilo ao rolar a página ---------- */
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile (hambúrguer) ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMobileMenu = () => {
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------- Rolagem suave para os links do menu ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ---------- Animação de fade-in ao rolar (reveal) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll(".accordion__item").forEach((item) => {
    const question = item.querySelector(".accordion__question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // fecha os outros itens abertos
      document.querySelectorAll(".accordion__item.is-open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });

      item.classList.toggle("is-open", !isOpen);
    });
  });

});
