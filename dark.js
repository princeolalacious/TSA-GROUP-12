const themeButton = document.getElementById("btn");
const themeIcon = themeButton.querySelector("i");
const themeLabel = document.querySelector(".header span");

const savedTheme = localStorage.getItem("planet-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

updateTheme();

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");

  // Save the selected theme.
  localStorage.setItem("planet-theme", isDarkMode ? "dark" : "light");

  updateTheme();
});

export function updateTheme() {
  const isDarkMode = document.body.classList.contains("dark-mode");

  themeIcon.className = isDarkMode ? "fa-solid fa-sun" : "fa-solid fa-moon";

  themeLabel.textContent = isDarkMode ? "Light" : "Dark";

  themeButton.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode",
  );
}
