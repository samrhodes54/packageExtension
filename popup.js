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

    boxes.push({ l, w, h });

    chrome.storage.local.set({ boxes });

    renderBoxes();

    document.getElementById("newL").value = "";
    document.getElementById("newW").value = "";
    document.getElementById("newH").value = "";
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

