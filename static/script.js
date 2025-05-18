document.addEventListener("DOMContentLoaded", function () {
  const messages = [
      "You are enough. 💜",
      "Take a deep breath, you got this! ✨",
      "One step at a time, my love. 🌸",
      "You're doing amazing! 💖",
  ];
  document.getElementById("popupMessage").innerText = messages[Math.floor(Math.random() * messages.length)];
});

function navigateTo(page) {
  window.location.href = page;
}

function saveJournal() {
  const date = document.getElementById("journalDate").value;
  const entry = document.getElementById("journalEntry").value;

  if (date && entry) {
      localStorage.setItem(date, entry);
      alert("Journal entry saved! 💜");
  } else {
      alert("Please enter a date and a journal entry.");
  }
}

function viewEntry() {
  const date = document.getElementById("journalDate").value;
  const entry = localStorage.getItem(date);

  if (entry) {
      document.getElementById("journalOutput").innerText = `Entry for ${date}: ${entry}`;
  } else {
      document.getElementById("journalOutput").innerText = "No entry found for this date.";
  }
}
