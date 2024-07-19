export const extractPrefix = (filename: string): string => {
  const match = filename.match(/^([A-Za-z0-9]+)_/);
  return match ? match[1] : "";
};

export const importAll = (r: __WebpackModuleApi.RequireContext) => {
  let images: { [key: string]: string } = {};
  r.keys().forEach((item: string) => {
    images[extractPrefix(item.replace("./", ""))] = r(item);
  });
  return images;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};
