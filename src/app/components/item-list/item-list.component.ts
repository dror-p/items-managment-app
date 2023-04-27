import { Component, ViewChild, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
//import { Store } from '@ngrx/store';
//import { loadItems } from '../../actions/item.actions';
//import { ItemState } from '../../reducers/item.reducer';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedColumns: string[] = ['color', 'name', 'description', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'actions'];
  dataSource = new MatTableDataSource<Item>();
  clickedRows = new Set<Item>();
  public isEditing: boolean = false;
  public item!: Item;
  public editedItem!: Item;
  editForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private itemService: ItemService) { } //, private store: Store<ItemState>

  ngOnInit(): void {
    this.getItems();
    //this.store.dispatch(loadItems());
  }

  getItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.filteredItems = items;
      this.dataSource.data = this.filteredItems;
    });
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item).subscribe(() => {
      this.filteredItems = this.filteredItems.filter(i => i !== item);
      this.dataSource.data = this.filteredItems;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public editItem(item: Item): void {
    this.item = item;
    this.editedItem = { ...item };
    this.isEditing = true;
  }

  submitEditForm() {
    this.itemService.updateItem(this.editedItem).subscribe(() => {
      this.filteredItems = this.filteredItems.filter(i => i !== this.editedItem);
      this.dataSource.data = this.filteredItems;
    });
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
