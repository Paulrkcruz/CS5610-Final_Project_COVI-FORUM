import * as moment from "moment";

const Color = require("color");
export const convertDate = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};
export const convertDateToFromNow = (date) => {
  return moment(date).fromNow();
};

export const getRandomBackgroundColor = (str) => {
  let saturation = 0;
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const _charCode = str.charCodeAt(i);
    saturation = (saturation + _charCode) % 100;
    hash = _charCode + ((hash << 5) - hash);
  }

  const light = (saturation * saturation) % 100;
  const hue = hash % 360;
  const color = Color("hsl(" + hue + ", " + saturation + "%, " + light + "%)");

  return {
    backgroundColor: color.rgb(),
    color: color.isDark() ? "white" : "black",
  };
};
