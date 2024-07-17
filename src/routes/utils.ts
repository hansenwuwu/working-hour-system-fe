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
