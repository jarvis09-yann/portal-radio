let audio;
const radio = document.getElementById("radio-image");
const tip = document.getElementById("tip");

function toggleMusic() {
  if (radio.classList.contains("play")) {
    radio.classList.remove("play");
    radio.classList.add("pause");

    if (radio.classList.contains("first-run")) {
      radio.classList.remove("first-run");

      audio = new Audio("./audio-uncompressed.mp3");
      console.log("The cake is a lie.");
      audio.loop = true;
    }
    audio.volume = 0.5;
    audio.play();
    tip.classList.add("hidden");
  } else {
    radio.classList.remove("pause");
    radio.classList.add("play");
    tip.classList.remove("hidden");

    audio.pause();
  }
}
// radio.addEventListener(
//   "ended",
//   function () {
//     this.play();
//     console.log("looping  ");
//   },
//   false
// );
