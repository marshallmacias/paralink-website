// Paralink Accounting — small progressive enhancements
(function () {
  document.documentElement.classList.add("js");

  // Header border on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Calendly booking. Paste the scheduling link here once the event type exists,
  // for example "https://calendly.com/your-name/intro-call".
  var CALENDLY_URL = "https://calendly.com/shelly-paralinkaccounting/30min";
  var booking = document.querySelector("#booking");
  if (booking && CALENDLY_URL) {
    var embed = document.querySelector("#calendly-embed");
    embed.setAttribute(
      "data-url",
      CALENDLY_URL + "?hide_gdpr_banner=1&primary_color=007684&text_color=0b1f26"
    );
    booking.classList.add("ready");
    // Load the scheduler only when the visitor gets near it, so the page stays fast.
    var loaded = false;
    var loadCalendly = function () {
      if (loaded) return;
      loaded = true;
      var s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    };
    if ("IntersectionObserver" in window) {
      var bo = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) { loadCalendly(); bo.disconnect(); }
        },
        { rootMargin: "800px 0px" }
      );
      bo.observe(booking);
    } else {
      loadCalendly();
    }
  }

  var year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
