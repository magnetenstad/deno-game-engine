export const removeFromArray = (array: unknown[], item: unknown) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};
