import React from "react";

type UnixTimeDisplayProps = {
  unix: number; // Can be in seconds or milliseconds
  isMilliseconds?: boolean; // default: false (assumes seconds)
  locale?: string; // optional, default: "en-US"
  options?: any;
};

const UnixTimeDisplay: React.FC<UnixTimeDisplayProps> = ({
  unix,
  isMilliseconds = false,
  locale = "en-US",
  options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
}) => {
  const timestamp = isMilliseconds ? unix : unix * 1000;
  const date = new Date(timestamp);
  const formatted = date.toLocaleString(locale, options);

  return <span>{formatted}</span>;
};

export default UnixTimeDisplay;
