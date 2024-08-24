// script.js
document.addEventListener('DOMContentLoaded', async () => {
    const globe = new Earth({
        target: 'globe-container',
        // Initialize other globe options (rotation, lighting, etc.)
    });

    try {
        // Load asteroid data from _0101.json
        const response = await fetch('jan_wk1.json');
        const data = await response.json();

        // Create markers for each asteroid
        data.forEach((asteroid) => {
            const { lat, lon, estimated_diameter, name } = asteroid;

            // Calculate position on the globe (convert lat/lon to 3D coordinates)
            const position = globe.latLonToVector3(lat, lon);

            // Adjust marker size based on estimated diameter
            const markerSize = estimated_diameter * 0.1; // Adjust the scaling factor

            // Create a sphere marker
            const marker = new THREE.Mesh(
                new THREE.SphereGeometry(markerSize, 16, 16),
                new THREE.MeshBasicMaterial({ color: 'red' })
            );
            marker.position.copy(position);

            // Add event listeners for hover (show popup)
            marker.addEventListener('mouseover', () => {
                // Show a popup with asteroid data (customize as needed)
                console.log(`Asteroid ${name}: Diameter ${estimated_diameter}m`);
            });

            // Add the marker to the scene
            globe.add(marker);
        });
    } catch (error) {
        console.error('Error loading asteroid data:', error);
    }

    // Set an initial rotation angle (in radians)
    let rotationAngle = 0;

    // Define your render function
    function render() {
        // Update the globe's rotation (e.g., rotate around Y-axis)
        globe.rotation.y = rotationAngle;

        // Increment the rotation angle for the next frame
        rotationAngle += 0.01; // Adjust the rotation speed as needed

        // Render the scene
        globe.render();

        // Request the next frame
        requestAnimationFrame(render);
    }

    // Start the animation loop
    requestAnimationFrame(render);
});
