export const getIconUrl = (imgName: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/src/assets/icons/${imgName}`;
};

export const getImgUrl = (imgName: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/src/assets/film-images/${imgName}.png`;
};
