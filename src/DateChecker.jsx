import { useMemo } from "preact/hooks";
import dayjs from "dayjs";

import { Koco } from "./Koco";

const month = parseInt(dayjs().format("M"), 10);
const year = parseInt(dayjs().format("YYYY"), 10);

const isAdventOrFuture = year > 2022 || (year === 2022 && month === 12);

export const DateChecker = () => {
  // Session storage var to override calendar
  const force = useMemo(() => sessionStorage.getItem("FORCE_SHOW") === "1", []);

  // Hide all if not advent/force show
  if (!force && !isAdventOrFuture) return <></>;

  return <Koco forceShow={force} />;
};
