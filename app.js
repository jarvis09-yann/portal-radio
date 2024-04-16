let audio;
const radio = document.getElementById("radio-image");

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
  } else {
    radio.classList.remove("pause");
    radio.classList.add("play");

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
