import "google-publisher-tag";

declare module "*.css";

declare global {
  interface Window {
    googletag: googletag.Googletag;
  }
}

export {};
