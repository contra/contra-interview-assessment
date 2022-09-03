export const random = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomColor = () => {
  const color = [
    '#f44336',
    '#f44336',
    '#3f51b5',
    '#2196f3',
    '#4caf50',
    '#673ab7',
    '#00bcd4',
  ];
  return color[random(0, 6)];
};
