// Shared by every page: footer year, "#top" links, project videos, contact form

document.querySelectorAll(".js-year").forEach(function (el) {
  el.textContent = "©" + new Date().getFullYear();
});

// On desktop the columns scroll, not the window, so "#top" rewinds them too
document.querySelectorAll('a[href="#top"]').forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelectorAll(".col, .center-body").forEach(function (el) { el.scrollTop = 0; });
  });
});

// Project videos: play only while on screen, never under reduced-motion,
// and stay paused once the visitor pauses them
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".paper-media").forEach(function (media) {
  var video = media.querySelector("video");
  var toggle = media.querySelector(".media-toggle");
  var held = reduceMotion;
  function sync() {
    var label = video.paused ? "Play" : "Pause";
    toggle.textContent = label;
    toggle.setAttribute("aria-label", label + " video");
  }
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  toggle.addEventListener("click", function () {
    held = !video.paused;
    if (video.paused) video.play().catch(function () {}); else video.pause();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !held) video.play().catch(function () {});
        else if (!entry.isIntersecting) video.pause();
      });
    }, { threshold: 0.25 }).observe(video);
  }
});

// Contact form: no server, so hand the message to the visitor's mail app
var form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    var body = message + "\n\n— " + name + (email ? " (" + email + ")" : "");
    window.location.href = "mailto:bt2393@nyu.edu" +
      "?subject=" + encodeURIComponent("Hello from " + name) +
      "&body=" + encodeURIComponent(body);
  });
}
