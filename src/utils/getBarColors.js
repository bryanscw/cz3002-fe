/**
 * Generate the bar colors, marking the bar of interest with a different color.
 *
 * @param histogramData Histogram data
 * @param xLabelOfInterest The the bar to be marked as a different color
 * @param defaultColor The color of the bar if the bar is not of interest
 * @param interestColor The color of the bar if the bar is of interest
 * @param xLabelOfInterest The the bar to be marked as a different color
 * @returns {[]} The color of the bars in the charts
 */
export const getBarColors = (histogramData, xLabelOfInterest, defaultColor, interestColor) => {
  let colors = [];
  for (let label of histogramData.labels) {
    // Ensure xLabelOfInterest is of type float
    let _xLabelOfInterest = parseFloat(xLabelOfInterest);

    let delimiters = label.substring(1, label.length - 1).split(',');
    let start = parseFloat(delimiters[0]);
    let end = parseFloat(delimiters[1]);

    if (_xLabelOfInterest > start && _xLabelOfInterest <= end) {
      colors.push(interestColor);
    } else {
      colors.push(defaultColor);
    }
  }
  return colors;
};