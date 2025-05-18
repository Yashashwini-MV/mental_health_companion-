document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("game-container");

    function createBubble() {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Random size between 60px and 100px
        const size = Math.random() * 40 + 60;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // Random position
        bubble.style.left = Math.random() * 90 + "vw";
        bubble.style.top = Math.random() * 90 + "vh";

        // Random color with transparency
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        bubble.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.5)`;

        bubble.addEventListener("click", function () {
            bubble.remove();
        });

        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 5000);
    }

    setInterval(createBubble, 1000);
});
