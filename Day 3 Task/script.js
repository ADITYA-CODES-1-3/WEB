// 1. SELECTING ALL ELEMENTS
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const resultModal = document.getElementById('resultModal');
const finalWpmElement = document.getElementById('finalWpm');

// Global variables to track state
let timerInterval;
let startTime;

// 2. ROBUST QUOTE FETCHER (API + BACKUP)
const RANDOM_QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

async function getRandomQuote() {
    try {
        const response = await fetch(RANDOM_QUOTE_API_URL);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data.quote; 
    } catch (error) {
        console.log("API failed, using local backup.");
        const localQuotes = [
            "The quick brown fox jumps over the lazy dog.",
            "Knowledge is power.",
            "Practice makes a man perfect.",
            "The soul never thinks without a picture.",
            "I think therefore I am.",
            "Simplicity is the ultimate sophistication."
        ];
        return localQuotes[Math.floor(Math.random() * localQuotes.length)];
    }
}

// 3. MAIN GAME LOGIC (Typing Event)
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    let correctChars = 0; // Track correct letters for WPM

    // Loop through every character to check correctness
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false; 
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            correctChars++; // Count this as a correct keystroke
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false; 
        }
    });

    // Update WPM in real-time
    calculateLiveWPM(correctChars);

    // --- GAME OVER CHECK ---
    if (correct) {
        clearInterval(timerInterval);
        
        // 1. Disable typing so they can't change the score
        quoteInputElement.disabled = true;
        
        // 2. Show the "Game Over" modal
        resultModal.classList.remove('hidden');
        
        // 3. Display the final result in the modal
        finalWpmElement.innerText = wpmElement.innerText;
    }
});

// 4. LIVE WPM CALCULATION
function calculateLiveWPM(correctChars) {
    const timeInSeconds = getTimerTime();
    
    // Prevent weird numbers if time is 0
    if (timeInSeconds < 1) {
        wpmElement.innerText = 0;
        return;
    }

    const words = correctChars / 5; // Standard: 5 chars = 1 word
    const minutes = timeInSeconds / 60;
    
    const wpm = Math.floor(words / minutes);
    wpmElement.innerText = wpm;
}

// 5. RENDER NEW QUOTE (Reset Game)
async function renderNewQuote() {
    // Hide the result modal
    resultModal.classList.add('hidden');
    
    // Re-enable input box and clear it
    quoteInputElement.disabled = false;
    quoteInputElement.value = null;
    
    // Show loading text
    quoteDisplayElement.innerHTML = 'Loading...';
    
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    
    // Split quote into spans
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    
    // Reset Timer and WPM display
    wpmElement.innerText = 0;
    startTimer();
    
    // Automatically focus the input box so user can type immediately
    quoteInputElement.focus();
}

// 6. TIMER LOGIC
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    
    clearInterval(timerInterval); // Stop any old timers
    timerInterval = setInterval(() => {
        timerElement.innerText = getTimerTime();
        
        // Optional: Force WPM update every second (even if not typing)
        // so WPM drops if you take a break
        const correctChars = document.querySelectorAll('.correct').length;
        calculateLiveWPM(correctChars);
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

// Start the game immediately on load
renderNewQuote();