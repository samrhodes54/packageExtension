document.getElementById("find").addEventListener("click", () => {
  const l = parseFloat(document.getElementById("length").value);
  const w = parseFloat(document.getElementById("width").value);
  const h = parseFloat(document.getElementById("height").value);

  const bestBox = findBestBox({ l, w, h }, boxes);

//   document.getElementById("result").textContent =
//     bestBox ? bestBox.name : "No box fits";
    document.getElementById("size").textContent =
    bestBox ? bestBox.l + " x " + bestBox.w + " x " + bestBox.h : "0";
});

document.getElementById("addBox").addEventListener("click", () => {
  const l = parseFloat(document.getElementById("newL").value);
  const w = parseFloat(document.getElementById("newW").value);
  const h = parseFloat(document.getElementById("newH").value);

  boxes.push({ l, w, h });

  document.getElementById("newL").value = "";
  document.getElementById("newW").value = "";
  document.getElementById("newH").value = "";

  renderBoxes();
});

function renderBoxes() {
  const container = document.getElementById("boxList");
  container.innerHTML = "";

  boxes.forEach((box, index) => {
    const div = document.createElement("div");

    const text = document.createElement("span");
    text.textContent = `${box.l} x ${box.w} x ${box.h}`;

    const del = document.createElement("button");
    del.textContent = "Delete";

    del.addEventListener("click", () => {
      boxes.splice(index, 1);
      renderBoxes();
    });

    div.appendChild(text);
    div.appendChild(del);

    container.appendChild(div);
  });
}

renderBoxes();