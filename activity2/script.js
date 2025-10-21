document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-aboutme");
  const info = document.getElementById("info");

  btn.addEventListener("click", () => {
    info.classList.toggle("hide");
    btn.textContent = info.classList.contains("hide")
      ? "ABOUT ME"
      : "SHOW LESS";
  });
});
