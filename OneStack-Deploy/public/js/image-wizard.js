// Image Wizard functionality
document.addEventListener('DOMContentLoaded', () => {
    const imageWizardButton = document.getElementById('imageWizardButton');
    const imageModal = document.getElementById('imageModal');
    const imageModalClose = document.getElementById('imageModalClose');
    const generateButton = document.getElementById('generateButton');
    const imagePrompt = document.getElementById('imagePrompt');
    const imageResults = document.getElementById('imageResults');

    // Open modal
    if (imageWizardButton) {
        imageWizardButton.addEventListener('click', () => {
            imageModal.classList.remove('hidden');
        });
    }

    // Close modal
    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => {
            imageModal.classList.add('hidden');
        });
    }

    // Close on outside click
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.add('hidden');
            }
        });
    }

    // Generate images
    if (generateButton) {
        generateButton.addEventListener('click', async () => {
            const prompt = imagePrompt.value.trim();
            if (!prompt) {
                alert('Please enter a description for the image');
                return;
            }

            // Show loading
            generateButton.disabled = true;
            generateButton.innerHTML = '<span class="material-icons spinning">hourglass_empty</span> Generating...';
            imageResults.innerHTML = '<div class="generating-message">🧙‍♂️ The wizard is conjuring your images...</div>';

            try {
                const response = await fetch('/api/generate-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt })
                });

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                // Display images
                let imagesHTML = '<div class="generated-images-grid">';
                data.images.forEach((img, index) => {
                    imagesHTML += `
                        <div class="generated-image-card">
                            <img src="${img.imageData}" alt="Generated image ${index + 1}" class="generated-image">
                            <a href="${img.imageData}" download="wizard-image-${index + 1}.png" class="download-button">
                                <span class="material-icons">download</span>
                                Download
                            </a>
                        </div>
                    `;
                });
                imagesHTML += '</div>';
                imageResults.innerHTML = imagesHTML;

            } catch (error) {
                imageResults.innerHTML = `
                    <div class="error-message">
                        <span class="material-icons">error_outline</span>
                        <p>The wizard's spell fizzled! ${error.message}</p>
                    </div>
                `;
            } finally {
                generateButton.disabled = false;
                generateButton.innerHTML = '<span class="material-icons">auto_awesome</span> Generate Images';
            }
        });
    }
});
