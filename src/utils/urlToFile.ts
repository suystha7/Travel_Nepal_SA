export const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

export const getFileExtension = (url: string): string => {
  const pathname = new URL(url).pathname; // "/media/productimages/delux.jpg"
  const parts = pathname.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};
