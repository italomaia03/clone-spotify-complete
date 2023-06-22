function setNumColumns(numColumns) {
    document.documentElement.style.setProperty(
        "--column-count",
        `${numColumns}`
    );
}
function setColumnWidth(columnWidth) {
    document.documentElement.style.setProperty(
        "--column-width",
        `${columnWidth}px`
    );
}
function setMinContWidth(containerWidth) {
    document.documentElement.style.setProperty(
        "--min-container-width",
        `${containerWidth}px`
    );
}
function setGap(numColumns) {
    document.documentElement.style.setProperty(
        "--min-container-width",
        `${numColumns < 4 ? 18 : 24}px`
    );
}

function handleGridElements() {
    const container = document.querySelector(".albums");
    let heightListener = container.offsetHeight;
    let numColumns = Number(
        getComputedStyle(document.documentElement).getPropertyValue(
            "--column-count"
        )
    );

    if (heightListener <= 247) {
        setNumColumns(--numColumns);
        setGap(numColumns);
        setColumnWidth(220);
        setMinContWidth(460);
    } else if (heightListener >= 311) {
        setColumnWidth(157);
        setMinContWidth(340);
        setNumColumns(++numColumns);
        setGap(numColumns);
    }
}

// Add event listener for window resize
window.addEventListener("resize", handleGridElements);
