import "google-publisher-tag";

declare module "*.css";
declare module "*.webp";

declare global {
  interface Window {
    googletag: googletag.Googletag;
  }
  const process: { env: Record<string, string | undefined> };
  function require(module: string): any;
}

export {};
