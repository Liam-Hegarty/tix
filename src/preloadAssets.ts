const assetsToPreload = [
  "audio/4-4.mp3",
  "audio/alarm.mp3",
  "audio/crash.mp3",
  "audio/cool.mp3",
  "audio/tick.mp3",
  "audio/tock.mp3",
  "screens/cool.png",
  "sprite/tix.png",
  "sprite/mini/swirl.png",
  "sprite/mini/exclamation.png",
  "sprite/drone-2.png",
  "sprite/robot-smile.png",
  "sprite/drone-1.png",
  "sprite/big-gear.png",
  "sprite/robot.png",
  "sprite/longarms.png",
  "sprite/shortarms.png",
  "texture/stripes.png",
  "texture/floor.png",
];

async function preload(files: string[]) {
  return files.forEach((f) => {
    if (f.endsWith(".png")) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = img.onabort = () => reject(f);
        img.src = `${process.env.PUBLIC_URL}/${f}`;
      });
    }
    if (f.endsWith(".mp3")) {
      return new Promise((resolve, reject) => {
        var audio = new Audio();
        audio.onload = () => resolve(audio);
        audio.onerror = () => resolve(audio);
        audio.src = `${process.env.PUBLIC_URL}/${f}`;
      });
    }
  });
}

export const preloadAssets = () => {
  return preload(assetsToPreload);
};

preloadAssets();
