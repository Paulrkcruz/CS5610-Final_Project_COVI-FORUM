//SOURCE: https://www.code-sample.com/2019/11/react-create-use-helper-functions.html

// Helper scripts
import * as moment from "moment";
var Color = require("color");
// Get the random background color
export const getRandomBackgroundColor = (str) => {
  var saturation = 0;
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    const _charCode = str.charCodeAt(i);
    saturation = (saturation + _charCode) % 100;
    hash = _charCode + ((hash << 5) - hash);
  }
// Adjust colors
  var light = (saturation * saturation) % 100;
  var hue = hash % 360;
  const color = Color("hsl(" + hue + ", " + saturation + "%, " + light + "%)");
  const style = {
    backgroundColor: color.rgb(),
    color: color.isDark() ? "white" : "black",
  };
  return style;
};
// Date conversion
export const convertDateToFromNow = (date) => {
  return moment(date).fromNow();
};
// Date conversion
export const convertDate = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};