export const getFontWeightLabel = (weight: number): string => {
  const labels: { [key: number]: string } = {
    100: "Thin",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "Semi-Bold",
    700: "Bold",
    900: "Black",
  };
  return labels[weight] || weight.toString();
};
