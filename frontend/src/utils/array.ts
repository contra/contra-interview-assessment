export const removeItemFromArray = <T>(array: T[], itemToRemove: T) => {
  return array.filter((item) => item !== itemToRemove);
};
