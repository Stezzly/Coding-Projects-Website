  // Function to toggle dark mode
  var toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
};

// Add event listener for dark mode toggle
var darkModeToggleBtn = document.getElementById('darkModeToggleBtn');
if (darkModeToggleBtn) {
    darkModeToggleBtn.addEventListener('click', toggleDarkMode);
}