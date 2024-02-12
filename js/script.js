document.addEventListener('DOMContentLoaded', function () {
    const burgerMenuButton = document.querySelector('.burger-menu-button')
    const panel = document.getElementById('panel')
    const closeButton = document.querySelector('.close-button')
    const overlay = document.getElementById('overlay')

    burgerMenuButton.addEventListener('click', function () {
        panel.classList.toggle('open')
        overlay.style.display = "block"
    })

    closeButton.addEventListener('click', function () {
        panel.classList.remove('open')
        overlay.style.display = "none"
    })
})


// JavaScript code to load content of each article into .content area

// Function to load content from article pages
function loadArticle(articleURL) {
  fetch(articleURL) // Fetch the article HTML file
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok')
          }
          return response.text() // Get the HTML content as text
      })
      .then(html => {
          document.querySelector('.content').innerHTML = html // Insert the HTML content into .content area
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error)
      })
}

// Event listeners for article navigation
document.addEventListener('DOMContentLoaded', function() {
  // Example: Load Article 1 content when its link is clicked
  document.querySelector('nav a[href="article1.html"]').addEventListener('click', function(event) {
    event.preventDefault() // Prevent default link behavior
    loadArticle('articles/article1.html') // Load Article 1 content
})

  // Example: Load Article 2 content when its link is clicked
  document.querySelector('nav a[href="article2.html"]').addEventListener('click', function(event) {
      event.preventDefault() // Prevent default link behavior
      loadArticle('articles/article2.html'); // Load Article 2 content
  })

  // Add event listeners for other article links as needed
})



// Function to calculate the current theme setting based on user preferences
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme; // Use the stored theme if available
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
  
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark })
  
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