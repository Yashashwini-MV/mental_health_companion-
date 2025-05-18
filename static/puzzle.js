let size = 4;
let pieces = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("size-select").addEventListener("change", (e) => {
    size = parseInt(e.target.value);
  });

  generatePuzzle(); // Generate default puzzle
});

function generatePuzzle() {
  const container = document.getElementById("puzzle-container");
  container.innerHTML = "";
  pieces = [];

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  const total = size * size;

  for (let i = 1; i <= total; i++) {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.textContent = i === total ? "" : i;
    piece.dataset.value = i;

    container.appendChild(piece);
    pieces.push(piece);
  }

  container.addEventListener("click", swapPiece);
}

function swapPiece(event) {
  const clicked = event.target;
  if (!clicked.classList.contains("puzzle-piece")) return;

  const empty = pieces.find(p => p.textContent === "");
  if (!empty) return;

  const clickedIndex = pieces.indexOf(clicked);
  const emptyIndex = pieces.indexOf(empty);

  const rowSize = size;
  const isAdjacent =
    clickedIndex === emptyIndex - 1 && emptyIndex % rowSize !== 0 ||
    clickedIndex === emptyIndex + 1 && clickedIndex % rowSize !== 0 ||
    clickedIndex === emptyIndex - rowSize ||
    clickedIndex === emptyIndex + rowSize;

  if (isAdjacent) {
    [clicked.textContent, empty.textContent] = [empty.textContent, clicked.textContent];
  }
}
