class FrameCalculation {
  /**
   *
   * @param {Image} image
   * @param {ImageData} imageData
   */
  constructor() {
    this.imageDataHigh = this.getImageData("video-high-quality");
    this.imageDataLow = this.getImageData("video-low-quality");
  }
  /**
   * Maximum Error
   */
  MAX() {
    let maxError = document.querySelector(".max-value");
    let maxSum = 0;
    for (let i = 0; i < this.imageDataHigh.data.length; i += 4) {
      const highPx = this.imageDataHigh.data[i];
      const lowPx = this.imageDataLow.data[i];
      let errorVal = Math.abs(highPx - lowPx);
      maxSum = maxSum < errorVal ? errorVal : maxSum;
    }
    maxError.innerHTML = "Maximum Error: " + maxSum;
  }

  /**
   * Sum of Absolute Differences
   */
  SAD() {
    let sumDiff = document.querySelector(".sum-differences");
    let sum = 0;
    for (let i = 0; i < this.imageDataHigh.data.length; i += 4) {
      const highPx = this.imageDataHigh.data[i];
      const lowPx = this.imageDataLow.data[i];
      sum += Math.abs(highPx - lowPx);
    }
    sumDiff.innerHTML = "Sum of Absolute Differences: " + sum;
    return sum;
  }

  /**
   * Absolute Difference
   */
  MAD(sad) {
    let sadElem = document.querySelector(".mean-absolute-differences");
    let sum = 0;
    sum = (1 / this.imageDataHigh.data.length) * sad;

    sadElem.innerHTML = "Mean Absolute Differences: " + sum;
    return sum;
  }
  /**
   * Mean Squared Error
   */
  MSE() {
    let mseElem = document.querySelector(".mean-squared-error");
    let sum = 0;
    for (let i = 0; i < this.imageDataHigh.data.length; i += 4) {
      const lowPx = this.imageDataHigh.data[i];
      const highPx = this.imageDataLow.data[i];
      sum += Math.pow(lowPx - highPx, 2);
    }
    sum = (1 / this.imageDataHigh.data.length) * sum;
    mseElem.innerHTML = "Mean Squared Error: " + sum;
    return sum;
  }
  /**
   * Peak-Signal-to-Noise-Ratio
   */
  PSNR(mse) {
    let psnrElem = document.querySelector(".peak-signal-to-noise-ratio");
    let rValue = Math.pow(255, 2);
    console.log(Math.log10(rValue / mse));

    let sum = 10 * Math.log10(rValue / mse);

    psnrElem.innerHTML = "Peak-Signal-to-Noise-Ratio: " + sum + " DB";
  }
  /**
   *
   * @returns ImageData Object
   */
  getImageData(id) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var image = document.getElementById(id);
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }
}

export default FrameCalculation;
