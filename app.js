const musicPlayer = document.querySelector("#music-player");
const playPauseButton = document.querySelector("#play-pause");
const nextButton = document.querySelector("#next");
const previousButton = document.querySelector("#previous");
const shuffleButton = document.querySelector("#shuffle");
const loopButton = document.querySelector("#loop");

const currentTime = document.querySelector("#current-time");
const totalTime = document.querySelector("#total-time");
const playSlider = document.querySelector("#position");
// const volume = document.querySelector("#volume");

const songTitle = document.querySelector(".player-text h2");
const songArtist = document.querySelector(".player-text p");

let lastPlayedSongs = [];
let currentSong;

let getPlayPosition;

musicPlayer.volume = 0.5;

const songs = {
  radioLQ: {
    title: "Radio (LQ)",
    artist: "Portal",
    src: "./assets/audio/radio loop.mp3",
    duration: "0:22",
  },
  stillAlive: {
    title: "Still Alive",
    artist: "Portal",
    src: "./assets/audio/still alive.mp3",
    duration: "2:57",
  },
  radioHQ: {
    title: "Radio (HQ)",
    artist: "Portal",
    src: "./assets/audio/radio loop uncompressed.mp3",
    duration: "0:22",
  },
  caraMia: {
    title: "Cara Mia",
    artist: "Portal 2",
    src: "./assets/audio/cara mia.mp3",
    duration: "2:35",
  },
  wantYouGone: {
    title: "Want You Gone",
    artist: "Portal 2",
    src: "./assets/audio/want you gone.mp3",
    duration: "2:20",
  },
};

function loadSong(song) {
  musicPlayer.src = song.src;
  musicPlayer.load();

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  currentTime.textContent = "0:00";
  totalTime.textContent = song.duration;

  playSlider.value = 0;

  currentSong = song;
}

function playPauseSong() {
  clearInterval(getPlayPosition);
  if (musicPlayer.paused) {
    musicPlayer.play();
    playPauseButton.innerHTML =
      '<box-icon name="pause" color="white" size="md"></box-icon>';
    getPlayPosition = setInterval(() => {
      playSlider.value = musicPlayer.currentTime / musicPlayer.duration;
      // currentTime.textContent = getCurrentTime();
    }, 10);
  } else {
    musicPlayer.pause();
    playPauseButton.innerHTML =
      '<box-icon name="play" color="white" size="md"></box-icon>';
  }
}

playPauseButton.addEventListener("click", playPauseSong);
playSlider.addEventListener("click", () => {
  clearInterval(getPlayPosition);
  musicPlayer.currentTime = playSlider.value * musicPlayer.duration;
  getPlayPosition = setInterval(() => {
    playSlider.value = musicPlayer.currentTime / musicPlayer.duration;
    // currentTime.textContent = currentTime();
  }, 10);
});

// function getCurrentTime() {
//   let currentTime = musicPlayer.currentTime;
//   currentTime /= 60;
//   currentTime = String(currentTime).substring(0, 4);
//   currentTime = String(currentTime).replace(".", ":");
//   return currentTime;
// }

loopButton.addEventListener("click", () => {
  if (loopButton.classList.contains("enabled")) {
    loopButton.classList.remove("enabled");
    shuffleButton.classList.add("enabled");
    musicPlayer.loop = false;
  } else {
    loopButton.classList.add("enabled");
    shuffleButton.classList.remove("enabled");
    musicPlayer.loop = true;
  }
});

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("enabled")) {
    shuffleButton.classList.remove("enabled");
    musicPlayer.loop = true;
    loopButton.classList.add("enabled");
  } else {
    shuffleButton.classList.add("enabled");
    musicPlayer.loop = false;
    loopButton.classList.remove("enabled");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "MediaPlayPause") {
    playPauseSong();
  }
  if (e.key === "MediaNextTrack") {
    nextButton.click();
  }
  if (e.key === "MediaPreviousTrack") {
    previousButton.click();
  }
});
musicPlayer.addEventListener("ended", () => {
  lastPlayedSongs.push(currentSong);
  clearInterval(getPlayPosition);
  if (shuffleButton.classList.contains("enabled")) {
    let randomSong =
      songs[
        Object.keys(songs)[
          Math.floor(Math.random() * Object.keys(songs).length)
        ]
      ];
    loadSong(randomSong);
    playPauseSong();
  } else {
    loadSong(songs.radioLQ);
    playPauseSong();
  }
});

nextButton.addEventListener("click", () => {
  musicPlayer.currentTime = 10000;
});

previousButton.addEventListener("click", () => {
  loadSong(lastPlayedSongs.at(-1));
  playPauseSong();
});

loadSong(songs.radioLQ);
