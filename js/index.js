(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const small = window.matchMedia("(max-width: 700px)");
  const hero = document.querySelector(".hero");
  const scene = document.querySelector(".rush-scene");
  const stage = document.querySelector(".rush-stage");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const video = document.querySelector("#circuit-video");
  const poster = document.querySelector("#circuit-poster");
  const motionButton = document.querySelector(".motion-toggle");
  const circuits = {
    "neo-kanto": {
      name: "Neo Kanto",
      weather: "NIGHT / CITY STREETS",
      alt: "Rush Strike racing through the city at night",
      route: "M8 30 L32 30 L48 12 L92 12 L105 31 L144 31 L161 13",
      end: [161, 13],
    },
    "glacier-rift": {
      name: "Glacier Rift",
      weather: "ALPINE / FROZEN ROADS",
      alt: "Rush Strike cars racing across a snowy alpine circuit",
      route: "M8 33 L29 14 L48 29 L67 9 L90 33 L110 12 L137 29 L161 11",
      end: [161, 11],
    },
    thames: {
      name: "The Thames",
      weather: "LONDON / RIVERSIDE",
      alt: "Rush Strike racing along the Thames circuit",
      route: "M8 26 C30 5 42 41 64 26 S98 8 114 27 S143 41 161 14",
      end: [161, 14],
    },
  };
  let chosen = "neo-kanto";
  let userPaused = false;
  let inView = false;
  let pendingFrame;
  let engine;
  function closeMenu(returnFocus = false) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open"))
      closeMenu(true);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  small.addEventListener("change", () => closeMenu());
  function updatePlayback() {
    const shouldPlay =
      inView && !document.hidden && !reduced.matches && !userPaused;
    motionButton.setAttribute("aria-pressed", String(userPaused));
    motionButton.textContent = userPaused ? "Play motion" : "Pause motion";
    if (!shouldPlay) {
      video.pause();
      video.classList.remove("is-playing");
      return;
    }
    if (!video.getAttribute("src")) {
      video.src = video.dataset.videoSrc;
      video.load();
    }
    video.play().catch(() => {
      video.classList.remove("is-playing");
    });
  }
  video.addEventListener("playing", () => {
    if (!reduced.matches && !userPaused) video.classList.add("is-playing");
  });
  video.addEventListener("error", () => {
    video.classList.remove("is-playing");
    motionButton.textContent = "Motion unavailable";
    motionButton.disabled = true;
  });
  motionButton.addEventListener("click", () => {
    userPaused = !userPaused;
    updatePlayback();
  });
  document.addEventListener("visibilitychange", updatePlayback);
  new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      updatePlayback();
    },
    { threshold: 0.08 },
  ).observe(stage);
  document.querySelectorAll("[data-circuit]").forEach((button) =>
    button.addEventListener("click", () => {
      if (chosen === button.dataset.circuit) return;
      chosen = button.dataset.circuit;
      const data = circuits[chosen];
      document.querySelectorAll("[data-circuit]").forEach((control) => {
        const active = control === button;
        control.classList.toggle("is-selected", active);
        control.setAttribute("aria-pressed", String(active));
      });
      video.pause();
      video.classList.remove("is-playing");
      video.removeAttribute("src");
      video.dataset.videoSrc = `./img/rush-strike/${chosen}.mp4`;
      video.poster = `./img/rush-strike/${chosen}.webp`;
      poster.src = video.poster;
      poster.alt = data.alt;
      document.querySelector("#circuit-weather").textContent = data.weather;
      document.querySelector("#route-path").setAttribute("d", data.route);
      document.querySelector("#route-car").setAttribute("cx", data.end[0]);
      document.querySelector("#route-car").setAttribute("cy", data.end[1]);
      document.querySelector("#circuit-status").textContent =
        `Previewing ${data.name}. ${data.weather.toLowerCase().replace(" / ", ", ")}.`;
      stage.dataset.activeCircuit = chosen;
      motionButton.disabled = false;
      updatePlayback();
    }),
  );
  function mountEngine() {
    if (engine) engine.destroy();
    scene.setAttribute(
      "data-sc-act",
      small.matches || reduced.matches ? "flow" : "pin",
    );
    scene.style.height = "";
    stage.style.position = "";
    stage.style.top = "";
    stage.style.height = "";
    if (window.ScrollCraft) engine = window.ScrollCraft.mount(document.body);
  }
  mountEngine();
  small.addEventListener("change", mountEngine);
  reduced.addEventListener("change", () => {
    mountEngine();
    updatePlayback();
    hero.style.removeProperty("--pointer-x");
    hero.style.removeProperty("--pointer-y");
  });
  hero.addEventListener("pointermove", (event) => {
    if (reduced.matches || event.pointerType !== "mouse") return;
    const box = hero.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(pendingFrame);
    pendingFrame = requestAnimationFrame(() => {
      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    });
  });
  hero.addEventListener("pointerleave", () => {
    cancelAnimationFrame(pendingFrame);
    hero.style.setProperty("--pointer-x", 0);
    hero.style.setProperty("--pointer-y", 0);
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
