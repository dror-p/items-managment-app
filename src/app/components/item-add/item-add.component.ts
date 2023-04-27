import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.less']
})
export class ItemAddComponent implements OnInit {
  itemForm: FormGroup;
  name: string = '';
  description: string = '';
  createdBy: string = '';
  createdAt: Date = new Date();
  showColorPicker: boolean = true;
  public color: ThemePalette = 'primary';
  
  @ViewChild('picker', { static: true }) picker!: ElementRef<HTMLElement>;

  constructor(private formBuilder: FormBuilder, private itemService: ItemService, private router: Router) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      color: ['#000000'],
      createdBy: ['', Validators.required],
      createdAt: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveItem(): void {
    const item: Item = {
      id: 0,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      color: this.itemForm.value.color,
      createdAt: this.itemForm.value.createdAt,
      updatedAt: new Date(),
      createdBy: this.itemForm.value.createdBy,
      updatedBy: ''
    };
    this.itemService.createItem(item)
      .subscribe(() => this.router.navigate(['/items']));
  }

  cancel(): void {
    this.router.navigate(['/items']);
  }
}
