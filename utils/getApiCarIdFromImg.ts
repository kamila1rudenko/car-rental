export function getApiCarIdFromImg(img: string): string | null {
  const match = img.match(/\/(\d+)-ai\.jpg$/);
  return match ? match[1] : null;
}
