import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private dataUrl = './assets/data.json';
  private lastItemId = 0;
  private dataSubject = new BehaviorSubject<Item[]>([]);
  public data$: Observable<Item[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData().subscribe(data => {
      this.dataSubject.next(data)
      const lastItem = data[data.length - 1];
      this.lastItemId = lastItem ? lastItem.id : 0;
    });
  }

  getItems(): Observable<Item[]> {
    return this.data$;
  }

  getItem(id: number): Observable<Item | undefined> {
    return this.data$.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  createItem(item: Item): Observable<Item[]> {
    item.id = ++this.lastItemId;
    item.updatedAt = new Date();
    item.updatedBy = '';

    this.dataSubject.next([...this.dataSubject.value, item]);

    return this.data$;
  }  

  updateItem(item: Item): Observable<Item> {
    const index = this.dataSubject.value.findIndex(i => i.id === item.id);
    if (index >= 0) {
      const updatedItem = { ...item, updatedAt: new Date() };
      const updatedItems = [...this.dataSubject.value];
      updatedItems[index] = updatedItem;
      this.dataSubject.next(updatedItems);
      return of(updatedItem);
    }
    return of(item);
  }

  deleteItem(item: Item): Observable<Item> {
    const index = this.dataSubject.value.findIndex(i => i.id === item.id);
    if (index >= 0) {
      const updatedItems = [...this.dataSubject.value];
      updatedItems.splice(index, 1);
      this.dataSubject.next(updatedItems);
      return of(item);
    }
    return of(item);
  }

  private loadData(): Observable<Item[]> {
    return this.http.get<Item[]>(this.dataUrl);
  }
}
