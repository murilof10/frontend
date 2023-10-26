import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from 'src/core/services/product.service';
import { IProduct } from 'src/core/interfaces/product.interface';
import { ProductTypeEnum } from 'src/core/enums/product-type.enum';
import { SharedModule } from 'src/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let mockProductService = {
    getAll() : Observable<any> {
      return of(mockHttp);
    },

    delete() : Observable<any> {
      return of();
    }
  }

  const mockHttp: IProduct[] = [
    {
      "id": "331c7c94-a85a-4d00-b295-f27cc3718867",
      "code": "V1",
      "name": "Produto varejo 1",
      "type": ProductTypeEnum.VAREJO
    },
    {
      "id": "39af2d32-5618-451a-8b16-8d18fa8630f6",
      "code": "V2",
      "name": "Produto varejo 2",
      "type": ProductTypeEnum.VAREJO
    },
    {
      "id": "62543e4e-dbf7-4150-931d-75bb581c1e07",
      "code": "A1",
      "name": "Produto atacado 1",
      "type": ProductTypeEnum.ATACADO
    },
    {
      "id": "896c3f31-5e97-4f33-a3e4-f630c9f8338b",
      "code": "A2",
      "name": "Produto atacado 2",
      "type": ProductTypeEnum.ATACADO
    },
    {
      "id": "994dab60-e91f-40ec-ad5b-1dfc74dd4b21",
      "code": "I1",
      "name": "Produto internacional 1",
      "type": ProductTypeEnum.INTERNACIONAL
    },
    {
      "id": "42023bbd-52d8-4dda-b810-abb89b5eca13",
      "code": "I2",
      "name": "Produto internacional 2",
      "type": ProductTypeEnum.INTERNACIONAL
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: ProductService, useValue: mockProductService },
      ],
      declarations: [ ProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of products', () => {
    component.findProducts();
    expect(component.productList).toBe(mockHttp);
  });

  it('should call deleteProduct', () => {
    spyOn(mockProductService, "delete").and.returnValue(of());
    component.deleteProduct(mockHttp[0]);
    expect(mockProductService.delete).toHaveBeenCalled();
  });
});
