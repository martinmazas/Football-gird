import "google-publisher-tag";

declare module "*.css";
declare module "*.webp";

declare function require(module: string): any;

declare global {
  interface Window {
    googletag: googletag.Googletag;
  }
  const process: { env: Record<string, string | undefined> };
}

export {};
