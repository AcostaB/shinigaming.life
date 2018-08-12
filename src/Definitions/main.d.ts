// TODO this is a hacky fix for the issue of importing a png file, shinigaming.png. Sources:
// https://github.com/Microsoft/TypeScript-React-Starter/issues/12
// https://github.com/Microsoft/TypeScript/issues/21344

declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
