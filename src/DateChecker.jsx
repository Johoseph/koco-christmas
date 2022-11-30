import { useMemo } from "preact/hooks";
import dayjs from "dayjs";

import { Koco } from "./Koco";

const day = parseInt(dayjs().format("D"), 10);
const month = parseInt(dayjs().format("M"), 10);
const year = parseInt(dayjs().format("YYYY"), 10);

const currentDay = year > 2022 ? 24 : Math.min(day, 25) - 1;
const maxDay = year > 2022 ? 24 : Math.min(day, 24);

const isAdventOrFuture = year > 2022 || (year === 2022 && month === 12);

export const DateChecker = (props) => {
  // Session storage var to override calendar
  const force = useMemo(() => sessionStorage.getItem("FORCE_SHOW") === "1", []);

  // Hide all if not advent/force show
  if (!force && !isAdventOrFuture) return <></>;

  return (
    <Koco
      currentDay={force ? 24 : currentDay}
      maxDay={force ? 24 : maxDay}
      {...props}
    />
  );
};
