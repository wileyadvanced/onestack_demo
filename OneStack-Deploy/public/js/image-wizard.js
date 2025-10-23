// Image Wizard functionality
document.addEventListener('DOMContentLoaded', () => {
    const imageWizardButton = document.getElementById('imageWizardButton');
    const imageModal = document.getElementById('imageModal');
    const imageModalClose = document.getElementById('imageModalClose');
    const generateButton = document.getElementById('generateButton');
    const imagePrompt = document.getElementById('imagePrompt');
    const imageResults = document.getElementById('imageResults');

    // Wizard prompt suggestions
    const wizardPrompts = [
        "A majestic dragon soaring over a mystical mountain range at sunset",
        "A cozy wizard's library filled with glowing spell books and floating candles",
        "A cyberpunk cityscape with neon lights reflecting on wet streets",
        "An enchanted forest with bioluminescent mushrooms and fairy lights",
        "A steampunk airship floating through clouds above Victorian London",
        "A serene Japanese zen garden with a koi pond and cherry blossoms",
        "An astronaut discovering an alien temple on a distant planet",
        "A medieval knight battling a giant serpent in a torch-lit cavern",
        "A futuristic robot tending to a beautiful garden of mechanical flowers",
        "A phoenix rising from flames in a dramatic display of fire and light",
        "An underwater palace with mermaids and schools of tropical fish",
        "A wise old wizard's tower perched on a cliff during a lightning storm",
        "A magical marketplace with floating lanterns and mystical creatures",
        "A powerful sorceress casting a spell with swirling magical energy",
        "An ancient treehouse village connected by rope bridges in a rainforest"
    ];

    let usedPrompts = [];

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

    // Wizard speech bubble for prompt suggestions
    function showWizardSpeech() {
        // Get a random prompt that hasn't been used recently
        if (usedPrompts.length >= wizardPrompts.length) {
            usedPrompts = []; // Reset if all prompts have been used
        }

        const availablePrompts = wizardPrompts.filter(p => !usedPrompts.includes(p));
        const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
        usedPrompts.push(randomPrompt);

        // Create speech bubble if it doesn't exist
        let speechBubble = document.getElementById('wizardSpeechBubble');
        if (!speechBubble) {
            speechBubble = document.createElement('div');
            speechBubble.id = 'wizardSpeechBubble';
            speechBubble.className = 'wizard-speech-bubble hidden';
            document.body.appendChild(speechBubble);
        }

        // Set content with wizard voice
        speechBubble.innerHTML = `
            <div class="wizard-speech-header">
                <span class="wizard-avatar">🧙‍♂️</span>
                <span class="wizard-name">The Wise Wizard</span>
            </div>
            <p class="wizard-greeting">Ah, young apprentice! You seek a prompt example?</p>
            <p class="wizard-prompt-intro">Behold, I shall bestow upon thee a most wondrous vision:</p>
            <div class="wizard-prompt-text">"${randomPrompt}"</div>
            <button class="use-prompt-button" onclick="document.getElementById('imagePrompt').value = '${randomPrompt.replace(/'/g, "\\'")}'; document.getElementById('wizardSpeechBubble').classList.add('hidden');">
                <span class="material-icons">auto_awesome</span>
                Use This Prompt
            </button>
        `;

        // Show the speech bubble
        speechBubble.classList.remove('hidden');

        // Auto-hide after 15 seconds
        setTimeout(() => {
            speechBubble.classList.add('hidden');
        }, 15000);
    }

    // Add double-click handler to wizard emoji in modal
    const wizardEmoji = document.querySelector('.image-modal .wizard-emoji');
    if (wizardEmoji) {
        wizardEmoji.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            showWizardSpeech();
        });
        wizardEmoji.style.cursor = 'pointer';
        wizardEmoji.title = 'Double-click for a prompt suggestion!';
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
