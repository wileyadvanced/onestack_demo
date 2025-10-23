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

                // Check for HTTP error status
                if (!response.ok) {
                    console.error('Image generation failed:', response.status, data);
                    throw new Error(data.error || data.details || `Failed to generate images (${response.status})`);
                }

                if (data.error) {
                    console.error('Image generation error:', data);
                    throw new Error(data.error + (data.details ? `: ${data.details}` : ''));
                }

                // Check if we got images
                if (!data.images || data.images.length === 0) {
                    console.error('No images returned:', data);
                    throw new Error('No images were generated. Try a different prompt.');
                }

                console.log('Successfully generated images:', data.images.length);

                // Display images
                let imagesHTML = '<div class="generated-images-grid">';
                data.images.forEach((img, index) => {
                    imagesHTML += `
                        <div class="generated-image-card">
                            <img src="${img.imageData}" alt="Generated image ${index + 1}" class="generated-image"
                                 onerror="this.parentElement.innerHTML='<div class=\\'image-load-error\\'>Image ${index + 1} failed to load</div>'">
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
                console.error('Image wizard error:', error);
                imageResults.innerHTML = `
                    <div class="error-message">
                        <span class="material-icons">error_outline</span>
                        <h3>Oops! The Wizard's Spell Fizzled</h3>
                        <p>${error.message}</p>
                        <p class="error-hint">Try a different prompt or check the console for more details.</p>
                    </div>
                `;
            } finally {
                generateButton.disabled = false;
                generateButton.innerHTML = '<span class="material-icons">auto_awesome</span> Generate Images';
            }
        });
    }
});
