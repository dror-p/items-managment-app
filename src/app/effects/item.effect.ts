import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import {
  createItem,
  createItemFailure,
  createItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
} from '../actions/item.actions';
import { Item } from '../models/item.model';
import { Action } from '@ngrx/store';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private itemService: ItemService) {}

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items) => loadItemsSuccess({ items })),
          catchError((error) => of(loadItemsFailure({ error })))
        )
      )
    )
  );

/* createItemEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(createItem),
    switchMap(({ item }) =>
      this.itemService.createItem(item).pipe(
        map((createdItem: Item) => createItemSuccess({ item: createdItem })),
        catchError((error: HttpErrorResponse) => of(createItemFailure({ error: error.message })))
      )
    )
  )
); */

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItem),
      mergeMap(({ item }) =>
        this.itemService.updateItem(item).pipe(
          map((item) => updateItemSuccess({ item })),
          catchError((error) => of(updateItemFailure({ error })))
        )
      )
    )
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItem),
      mergeMap(({ item }) =>
        this.itemService.deleteItem(item).pipe(
          map(() => deleteItemSuccess({ item })),
          catchError((error) => of(deleteItemFailure({ error })))
        )
      )
    )
  );
}
