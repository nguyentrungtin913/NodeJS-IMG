require("dotenv").config();
export function convertListImage(images: Array<any>) {
  return images.map((image) => {
    return {
      ...image._doc,
      image_path: `${process.env.RESOURCE_HOST}/images/${image["image_system_name"]}`,
    };
  });
}

export const getUrlExtension = (url: string) => {
  return url?.split(/[#?]/)?.[0]?.split(".")?.pop()?.trim();
};
