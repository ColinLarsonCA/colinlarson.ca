export interface FullPackingList {
  sections: PackingListSection[];
}

export interface PackingListSection {
  name: string;
  items: PackingListItem[];
}

export interface PackingListItem {
  name: string;
  quantity: number;
  packed: boolean;
}
