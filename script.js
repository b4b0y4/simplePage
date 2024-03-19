document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu")
  const panel = document.getElementById("panel")
  const overlay = document.getElementById("overlay")

  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("close")
    panel.classList.toggle("open")
    overlay.style.display = panel.classList.contains("open") ? "block" : "none"
  })

  overlay.addEventListener("click", function () {
    panel.classList.remove("open")
    overlay.style.display = "none"
    burgerMenu.classList.toggle("close")
  })
})

// Function to calculate the current theme setting based on user preferences
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme // Use the stored theme if available
  }
  if (systemSettingDark.matches) {
    return "dark" // Use dark theme if user prefers dark mode
  }
  return "light" // Default to light theme
}

// Function to update the theme setting on the HTML tag
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme)
}

// Function to update the logo image source based on the theme
//   function updateLogo({ logoEl, isDark }) {
//     const newLogoSrc = isDark ? "./images/logo-dark.png" : "./images/logo-light.png"
//     logoEl.setAttribute("src", newLogoSrc)
//   }

// On page load:
const button = document.querySelector("[data-theme-toggle]")
//   const logo = document.querySelector(".logo")
const localStorageTheme = localStorage.getItem("theme")
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)")

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
})

// Set initial theme, logo based on user preferences
updateThemeOnHtmlEl({ theme: currentThemeSetting })
//   updateLogo({ logoEl: logo, isDark: currentThemeSetting === "dark" })

// Event listener to toggle the theme, logo, and image
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark"

  // Update theme setting in local storage
  localStorage.setItem("theme", newTheme)
  // Update theme, logo based on new theme
  updateThemeOnHtmlEl({ theme: newTheme })
  // updateLogo({ logoEl: logo, isDark: newTheme === "dark" })

  // Update current theme setting
  currentThemeSetting = newTheme
})
