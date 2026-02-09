let highestZ = 1;

class Paper {
  holding = false;
  prevX = 0;
  prevY = 0;
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  rotation = -5;
  raf;

  init(paper) {

    const start = (x, y) => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.prevX = x;
      this.prevY = y;
      cancelAnimationFrame(this.raf);
    };

    const move = (x, y) => {
      if (!this.holding) return;

      this.vx = x - this.prevX;
      this.vy = y - this.prevY;

      this.x += this.vx;
      this.y += this.vy;

      this.rotation += this.vx * 0.05;

      this.prevX = x;
      this.prevY = y;

      paper.style.transform =
        `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    };

    const end = () => {
      this.holding = false;
      this.inertia(paper);
    };

    // Mouse
    paper.addEventListener("mousedown", e => start(e.clientX, e.clientY));
    document.addEventListener("mousemove", e => move(e.clientX, e.clientY));
    document.addEventListener("mouseup", end);

    // Touch
    paper.addEventListener("touchstart", e => {
      const t = e.touches[0];
      start(t.clientX, t.clientY);
    });

    document.addEventListener("touchmove", e => {
      const t = e.touches[0];
      move(t.clientX, t.clientY);
    });

    document.addEventListener("touchend", end);
  }

  inertia(paper) {
    const friction = 0.95;

    const animate = () => {
      this.vx *= friction;
      this.vy *= friction;

      this.x += this.vx;
      this.y += this.vy;

      paper.style.transform =
        `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;

      if (Math.abs(this.vx) > 0.5 || Math.abs(this.vy) > 0.5) {
        this.raf = requestAnimationFrame(animate);
      }
    };

    animate();
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper().init(paper);
});

const nextBtn = document.getElementById("nextBtn");
let leaving = false;

nextBtn.addEventListener("click", () => {
  if (leaving) return;
  leaving = true;

  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "last.html"; // 👈 Page 4
  }, 1000);
});


let interacted = false;

document.querySelectorAll(".paper").forEach(paper => {
  paper.addEventListener("mousedown", showContinue);
  paper.addEventListener("touchstart", showContinue);
});

function showContinue() {
  if (interacted) return;
  interacted = true;

  nextBtn.style.opacity = 1;
  nextBtn.style.pointerEvents = "auto";
}
