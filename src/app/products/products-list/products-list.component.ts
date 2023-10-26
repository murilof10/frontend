import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductTypeEnum } from 'src/core/enums/product-type.enum';
import { IProduct } from 'src/core/interfaces/product.interface';
import { ProductService } from 'src/core/services/product.service';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { ConfirmationComponent } from 'src/shared/components/confirmation/confirmation.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  productList: IProduct[] = [];
  filteredProductList: IProduct[] = [];

  productTypes = Object.values(ProductTypeEnum);

  dataSource = new MatTableDataSource<IProduct>(this.filteredProductList);
  displayedColumns: string[] = ['codigo', 'nome', 'categoria', 'editar', 'deletar'];

  form: FormGroup;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private fb: FormBuilder,
    ) {
      this.form = fb.group({
        productCode: new FormControl(''),
        productType: new FormControl(''),
      });
    }

  ngOnInit(): void {
    this.findProducts();
  }

  public findProducts(): void {
    this.productService.getAll()
    .subscribe(res => {
        this.productList = res;
        this.filteredProductList = this.productList;
        this.dataSource = new MatTableDataSource<IProduct>(this.filteredProductList);
    });
  }

  public openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ProductsFormComponent, { data: {product: product, list: this.productList }});

    dialogRef.afterClosed().subscribe(result => {
      this.findProducts();
    });
  }

  public openConfirmationDialog(product: IProduct): void {
    const dialogRef = this.dialog.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteProduct(product);
      }
    });
  }

  public deleteProduct(product: IProduct): void {
    this.productService.delete(product)
    .subscribe(res => {
      this.findProducts();
    });
  }

  filterList(): void {
    this.filteredProductList = this.productList;

    if(this.form.get('productType')?.value) {
      this.filteredProductList = this.productList.filter(item => item.type === this.form.get('productType')?.value);
    }

    if(this.form.get('productCode')?.value) {
      this.filteredProductList = this.productList.filter(item => item.code === this.form.get('productCode')?.value);
    }

    this.dataSource = new MatTableDataSource<IProduct>(this.filteredProductList);
  }
}
