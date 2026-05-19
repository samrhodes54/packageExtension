const boxes = [
  { l: 14, w: 8, h: 8 },
  { l: 13, w: 13, h: 10 },
  { l: 12, w: 12, h: 12 }
];

function findBestBox(item, boxes) {
  const itemDims = [item.l, item.w, item.h].sort((a, b) => a - b);

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