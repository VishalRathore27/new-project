const btn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
const cards = document.querySelectorAll(".card");
const scrollHint = document.getElementById("scrollHint");
const scrollContinue = document.getElementById("scrollContinue");

let musicStarted = false;
let transitioning = false;

// manual control
btn.onclick = () => {
  if (music.paused) {
    music.play();
    btn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    btn.textContent = "▶ Play Music";
  }
};

// start music on first scroll
window.addEventListener("scroll", () => {
  if (!musicStarted) {
    music.volume = 1;
    music.play().catch(()=>{});
    btn.textContent = "⏸ Pause Music";
    musicStarted = true;
    scrollHint.style.display = "none";
  }

  // reveal cards
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });

  // show scroll to continue near end
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    scrollContinue.style.opacity = 1;
  }

  // go next at bottom
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 10
  ) {
    goNext();
  }
});

function goNext() {
  if (transitioning) return;
  transitioning = true;

  // fade music
  let vol = music.volume;
  const fade = setInterval(() => {
    vol -= 0.04;
    music.volume = Math.max(vol, 0);
    if (vol <= 0) clearInterval(fade);
  }, 80);

  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "test.html"; // Page 3
  }, 1200);
}
