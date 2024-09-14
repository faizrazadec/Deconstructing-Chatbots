// Variables to track interactions and chatbot state
let interactionCount = 0;
const maxInteractions = [1, 2, 3]; // Define interaction thresholds for popups
const popupDelays = [5000, 10000, 30000]; // Corresponding delays for each interaction

// Function to play sound notification
function playSound() {
    console.log("Playing sound...");
    const audio = new Audio('notification.mp3'); // Path to your notification sound
    audio.play().catch(error => {
        console.error("Error playing sound:", error); // Log any playback errors
    });
}

// Function to show popup and play sound
function showPopup() {
    const popupMessage = document.querySelector('.popup-message');
    popupMessage.style.display = 'block'; // Show popup message
    playSound(); // Play sound when the popup appears
}

// Check if the chatbot has been interacted with before
function hasUserInteracted() {
    return localStorage.getItem('chatbotInteracted') === 'true';
}

// Function to handle user interaction
function handleUserInteraction() {
    if (!hasUserInteracted()) {
        interactionCount += 1; // Increment interaction count
        console.log(`User interacted. Interaction count: ${interactionCount}`);

        // Check interaction thresholds and show popup accordingly
        for (let i = 0; i < maxInteractions.length; i++) {
            if (interactionCount === maxInteractions[i]) {
                // Start the timer to show popup and play sound
                setTimeout(function() {
                    if (!hasUserInteracted()) { // Only show if not interacted before
                        console.log(`Showing popup and playing sound after ${popupDelays[i] / 1000} seconds...`);
                        showPopup();
                    }
                }, popupDelays[i]); // Delay based on interaction count
                break; // Exit loop once a matching interaction count is found
            }
        }
    }
}

// Event listener for user clicks
document.addEventListener('click', handleUserInteraction);

// Toggle chatbot window open/close
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const popupMessage = document.querySelector('.popup-message');

    if (chatWindow.classList.contains('show')) {
        chatWindow.classList.remove('show');
        chatWindow.classList.add('hide');
    } else {
        chatWindow.classList.remove('hide');
        chatWindow.classList.add('show');
        popupMessage.style.display = 'none'; // Hide popup after clicking
    }

    // Mark chatbot as interacted
    localStorage.setItem('chatbotInteracted', 'true');
}

// Add a hidden interaction button to satisfy autoplay restrictions
document.addEventListener('DOMContentLoaded', () => {
    const unlockButton = document.createElement('button');
    unlockButton.style.display = 'none'; // Hide the button
    document.body.appendChild(unlockButton);

    unlockButton.addEventListener('click', () => {
        if (!hasUserInteracted()) {
            localStorage.setItem('chatbotInteracted', 'true'); // Mark that the user has interacted
            console.log("Hidden button clicked. Starting timeout...");
            // Start the timer to show popup and play sound after 5 seconds
            setTimeout(function() {
                if (!hasUserInteracted()) { // Only show if not interacted before
                    console.log("Showing popup and playing sound after 5 seconds...");
                    showPopup();
                }
            }, 5000); // 5 seconds
        }
    });
});
