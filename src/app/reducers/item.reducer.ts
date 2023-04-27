import { createReducer, on } from '@ngrx/store';
import { Item } from '../models/item.model';
import { loadItems, loadItemsSuccess, loadItemsFailure, createItem, createItemSuccess, createItemFailure, updateItem, updateItemSuccess, updateItemFailure, deleteItem, deleteItemSuccess, deleteItemFailure } from '../actions/item.actions';

export interface ItemState {
  items: Item[];
}

export const initialState: ItemState = {
  items: [],
};

export const itemReducer = createReducer(
    initialState,
    on(loadItems, state => state),
    on(loadItemsSuccess, (state, { items }) => ({ ...state, items })),
    on(createItem, state => state),
    on(createItemSuccess, (state, { items }) => ({ ...state, items: [...state.items, ...items] })),
    on(updateItem, state => state),
    on(updateItemSuccess, (state, { item }) => ({
      ...state,
      items: state.items.map(i => i.id === item.id ? item : i)
    })),
    on(deleteItem, state => state),
    on(deleteItemSuccess, (state, { item }) => ({
      ...state,
      items: state.items.filter(i => i.id !== item.id)
    })),
);
