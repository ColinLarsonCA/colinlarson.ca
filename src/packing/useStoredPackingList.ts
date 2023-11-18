import { useLocalStorage } from "hooks/useLocalStorage";
import { packingListFromJSON, packingListToJSON } from "./funcs";
import { standardList } from "./lists";
import { FullPackingList } from "./types";

export function useStoredPackingList() {
  const [packingList, setPackingList] = useLocalStorage(
    "packing_list",
    packingListToJSON(standardList)
  );
  return {
    packingList: packingListFromJSON(packingList),
    setPackingList: (packingList: FullPackingList) =>
      setPackingList(packingListToJSON(packingList)),
  };
}
