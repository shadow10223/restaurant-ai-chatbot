// Grab references to the HTML elements we need to work with
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// The URL of our backend API
const API_URL = 'http://127.0.0.1:8000/chat';

// Converts simple Markdown formatting into HTML
function formatMessage(text) {
  let formatted = text;

  // Bold: **text** -> <strong>text</strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert lines starting with "- " into list items
  formatted = formatted.replace(/(?:^|\n)- (.*?)(?=\n|$)/g, '<li>$1</li>');
  formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

  // Collapse 2+ line breaks into a single one, then convert to <br>
  formatted = formatted.replace(/\n{2,}/g, '\n');
  formatted = formatted.replace(/\n/g, '<br>');

  return formatted;
}

// Adds a message bubble to the chat window
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

  if (sender === 'user') {
    messageDiv.textContent = text; // plain text, no formatting needed
  } else {
    messageDiv.innerHTML = formatMessage(text); // render bot's Markdown as HTML
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageDiv;
}

// Shows a "typing..." indicator and returns it so we can remove it later
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
  typingDiv.textContent = 'Typing...';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingDiv;
}

// Sends the user's message to our backend and returns the bot's reply
async function getBotReply(message) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  });

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}

// Runs when the user submits the form (typing + Enter, or clicking Send)
chatForm.addEventListener('submit', async function (event) {
  event.preventDefault(); // stop the page from reloading

  const message = userInput.value.trim();
  if (message === '') return; // ignore empty submissions

  addMessage(message, 'user');
  userInput.value = ''; // clear the input box

  const typingIndicator = showTypingIndicator();

  try {
    const reply = await getBotReply(message);
    typingIndicator.remove(); // remove "Typing..." bubble
    addMessage(reply, 'bot');
  } catch (error) {
    typingIndicator.remove();
    addMessage(
      "Sorry, I'm having trouble connecting right now. Please make sure the server is running and try again.",
      'bot'
    );
    console.error('Error fetching bot reply:', error);
  }
});

// Suggested questions shown as clickable buttons
const suggestedQuestions = [
  "What's on the menu?",
  "What are your hours?",
  "Do you deliver?"
];

// Adds clickable suggestion buttons to the chat window
function showSuggestions() {
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.classList.add('suggestions');

  suggestedQuestions.forEach(function (question) {
    const button = document.createElement('button');
    button.classList.add('suggestion-btn');
    button.textContent = question;
    button.addEventListener('click', function () {
      userInput.value = question;
      chatForm.requestSubmit(); // triggers the same submit logic as pressing Enter
      suggestionsDiv.remove(); // remove suggestions after one is used
    });
    suggestionsDiv.appendChild(button);
  });

  chatMessages.appendChild(suggestionsDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Runs once, when the page finishes loading
window.addEventListener('DOMContentLoaded', function () {
  addMessage(
    "Hi! I'm the Basil & Ember AI assistant. Ask me about our menu, hours, delivery, or reservations — I'll answer using our restaurant's real information.",
    'bot'
  );
  showSuggestions();
});