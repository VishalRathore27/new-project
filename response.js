(function () {
  emailjs.init("8f-EZu4UOQrdMw6H0");
})();

const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIAvgqz7r4k1bDBfBT4UCmOOV5CIfddedsBw6cygS3VQuR_hWcAet83JmfvNyugE8kYykxZuIw3rtQ/pubhtml";

function sendResponse(answer) {

  // 🔹 Google Sheet
  fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify({ response: answer })
  });

  // 🔹 EmailJS
  emailjs.send("service_dx0qtqd", "template_4ow9hy3", {
    answer: answer,
    time: new Date().toLocaleString()
  })
  .then(() => {
    console.log("✅ Email sent");
  })
  .catch((err) => {
    console.error("❌ EmailJS Error:", err);
    alert("Email error – console check karo");
  });
}

document.getElementById("yesBtn").onclick = () => {
  sendResponse("YES ❤️");
};

document.getElementById("noBtn").onclick = () => {
  sendResponse("NO 💔");
};
