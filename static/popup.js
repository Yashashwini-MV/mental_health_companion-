document.addEventListener("DOMContentLoaded", function () {
  let popup = document.getElementById("popupMessage");
  let messageText = document.getElementById("messageText");

  // Array of 50 different positive messages
  const messages = [
      "You are stronger than you think! 💪",
      "Remember to take deep breaths and relax. 🌿",
      "You are loved and appreciated. 💖",
      "One step at a time. You're doing great! 👣",
      "It's okay to rest. Recharge and shine! ✨",
      "You are capable of amazing things! 🌟",
      "No storm lasts forever. Keep going! 🌈",
      "Your feelings are valid. Take care of yourself. 🤗",
      "Progress, not perfection. Keep moving forward. 🚀",
      "You are enough, just as you are. ❤️",
      "Smile! You're making the world brighter. 😄",
      "Every day is a new beginning. 🌅",
      "Be kind to yourself. You deserve it. 💙",
      "You matter more than you know. 💜",
      "Small progress is still progress! 👏",
      "You're not alone. I'm here with you. 🤝",
      "Take it easy. One breath at a time. 🧘‍♂️",
      "You have survived 100% of your bad days. 💯",
      "You are worthy of happiness. 🎉",
      "Your future is full of possibilities! 🚪",
      "Believe in yourself. You are amazing! 🌟",
      "You deserve love and kindness. 💕",
      "Your hard work will pay off. Keep going! 💼",
      "Self-care isn’t selfish. Take time for you. 🛁",
      "Your journey is unique and valuable. 🌍",
      "You are more resilient than you realize. 💎",
      "Everything is temporary. Even tough times. ⏳",
      "You can handle this. You've got this! 🔥",
      "You radiate positivity. Keep shining! 🌞",
      "One act of kindness can change a day. 🌻",
      "You’re exactly where you need to be. ⏰",
      "Mistakes help you grow. Keep learning! 📚",
      "Your voice matters. Speak your truth. 🎤",
      "You bring joy to the world. 💐",
      "Happiness is a journey, not a destination. 🚢",
      "Your dreams are worth chasing. ✈️",
      "Even small victories count. Celebrate them! 🎊",
      "You are doing your best, and that’s enough. 💖",
      "Your kindness makes a difference. 🌼",
      "Every challenge makes you stronger. 💪",
      "You are never alone. You are loved. ❤️",
      "Your story isn’t over yet. Keep writing it. 📝",
      "Your feelings matter. Take care of yourself. 🤗",
      "You have so much to offer the world. 🌏",
      "You light up the lives of those around you. 🔆",
      "You are appreciated more than you know. 🙌",
      "A little progress each day adds up. 🏆",
      "Be proud of how far you've come. 🎖️",
      "You are special, just the way you are. 🦄",
      "You are enough. Just as you are. 💜"
  ];

  // Pick a random message
  const randomIndex = Math.floor(Math.random() * messages.length);
  messageText.textContent = messages[randomIndex];

  // Show the popup
  popup.style.display = "flex";

  // Function to close the popup
  window.closePopup = function () {
      popup.style.display = "none";
  };
});
