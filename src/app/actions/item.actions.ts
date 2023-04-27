import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.model';

export const loadItems = createAction('[Item List] Load Items');
export const loadItemsSuccess = createAction('[Item List] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item List] Load Items Failure', props<{ error: string }>());

export const selectItem = createAction('[Item List] Select Item', props<{ item: Item }>());

export const createItem = createAction('[Add Item] Create Item', props<{ item: Item }>());
export const createItemSuccess = createAction('[Add Item] Create Item Success', props<{ items: Item[] }>());
//export const createItemSuccess = createAction('[Add Item] Create Item Success', props<{ item: Item }>());    
export const createItemFailure = createAction('[Add Item] Create Item Failure', props<{ error: string }>());

export const updateItem = createAction('[Edit Item] Update Item', props<{ item: Item }>());
export const updateItemSuccess = createAction('[Edit Item] Update Item Success', props<{ item: Item }>());
export const updateItemFailure = createAction('[Edit Item] Update Item Failure', props<{ error: string }>());

export const deleteItem = createAction('[Item Details] Delete Item', props<{ item: Item }>());
export const deleteItemSuccess = createAction('[Item Details] Delete Item Success', props<{ item: Item }>());
export const deleteItemFailure = createAction('[Item Details] Delete Item Failure', props<{ error: string }>());
