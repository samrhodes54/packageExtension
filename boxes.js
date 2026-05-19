const PADDING = 0.0 // inches
let boxes = [];

chrome.storage.local.get(["boxes"], (res) => {
    boxes = res.boxes || [
        { l: 14, w: 8, h: 8 },
        { l: 13, w: 13, h: 10 },
        { l: 12, w: 12, h: 12 },
        { l: 14, w: 12, h: 8 },
        { l: 16, w: 12, h: 12 },
        { l: 16, w: 12, h: 6 },
        { l: 16, w: 10, h: 8 },
        { l: 20, w: 5, h: 5 },
        { l: 9, w: 5, h: 4 },
        { l: 11, w: 11, h: 7 },
        { l: 11, w: 11, h: 5 },
        { l: 12, w: 10, h: 8 },
        { l: 12, w: 6, h: 6 },
        { l: 12, w: 10, h: 3 },
        { l: 14, w: 10, h: 10 },
        { l: 14, w: 12, h: 6 },
        { l: 16, w: 8, h: 6 },
        { l: 22, w: 12, h: 10 },
        { l: 28, w: 6, h: 6 },
        { l: 18, w: 6, h: 6 },
        { l: 24, w: 12, h: 6 },
        { l: 24, w: 24, h: 12 },
        { l: 24, w: 12, h: 12 },
        { l: 20, w: 16, h: 14 }
    ];

    boxes.sort((a, b) => (a.l * a.w * a.h) - (b.l * b.w * b.h));
    renderBoxes();
});

function findBestBox(item, boxes) {
    const itemDims = [
        item.l + PADDING,
        item.w + PADDING,
        item.h + PADDING
    ].sort((a, b) => a - b);

    return boxes
        .filter(box => {
            const boxDims = [box.l, box.w, box.h].sort((a, b) => a - b);
            return (
                itemDims[0] <= boxDims[0] &&
                itemDims[1] <= boxDims[1] &&
                itemDims[2] <= boxDims[2]
            );
        })
        .sort((a, b) => (a.l * a.w * a.h) - (b.l * b.w * b.h))[0];
}