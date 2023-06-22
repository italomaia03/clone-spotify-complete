const createAnimatedIcon = (tagElement, path) => {
    return bodymovin.loadAnimation({
        container: tagElement,
        path: path,
        renderer: "svg",
        loop: false,
        autoplay: false,
        name: "Demo Animation",
    });
};

const animateButton = (animatedButton, state1, state2, ...segments) => {
    if (playButtonState === state1) {
        animatedButton.playSegments(segments.slice(1), true);
        playButtonState = state2;
    } else {
        animatedButton.playSegments(segments.slice(0, 2), true);
        playButtonState = state1;
    }
};

const seekerSlider = document.getElementById("seeker-slider");
const volumeSlider = document.querySelector("#volume-slider");
const volumeButton = document.getElementById("volume-button");

const volumeStage1Path =
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/volume-1/volume-1.json";
const volumeStage2Path =
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/volume-2/volume-2.json";
const mutePath =
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json";

const backwardIconContainer = document.getElementById("backward-icon");
const forwardIconContainer = document.getElementById("forward-icon");
const playIconContainer = document.getElementById("play-icon");
const volumeMuteContainer = document.getElementById("volume-control-icon-mute");
const volumeStage1Container = document.getElementById(
    "volume-control-icon-stage1"
);
const volumeStage2Container = document.getElementById(
    "volume-control-icon-stage2"
);

let playButtonState = "play";
let muteButtonState = "unmute";
let volumeState = "highRange";

// backward button
const animatedBackwardButton = createAnimatedIcon(
    backwardIconContainer,
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/skip-backwards/skip-backwards.json"
);

// forward button
const animatedForwardButton = createAnimatedIcon(
    forwardIconContainer,
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/skip-forwards/skip-forwards.json"
);

// play button
const animatedPlayButton = createAnimatedIcon(
    playIconContainer,
    "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json"
);

// mute button
const animateMuteButton = createAnimatedIcon(volumeMuteContainer, mutePath);
const animateVolume1Button = createAnimatedIcon(
    volumeStage1Container,
    volumeStage1Path
);
const animateVolume2Button = createAnimatedIcon(
    volumeStage2Container,
    volumeStage2Path
);

handleVolumeIcons(volumeSlider.value);

animatedPlayButton.goToAndStop(14, true);
animateMuteButton.goToAndStop(25, true);
animateVolume1Button.goToAndStop(25, true);
animateVolume2Button.goToAndStop(25, true);

playIconContainer.addEventListener("click", () => {
    if (playButtonState === "play") {
        audio.play();
        animatedPlayButton.playSegments([14, 27], true);
        requestAnimationFrame(whilePlaying);
        playButtonState = "pause";
    } else {
        audio.pause();
        animatedPlayButton.playSegments([0, 14], true);
        cancelAnimationFrame(raf);
        playButtonState = "play";
    }
});

function muteButtonAnimationHandler() {
    if (muteButtonState === "unmute") {
        animateMuteButton.playSegments([0, 15], true);
        audio.muted = true;
        muteButtonState = "mute";
    } else {
        animateMuteButton.playSegments([15, 25], true);
        audio.muted = false;
        muteButtonState = "unmute";
    }
}

volumeButton.addEventListener("click", () => {
    if (volumeSlider.value > 0) {
        handleVolumeIcons((volumeSlider.value = 0));
    } else {
        handleVolumeIcons((volumeSlider.value = 100));
        muteButtonAnimationHandler();
    }
});

backwardIconContainer.addEventListener("click", () =>
    animatedBackwardButton.play()
);
forwardIconContainer.addEventListener("click", () =>
    animatedForwardButton.play()
);

const showRangeProgress = (rangeInput) => {
    if (rangeInput === seekerSlider)
        audioPlayerContainer.style.setProperty(
            "--seek-before-width",
            (rangeInput.value / rangeInput.max) * 100 + "%"
        );
    else
        audioPlayerContainer.style.setProperty(
            "--volume-before-width",
            (rangeInput.value / rangeInput.max) * 100 + "%"
        );
};

seekerSlider.addEventListener("input", (e) => {
    showRangeProgress(e.target);
});
volumeSlider.addEventListener("input", (e) => {
    volumeSlider.style.setProperty(
        "--volume-before-width",
        `${volumeSlider.value}%`
    );
    const value = e.target.value;
    showRangeProgress(e.target);
    audio.volume = value / 100;
    handleVolumeIcons(value);
});

function handleVolumeIcons(volumeLevel) {
    const lowVolume = 100 / 3;
    const midVolume = 2 * lowVolume;

    if (volumeLevel < lowVolume) {
        volumeMuteContainer.style.display = "block";
        volumeStage1Container.style.display = "none";
        volumeStage2Container.style.display = "none";
    } else if (volumeLevel >= lowVolume && volumeLevel < midVolume) {
        volumeMuteContainer.style.display = "none";
        volumeStage1Container.style.display = "block";
        volumeStage2Container.style.display = "none";
    } else if (volumeLevel >= midVolume) {
        volumeMuteContainer.style.display = "none";
        volumeStage1Container.style.display = "none";
        volumeStage2Container.style.display = "block";
    }
}
