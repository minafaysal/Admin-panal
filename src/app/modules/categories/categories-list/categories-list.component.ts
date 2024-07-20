import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/common-base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/api-service/category.service';
import { Category } from '../../../core/models/category.model';
import { takeUntil } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [MatChipsModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent extends BaseComponent implements OnInit {
  categoriesList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.spinner.show();
    this.loadCategories();
  }
  private loadCategories() {
    // Subscribe to categories$ to get the current list of products
    this.categoryService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categoriesList = categories;
      });

    // Check if categories are already loaded, if not, fetch from server
    if (this.categoryService.getCurrentCategories().length === 0) {
      this.categoryService.fetchCategories().subscribe();
    }
    this.spinner.hide();
  }

  addNewCategory(): void {}

  removeCategory(category: Category): void {
    this.categoryService.deleteCategory(category);
  }
}
