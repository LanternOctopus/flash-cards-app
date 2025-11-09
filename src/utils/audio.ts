export const playSound = (fileName: string) => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/audio/${fileName}`);
    audio.play();
  };
