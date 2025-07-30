import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(calendar);
dayjs.extend(advancedFormat);

export const formatMessageDay = (timestamp) => {
  return dayjs(timestamp).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "dddd, MMMM D",
    sameElse: "dddd, MMMM D",
  });
};
