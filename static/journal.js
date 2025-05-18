document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("journalDate");
  dateInput.value = today;

  dateInput.addEventListener("change", loadJournal);
  loadJournal(); // Load current day's entry
});

function loadJournal() {
  const date = document.getElementById("journalDate").value;
  fetch(`/get_journal/${date}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("journalEntry").value = data.content || "";
    });
}

function saveJournal() {
  const date = document.getElementById("journalDate").value;
  const content = document.getElementById("journalEntry").value;

  fetch("/save_journal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, content })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Saved!");
    })
    .catch(err => {
      console.error(err);
      alert("Error saving journal.");
    });
}
