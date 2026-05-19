const sizeOutput = document.getElementById("size");
const boxList = document.getElementById("boxList");

// FIND BOX
document.getElementById("find").addEventListener("click", () => {
    const l = parseFloat(document.getElementById("length").value);
    const w = parseFloat(document.getElementById("width").value);
    const h = parseFloat(document.getElementById("height").value);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;

    const bestBox = findBestBox({ l, w, h }, boxes);

    sizeOutput.textContent =
        bestBox ? `${bestBox.l} x ${bestBox.w} x ${bestBox.h}` : "No fit";
});

// ADD BOX
document.getElementById("addBox").addEventListener("click", () => {
    const l = parseFloat(document.getElementById("newL").value);
    const w = parseFloat(document.getElementById("newW").value);
    const h = parseFloat(document.getElementById("newH").value);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;
    if (l <= 0 || w <= 0 || h <= 0) return;

    boxes.push({ l, w, h });

    chrome.storage.local.set({ boxes });

    boxes.sort((a, b) => (a.l * a.w * a.h) - (b.l * b.w * b.h));

    renderBoxes();

    document.getElementById("newL").value = "";
    document.getElementById("newW").value = "";
    document.getElementById("newH").value = "";

    document.getElementById("newL").focus();
});

// RENDER
function renderBoxes() {
    boxList.innerHTML = "";

    boxes.forEach((box, index) => {
        const row = document.createElement("div");
        row.textContent = `${box.l} x ${box.w} x ${box.h}`;

        const del = document.createElement("button");
        del.textContent = "X";

        del.addEventListener("click", () => {
            boxes.splice(index, 1);

            chrome.storage.local.set({ boxes });

            renderBoxes();
        });

        row.appendChild(del);
        boxList.appendChild(row);
    });
}

const mainView = document.getElementById("mainView");
const settingsView = document.getElementById("settingsView");

document.getElementById("goSettings").addEventListener("click", () => {
    mainView.style.display = "none";
    settingsView.style.display = "block";

    document.getElementById("goSettings").style.display = "none";
    document.getElementById("goMain").style.display = "inline";
});

document.getElementById("goMain").addEventListener("click", () => {
    mainView.style.display = "block";
    settingsView.style.display = "none";

    document.getElementById("goSettings").style.display = "inline";
    document.getElementById("goMain").style.display = "none";
});

document.getElementById("padding").addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);

    if (isNaN(val) || val < 0) return;

    padding = val;
    chrome.storage.local.set({ padding });
});

function submitOnEnter(inputIds, buttonId) {
    inputIds.forEach(id => {
        document.getElementById(id).addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById(buttonId).click();
            }
        });
    });
}

submitOnEnter(["length", "width", "height"], "find");
submitOnEnter(["newL", "newW", "newH"], "addBox");