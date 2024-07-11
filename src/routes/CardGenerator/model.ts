export enum PageType {
  STARTER = "Starter",
  GENERATOR = "Generator",
}

interface QueryParams {
  [key: string]: string;
}

export const addQueryParamsToUrl = (
  url: string,
  params: QueryParams
): string => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    searchParams.append(key, params[key]);
  });

  urlObj.search = searchParams.toString();
  return urlObj.toString();
};
