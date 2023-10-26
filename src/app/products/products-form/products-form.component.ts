import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { ProductTypeEnum } from 'src/core/enums/product-type.enum';
import { IProduct } from 'src/core/interfaces/product.interface';
import { ProductService } from 'src/core/services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent {
  productType = Object.values(ProductTypeEnum);
  form: FormGroup;
  isNewProduct = false;

  constructor(
    public dialogRef: MatDialogRef<ProductsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
  ) {
    this.form = fb.group({
      code: new FormControl(this.data.product?.code, { validators: [Validators.required, this.checkCodeValidation()]}),
      name: new FormControl(this.data.product?.name, Validators.required),
      type: new FormControl(this.data.product?.type, Validators.required),
    });
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('40%', '40%');
  }

  checkProduct(): void {
    if(this.form.valid) {

      this.isNewProduct = false;

      if(this.data.product === undefined){
        this.data.product = {};
        this.data.product.id = Guid.create().toString();
        this.isNewProduct = true;
      }

      this.data.product.code = this.form.get('code')?.value;
      this.data.product.name = this.form.get('name')?.value;
      this.data.product.type = this.form.get('type')?.value;

      this.isNewProduct ? this.addProduct(): this.updateProduct();
    }
  }

  addProduct(): void {
    this.productService.add(this.data.product)
    .subscribe(res => {
      this.dialogRef.close();
    });
  }

  updateProduct(): void {  
    this.productService.update(this.data.product)
    .subscribe(res => {
      this.dialogRef.close();
    });
  }

  checkCodeValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.data.list.filter((product: IProduct) => product.code === control.value).length && !this.data.product) {
          return { unique: true };
      }
      return null;
    };
  }
}
