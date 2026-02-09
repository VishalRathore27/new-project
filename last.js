/* ---------- MUSIC ---------- */
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 1;
music.play();

musicBtn.onclick = () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "▶ Play Music";
  }
};

/* ---------- CANVAS SKETCH ---------- */
const canvas = document.getElementById("sketchCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "img11.jpeg";

const choiceBox = document.getElementById("choiceBox");

img.onload = () => {
  const scale = Math.min(
    window.innerWidth / img.width,
    window.innerHeight / img.height
  );

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  const temp = document.createElement("canvas");
  temp.width = img.width;
  temp.height = img.height;
  const tctx = temp.getContext("2d");
  tctx.drawImage(img, 0, 0);
  const data = tctx.getImageData(0, 0, img.width, img.height);

  const pixels = [];
  for (let y = 0; y < img.height; y += 3) {
    for (let x = 0; x < img.width; x += 3) {
      const i = (y * img.width + x) * 4;
      if ((data.data[i] + data.data[i+1] + data.data[i+2]) / 3 < 240) {
        pixels.push({ x, y });
      }
    }
  }

  pixels.sort(() => Math.random() - 0.5);

  let index = 0;
  let stage = 1;

  function drawSketch() {
    for (let i = 0; i < 50; i++) {
      if (index >= pixels.length - 1) {
        if (stage === 1) {
          stage = 2;
          index = 0;
          setTimeout(drawSketch, 400);
          return;
        }
        revealImage();
        return;
      }

      const p1 = pixels[index];
      const p2 = pixels[index + 1];
      const ci = (p1.y * img.width + p1.x) * 4;

      const r = data.data[ci];
      const g = data.data[ci+1];
      const b = data.data[ci+2];

      ctx.strokeStyle =
        stage === 1
          ? `rgba(${r},${r},${r},0.6)`
          : `rgba(${r},${g},${b},0.8)`;

      ctx.lineWidth = 0.15;
      ctx.beginPath();
      ctx.moveTo(p1.x * scale, p1.y * scale);
      ctx.lineTo(p2.x * scale, p2.y * scale);
      ctx.stroke();

      index++;
    }
    requestAnimationFrame(drawSketch);
  }

  function revealImage() {
    let opacity = 0;
    const reveal = setInterval(() => {
      opacity += 0.03;
      ctx.globalAlpha = opacity;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (opacity >= 1) {
        clearInterval(reveal);
        ctx.globalAlpha = 1;
        drawText();
      }
    }, 40);
  }

  function drawText() {
    const text = "I Love You Sahibaa ❤️";
    ctx.font = "32px cursive";
    ctx.strokeStyle = "rgba(246, 16, 16, 0.8)";
    ctx.lineWidth = 2;

    let x = canvas.width / 2 - 150;
    const y = canvas.height - 50;
    let i = 0;

    const interval = setInterval(() => {
      ctx.strokeText(text[i], x, y);
      x += ctx.measureText(text[i]).width;
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        showChoices(); // ❤️ SHOW OPTIONS HERE
      }
    }, 120);
  }

  function showChoices() {
    choiceBox.classList.remove("hidden");
  }

  drawSketch();
};

/* ---------- BUTTON ACTIONS ---------- */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.onclick = () => {
  document.body.style.background = "#ffe6f0";
  alert("Thank you me aapke sare nakhare uthaunga or aapki care karunga or bohot pyaar karunga Sahibaa... ❤️");
};

noBtn.onclick = () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.background = "#000";
    alert("I understand… lekin sorry me phir bhi aapse hi pyaar karunga 💔");
    document.body.style.opacity = "1";
  }, 1500);
};

/* ---------- EMAILJS ---------- */
emailjs.init("8f-EZu4UOQrdMw6H0");

function sendResponse(answer) {
  emailjs.send("service_dx0qtqd", "template_4ow9hy3", {
    answer: answer,
    time: new Date().toLocaleString()
  });
}

yesBtn.addEventListener("click", () => sendResponse("YES ❤️"));
noBtn.addEventListener("click", () => sendResponse("NO 💔"));
