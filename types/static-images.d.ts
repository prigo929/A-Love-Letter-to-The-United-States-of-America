declare module "*.JPG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.JPEG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.PNG" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}
