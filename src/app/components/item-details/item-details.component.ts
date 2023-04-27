import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent implements OnInit {

  item?: Item;
  items?: Item[];
  isEditMode: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService) {
    this.isEditMode = false;
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getItem(id);
    }
/*     this.itemService.getItems()
      .subscribe(items => this.items = items); */
  }

  getItem(id: number): void {
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  deleteItem(item: Item): void {
    this.itemService.deleteItem(item)
      .subscribe(() => this.router.navigate(['/items']));
  }

  editItem(): void {
    this.isEditMode = true;
  }

  saveItem(item?: Item): void {
    if (item) {
      this.isEditMode = false;
      this.itemService.updateItem(item)
        .subscribe(() => {
          if (item.id !== undefined) {
            this.getItem(item.id);
          }
        });
    }
  }
  

  cancelEdit(): void {
    this.isEditMode = false;
  }
}
