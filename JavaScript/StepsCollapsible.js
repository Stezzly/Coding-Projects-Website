document.addEventListener("DOMContentLoaded", function() {
    // Handle the main collapsible for project steps
    var readyButton = document.querySelector('.collapsible');
    var projectSteps = document.getElementById('project-steps');

    readyButton.addEventListener('click', function() {
        projectSteps.style.display = projectSteps.style.display === 'block' ? 'none' : 'block';
        initializeCodeMirrorWithin(projectSteps);  // Initialize CodeMirror when main section is opened
    });

    // Handle nested collapsibles within project steps
    var coll = document.querySelectorAll('#project-steps .collapsible');
    coll.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
            initializeCodeMirrorWithin(content);  // Initialize CodeMirror when nested section is opened
        });
    });

    // Progress bar and checkbox functionalities
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
});
