import { useState } from "react";

export function useIsLiveOnTwitch() {
  const [live] = useState(true);
  return live;
}
