import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatTimeAgo = (timestamp) => {
  console.log("🟡 [formatTimeAgo] Raw timestamp:", timestamp);

  if (!timestamp) return "Unknown";

  const now = dayjs();
  const time = dayjs(timestamp);
  const diffInSeconds = now.diff(time, "second");

  console.log("🔵 [formatTimeAgo] Time difference in seconds:", diffInSeconds);

  if (diffInSeconds < 10) {
    console.log("🔴 [formatTimeAgo] Too recent — likely fake/unused");
    return "Unknown";
  }

  const formatted = time.fromNow();
  console.log("🟢 [formatTimeAgo] Final formatted output:", formatted);
  return formatted;
};
