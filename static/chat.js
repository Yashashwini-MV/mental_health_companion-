document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  chatForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevents page reload

      let userMessage = userInput.value.trim();
      if (userMessage === "") return; // Ignore empty messages

      // Append user message to chat box
      chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

      // Send message to Flask backend
      fetch("/get", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ msg: userMessage }),
      })
      .then(response => response.json())
      .then(data => {
          // Append bot response to chat box
          chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
          userInput.value = ""; // Clear input field
          chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
      })
      .catch(error => console.error("Error:", error));
  });
});
