document.addEventListener('DOMContentLoaded', async () => {
    // Default selectedAlgorithm is 'sac'
    const selectedAlgorithm = 'sac';

    // Set the value of the dropdown to 'sac' to keep it selected by default
    const algorithmSelect = document.getElementById('algorithmSelect');
    algorithmSelect.value = selectedAlgorithm;

    try {
        // Fetch data for the default algorithm
        await fetchAndUpdateData(selectedAlgorithm);
    } catch (error) {
        console.error('Error on initial load:', error);
    }
});

// Fetch and update data based on the selected algorithm
async function fetchAndUpdateData(algorithm) {
    try {
        // Fetch data from the Flask backend
        const response = await fetch(`http://127.0.0.1:5000/data/${algorithm}`);
        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        const images = data.images;

        // Update title, description, and link
        const infoTitle = document.getElementById('info-title');
        const infoParagraph = document.getElementById('info-paragraph');
        const infoLink = document.getElementById('info-link');

        infoTitle.textContent = algorithm.toUpperCase();
        infoParagraph.textContent = data.description || "No description available";
        infoLink.href = data.link || "#";
        infoLink.textContent = "Open Source Link";

        // Update images if they exist
        for (const [imageId, imageData] of Object.entries(images)) {
            const imgElement = document.getElementById(imageId);
            if (imgElement) {
                imgElement.src = imageData; // Set the base64 image data
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event listener for the submit button
document.getElementById('submitBtn').addEventListener('click', async () => {
    const selectedAlgorithm = document.getElementById('algorithmSelect').value;

    document.getElementById("load").style.display = "block";
    document.getElementById("rp").style.display = "none";
    document.getElementById("info").style.display = "none";
    setTimeout(() => { 
        document.getElementById("load").style.display = "none";
        document.getElementById("rp").style.display = "block";
        document.getElementById("info").style.display = "block";
    }, 2000);

    // Check if an algorithm is selected
    if (!selectedAlgorithm) {
        console.error("No algorithm selected");
        return;
    }

    try {
        // Fetch and update data
        await fetchAndUpdateData(selectedAlgorithm);
    } catch (error) {
        console.error('Error on button click:', error);
    }
});