
'use server';

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function convertFilesToDataUris(files: FileList): Promise<string[]> {
    const dataUris = [];
    for (const file of Array.from(files)) {
        try {
            const dataUri = await fileToDataUri(file);
            dataUris.push(dataUri);
        } catch (error) {
            console.error(`Failed to read file ${file.name}:`, error);
        }
    }
    return dataUris;
}

export async function uploadImages(files: FileList): Promise<string[]> {
  // This is a browser-only implementation, so we need to "emulate" it on the server
  // by throwing an error if it's called in a non-browser environment. In our case,
  // we will call a different function that does the real work.
  if (typeof window === 'undefined') {
    throw new Error('This function can only be called on the client.');
  }

  const fileArray = Array.from(files);

  const dataUriPromises = fileArray.map(file =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    })
  );

  try {
    const dataUris = await Promise.all(dataUriPromises);
    return dataUris;
  } catch (error) {
    console.error('Error converting files to data URIs:', error);
    throw new Error('Failed to process one or more images.');
  }
}
