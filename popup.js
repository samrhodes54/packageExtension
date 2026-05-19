const sizeOutput = document.getElementById("size");
const boxList = document.getElementById("boxList");


function getSortedInput() {
    const l = parseFloat(document.getElementById("length").value);
    const w = parseFloat(document.getElementById("width").value);
    const h = parseFloat(document.getElementById("height").value);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return null;

    const sorted = [l, w, h].sort((a, b) => b - a); // high → low

    document.getElementById("length").value = sorted[0];
    document.getElementById("width").value = sorted[1];
    document.getElementById("height").value = sorted[2];

    return { l: sorted[0], w: sorted[1], h: sorted[2] };
}

// FIND BOX
document.getElementById("find").addEventListener("click", () => {
    const item = getSortedInput();
    if (!item) return;

    const bestBox = findBestBox(item, boxes);

    if (bestBox) {
        const extraL = (bestBox.l - item.l).toFixed(2);
        const extraW = (bestBox.w - item.w).toFixed(2);
        const extraH = (bestBox.h - item.h).toFixed(2);

        sizeOutput.textContent =
            `${bestBox.l} x ${bestBox.w} x ${bestBox.h} (extra: ${extraL} x ${extraW} x ${extraH})`;
    } else {
        sizeOutput.textContent = "No fit";
    }
});

// ADD BOX
document.getElementById("addBox").addEventListener("click", () => {
    const l = parseFloat(document.getElementById("newL").value);
    const w = parseFloat(document.getElementById("newW").value);
    const h = parseFloat(document.getElementById("newH").value);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;
    if (l <= 0 || w <= 0 || h <= 0) return;
    if (boxes.some(b => b.l === l && b.w === w && b.h === h)) return;

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

["length", "width", "height"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("find").click();
        }
    });
});

submitOnEnter(["length", "width", "height"], "find");
submitOnEnter(["newL", "newW", "newH"], "addBox");