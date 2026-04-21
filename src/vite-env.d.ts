
/// <reference types="vite/client" />

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.pdf' {
  const value: string;
  export default value;
}