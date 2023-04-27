import { Item } from '../models/item.model';

export interface ItemState {
  items: Item[];
  selectedItem?: Item | null;
  isLoading?: boolean;
  error?: string | null;
}
