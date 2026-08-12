// Ses işleme iş parçacığında çalışan yakalama işlemcisi.
// Web Audio render bloklarını Gemini Live ve Qwen için 100 ms'lik parçalarda
// biriktirip offscreen ana bağlamına aktarır.

const CAPTURE_BATCH_SIZE = Math.max(1, Math.round(sampleRate * 0.1));

class TabCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.batch = new Float32Array(CAPTURE_BATCH_SIZE);
    this.batchOffset = 0;
  }

  process(inputs, outputs) {
    // Bu düğümün çıkışı sessiz tutulur. Orijinal ses ayrı gain hattından çalar.
    for (const output of outputs) {
      for (const channel of output) channel.fill(0);
    }

    const input = inputs[0]?.[0];
    if (!input?.length) return true;

    let inputOffset = 0;
    while (inputOffset < input.length) {
      const copyLength = Math.min(
        input.length - inputOffset,
        CAPTURE_BATCH_SIZE - this.batchOffset
      );
      this.batch.set(
        input.subarray(inputOffset, inputOffset + copyLength),
        this.batchOffset
      );
      inputOffset += copyLength;
      this.batchOffset += copyLength;

      if (this.batchOffset === CAPTURE_BATCH_SIZE) {
        const completedBatch = this.batch;
        this.port.postMessage(completedBatch, [completedBatch.buffer]);
        this.batch = new Float32Array(CAPTURE_BATCH_SIZE);
        this.batchOffset = 0;
      }
    }

    return true;
  }
}

registerProcessor("tab-capture-processor", TabCaptureProcessor);
