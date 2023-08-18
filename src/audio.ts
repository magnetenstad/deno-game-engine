export class AudioStore {
  audioBuffers = new Map<string, AudioBuffer>();
  __context: AudioContext | undefined;

  getContext() {
    if (!this.__context) this.__context = new AudioContext();
    return this.__context;
  }

  async prefetch(url: string) {
    const audioBufferPrev = this.audioBuffers.get(url);
    if (audioBufferPrev) return audioBufferPrev;
    const audioBuffer = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => this.getContext().decodeAudioData(arrayBuffer));
    this.audioBuffers.set(url, audioBuffer);
    return audioBuffer;
  }

  async playAudioUrl(url: string) {
    const audioBuffer =
      this.audioBuffers.get(url) ?? (await this.prefetch(url));
    this.playAudioBuffer(audioBuffer);
  }

  async playAudioBuffer(audioBuffer: AudioBuffer) {
    const context = this.getContext();
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();
  }
}
