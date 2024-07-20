import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/api-service/products.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../core/base/common-base';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent extends BaseComponent implements OnInit {
  productForm: FormGroup;
  private subscription: Subscription = new Subscription();
  isEditMode = false;
  required: any;
  productID!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    super();
    this.productForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      image: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productID = Number(id)
    if (this.productID) {
      this.isEditMode = true;
      this.loadProduct(this.productID);
    }
  }

  loadProduct(id: number): void {
    this.subscription.add(
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          if (product) {
            // Product fetched from the backend
            this.productForm.patchValue(product);
          } else {
            // Product is null, fallback to BehaviorSubject
            const products = this.productService
              .getCurrentProducts()
            const fallbackProduct = products.find((p) => p.id === id);
            if (fallbackProduct) {
              this.productForm.patchValue(fallbackProduct);
            } else {
              this.toastr.error('Product not found.');
            }
          }
        },
        error: (err) => {
          this.toastr.error('Failed to load product.');
        },
      })
    );
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.toastr.warning('Please fill in the required fields.');
      return;
    }
    this.spinner.show();

    const product: Product = this.productForm.value;

    if (this.isEditMode) {
      this.subscription.add(
        this.productService
          .updateProduct({ ...product, id: this.productID })
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.spinner.hide();
            this.toastr.success('Product Updated Successfully!');
            this.router.navigate(['/admin/products']);
          })
      );
    } else {
      this.subscription.add(
        this.productService
          .addProduct(product)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.spinner.hide();
            this.toastr.success('Product Added Successfully!');
            this.router.navigate(['/admin/products']);
          })
      );
    }
  }
}
