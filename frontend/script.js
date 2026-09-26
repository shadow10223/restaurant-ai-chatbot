// Grab references to the HTML elements we need to work with
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Fake bot replies for now — Phase 3 will replace this with real logic
const fakeReplies = [
  "Thanks for your question! (This is a placeholder reply — real answers coming in Phase 3.)",
  "I hear you! Right now I'm just a demo shell, but soon I'll answer using real restaurant info.",
  "Great question. Once connected to the knowledge base, I'll give you a real answer here."
];

// Adds a message bubble to the chat window
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);

  // Auto-scroll to the newest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Picks a random fake reply
function getFakeReply() {
  const randomIndex = Math.floor(Math.random() * fakeReplies.length);
  return fakeReplies[randomIndex];
}

// Runs when the user submits the form (typing + Enter, or clicking Send)
chatForm.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading

  const message = userInput.value.trim();
  if (message === '') return; // ignore empty submissions

  addMessage(message, 'user');
  userInput.value = ''; // clear the input box

  // Simulate the bot "thinking" for a moment before replying
  setTimeout(function () {
    const reply = getFakeReply();
    addMessage(reply, 'bot');
  }, 600);
});