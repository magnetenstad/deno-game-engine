export const playSound = async (url: string) => {
  const context = new AudioContext();
  const source = context.createBufferSource();
  console.log(url);
  const audioBuffer = await fetch(url)
    .then((res) => res.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer));

  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start();
};
