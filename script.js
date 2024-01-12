
document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas and its 2D rendering context
    const canvas = document.getElementById('gears');
    const context = canvas.getContext('2d');
    const box = document.getElementById('box');

    // Variables for gears animation
    let gears = [];
    let rotatingGear = null;
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    // Gear constructor function
    function Gear(x, y, radius, imageSrc, speed) {
        // Gear properties
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.image = new Image();
        this.image.src = imageSrc;
        this.speed = speed;
        this.rotationAngle = 0;

        // Method to draw the gear on the canvas
        this.draw = function () {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.rotationAngle);
            context.drawImage(this.image, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
            context.restore();
        };

        // Method to update the gear's rotation and drawing
        this.update = function () {
            this.draw();
            if (rotatingGear === this && isMouseDown) {
                this.onClickRotation();
            } else {
                this.rotate();
            }
        };

        // Method to continuously rotate the gear
        this.rotate = function () {
            this.rotationAngle -= this.speed;
        };

        // Method to handle rotation when clicked
        this.onClickRotation = function () {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            this.rotationAngle = Math.atan2(dy, dx);
        };
    }

    // Function to create an array of gears based on screen size
    function createGears() {
        const numRows = 20;
        const numCols = 20;
        const paddingX = 50;
        const paddingY = 50;

        const gearWidth = (window.innerWidth - paddingX) / numCols;
        const gearHeight = (window.innerHeight - paddingY) / numRows;

        gears = [];

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const x = paddingX + col * (gearWidth + paddingX);
                const y = paddingY + row * (gearHeight + paddingY);

                const radius = Math.min(gearWidth, gearHeight) / 2;
                const imageSrc = 'BlueberryPie.png'; // Replace with the correct path to your gear image
                const speed = 0.01 + Math.random() * 0.01; // Generates a random speed between 0.01 and 0.02

                gears.push(new Gear(x, y, radius, imageSrc, speed));
            }
        }
    }

    // Function to continuously animate the gears
    function animate() {
        requestAnimationFrame(animate);
        context.clearRect(0, 0, canvas.width, canvas.height);

        gears.forEach(gear => {
            gear.update();
        });
    }

    // Event handlers for mouse interactions
    function handleMouseDown(event) {
        isMouseDown = true;
        mouseX = event.clientX - canvas.getBoundingClientRect().left;
        mouseY = event.clientY - canvas.getBoundingClientRect().top;

        rotatingGear = findClickedGear(mouseX, mouseY);
    }

    function handleMouseUp() {
        isMouseDown = false;
        rotatingGear = null;
    }

    function handleMouseMove(event) {
        mouseX = event.clientX - canvas.getBoundingClientRect().left;
        mouseY = event.clientY - canvas.getBoundingClientRect().top;
    }

    // Function to find the clicked gear based on mouse coordinates
    function findClickedGear(mouseX, mouseY) {
        for (const gear of gears) {
            const dx = mouseX - gear.x;
            const dy = mouseY - gear.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= gear.radius) {
                return gear;
            }
        }
        return null;
    }

    // Function to update canvas size and recreate gears on window resize
    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createGears();
    }

    // Function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Add dark mode toggle button event listener
    const darkModeToggleBtn = document.getElementById('darkModeToggleBtn');
    if (darkModeToggleBtn) {
        darkModeToggleBtn.addEventListener('click', toggleDarkMode);
    }


    //   // Function to redirect to selected page
    //   function redirectToPage(page) {
    //     if (page) {
    //         window.location.href = page;
    //     }
    // }

    // const BoxToggleBtn = document.getElementById('box')
    // if(BoxToggleBtn){
    //     BoxToggleBtn.addEventListener('click', redirectToPage)
    // }
  
    // Event listeners for box interactiopn

    // Event listeners for window and canvas interactions
    window.addEventListener('resize', updateCanvasSize);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    // Initialize canvas size and start animation
    updateCanvasSize();
    animate();
});
