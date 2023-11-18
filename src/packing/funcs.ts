import { FullPackingList, PackingListItem } from "./types";

export function item(
  name: string,
  quantity: number = 1,
  packed: boolean = false
): PackingListItem {
  return { name, quantity, packed };
}

export function describeItem(item: PackingListItem): string {
  return `${item.quantity}x ${item.name}`;
}

export function packingListToJSON(list: FullPackingList): string {
  return JSON.stringify(list);
}

export function packingListFromJSON(json: string): FullPackingList {
  return JSON.parse(json) as FullPackingList;
}
