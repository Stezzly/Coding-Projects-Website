document.addEventListener('DOMContentLoaded', function() {
    // Function to filter grid items based on difficulty
    function filterProjects(difficulty) {
        let gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(function(item) {
            let itemDifficulty = item.parentElement.dataset.difficulty;
            if (difficulty === 'all' || itemDifficulty === difficulty) {
                item.style.display = 'block'; // Show item if it matches the selected difficulty or if 'All' is selected
            } else {
                item.style.display = 'none'; // Hide item if it doesn't match the selected difficulty
            }
        });
    }

    // Event listener for filter buttons
    document.querySelectorAll('.filter-button').forEach(function(button) {
        button.addEventListener('click', function() {
            let difficulty = this.dataset.difficulty;
            filterProjects(difficulty);
        });
    });
});
