const audio = document.querySelector("#stream");
const radio = document.querySelector(".source");
const playPauseButton = document.querySelector('[name="play-pause"]');
const playPauseButtonIcon = playPauseButton.querySelector("i.fas");
const volumeControl = document.querySelector('[name="volume"]');
const currentlyPlaying = document.querySelector(".currently-playing-title");
const volumeButton = document.querySelector('[name="mute"]');
const volumeButtonIcon = volumeButton.querySelector("i.fas");
const image = document.querySelector(".img-container");

let isPlaying = false;
let fetchInterval = null;
let currentVolume = 0.2;
const rad_io = "https://relay0.r-a-d.io/main.mp3";         //R/a/d.io
const doujinStyle = "https://streams.radio.co/s5ff57669c/listen"; //Doujin Style
const gensokyoRadio = "https://stream.gensokyoradio.net/3"; // gensokyoradio

audio.volume = currentVolume;

/**
 * Fetches the currently playing
 * @returns {Promise<any>}
 */
// const fetchCurrentlyPlaying = () =>
//   fetch("...")
//     .then((response) => response.json())
//     .then((data) => (currentlyPlaying.innerText = data.currentSong));
/**
 * Adjusts the icon of the "mute" button based on the given volume.
 * @param volume
 */
const adjustVolumeIcon = (volume) => {
  volumeButtonIcon.classList.remove("fa-volume-off");
  volumeButtonIcon.classList.remove("fa-volume-down");
  volumeButtonIcon.classList.remove("fa-volume-up");
  volumeButtonIcon.classList.remove("fa-volume-mute");

  if (volume >= 0.75) {
    volumeButtonIcon.classList.add("fa-volume-up");
  }

  if (volume < 0.75 && volume >= 0.2) {
    volumeButtonIcon.classList.add("fa-volume-down");
  }

  if (volume < 0.2 && volume > 0) {
    volumeButtonIcon.classList.add("fa-volume-off");
  }

  if (volume === 0) {
    volumeButtonIcon.classList.add("fa-volume-mute");
  }

};

function stopAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}


function cycleSource() {
  current = document.querySelector('[name="current"]');
  stopAudio(audio);
  currentSource = audio.currentSrc;
  audio.src = '';
  if (currentSource === rad_io) {
    audio.load();
    audio.play();
    audio.src = doujinStyle;
    var radio = "Doujin Style"

  }
  else if (currentSource === doujinStyle) {
    audio.src = gensokyoRadio;
    audio.load();
    audio.play();
    var radio = "Gensokyo Radio"
  }
  else {
    audio.src = rad_io;
    audio.load();
    audio.play();
    var radio = "r/a/d.io"


  }

  current.innerHTML = radio + " \n" + audio.src;

};



radio.addEventListener("click", cycleSource);

volumeControl.addEventListener("input", () => {
  const volume = parseFloat(volumeControl.value);

  audio.volume = currentVolume = volume;
  currentVolume = volume;

  adjustVolumeIcon(volume);
});

volumeButton.addEventListener("click", () => {
  if (audio.volume > 0) {
    adjustVolumeIcon(0);
    audio.volume = 0;
    volumeControl.value = 0;
  } else {
    adjustVolumeIcon(currentVolume);
    audio.volume = currentVolume;
    volumeControl.value = currentVolume;
  }
});
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();

    image.classList.remove("play");
    playPauseButtonIcon.classList.remove("fa-pause");
    playPauseButtonIcon.classList.add("fa-play");

    // clearInterval(fetchInterval);
    currentlyPlaying.innerText = "Listen to Some Radio Station";
  } else {
    audio.play();

    image.classList.add("play");
    playPauseButtonIcon.classList.remove("fa-play");
    playPauseButtonIcon.classList.add("fa-pause");

    // fetchCurrentlyPlaying();
    // fetchInterval = setInterval(fetchCurrentlyPlaying, 3000);
  }

  isPlaying = !isPlaying;
});
