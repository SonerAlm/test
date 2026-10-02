// Scroll reveal: fade sections in as they enter the viewport (IntersectionObserver, no scroll listeners).
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
})();

// Newsletter form: client-side validation only. There is no backend yet,
// so a valid submit shows the success message without sending anything.
(() => {
  const form = document.getElementById("signup-form");
  if (!form) return;
  const input = form.querySelector("#email");
  const msg = form.querySelector("#email-msg");
  const defaultText = msg.textContent;

  const setState = (state, text) => {
    msg.classList.remove("is-error", "is-ok");
    if (state) msg.classList.add(state);
    msg.textContent = text;
    input.setAttribute("aria-invalid", state === "is-error" ? "true" : "false");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value || !input.checkValidity()) {
      setState("is-error", "Enter a valid email address, like name@example.com.");
      input.focus();
      return;
    }
    setState("is-ok", "You're on the list. Watch your inbox for the next drop.");
    form.reset();
  });

  input.addEventListener("input", () => {
    if (msg.classList.contains("is-error")) setState(null, defaultText);
  });
})();
