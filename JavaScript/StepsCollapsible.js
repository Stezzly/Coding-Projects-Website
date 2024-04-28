

document.addEventListener("DOMContentLoaded", function() {
    var readyButton = document.querySelector('.collapsible');
    var projectSteps = document.getElementById('project-steps');

    readyButton.addEventListener('click', function() {
        projectSteps.style.display = projectSteps.style.display === 'block' ? 'none' : 'block';
    });

    var coll = document.querySelectorAll('#project-steps .collapsible');
    coll.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    var checkboxes = document.querySelectorAll('#project-steps .step-checkbox');
    var progressBar = document.querySelector('.progress-bar');
    var progressText = document.querySelector('.progress-text');
    var totalSteps = checkboxes.length;
    var completedSteps = 0;
    var conclusion = document.querySelector('.conclusion');

    function updateProgressAndConclusion() {
        completedSteps = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        var progressPercentage = (completedSteps / totalSteps) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressText.textContent = Math.round(progressPercentage) + '%';

        if (completedSteps === totalSteps) {
            conclusion.style.display = 'block';
        } else {
            conclusion.style.display = 'none';
        }
    }

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', updateProgressAndConclusion);
    });

    updateProgressAndConclusion(); // Initial check on page load to set the right state

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
});
