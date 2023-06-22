const audio = document.querySelector("audio");
const audioPlayerContainer = document.querySelector(".now-playing-controls");
const durationContainer = document.getElementById("duration");
const currentTimeContainer = document.getElementById("current-time");

let raf = null;

volumeSlider.style.setProperty(
    "--volume-before-width",
    `${volumeSlider.value}%`
);

const whilePlaying = () => {
    seekerSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekerSlider.value);
    audioPlayerContainer.style.setProperty(
        "--seek-before-width",
        `${(seekerSlider.value / seekerSlider.max) * 100}%`
    );
    raf = requestAnimationFrame(whilePlaying);
};

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
};

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
};

const setSliderMax = () => {
    seekerSlider.max = Math.floor(audio.duration);
};

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
} else {
    audio.addEventListener("loadedmetadata", () => {
        displayDuration();
        setSliderMax();
    });
}

seekerSlider.addEventListener("input", () => {
    currentTimeContainer.textContent = calculateTime(seekerSlider.value);
    if (!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekerSlider.addEventListener("change", () => {
    audio.currentTime = seekerSlider.value;
    if (!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});

audio.addEventListener("timeupdate", () => {
    seekerSlider.value = Math.floor(audio.currentTime);
});
