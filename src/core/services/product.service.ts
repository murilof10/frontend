import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductService {
    private endpoint = 'http://localhost:3000/products';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
    ) { }

    getAll(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(`${this.endpoint}`).pipe(
            tap(_ => this.log('fetched products')),
            catchError(this.handleError<IProduct[]>('getListaproducts', []))
        );
    }

    add(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(`${this.endpoint}`, product, this.httpOptions)
            .pipe(
                tap((newproduct: IProduct) => this.log(`added product w/ id=${newproduct.id}`)),
                catchError(this.handleError<IProduct>(`addproduct id=${product.id}`))
            );

    }

    delete(product: IProduct | string): Observable<IProduct> {
        const id = typeof product === 'string' ? product : product.id;

        return this.http.delete<IProduct>(`${this.endpoint}/${id}`, this.httpOptions).pipe(
            tap(_ => this.log(`deleted product id=${id}`)),
            catchError(this.handleError<IProduct>('deleteproduct'))
        );
    }

    update(product: IProduct): Observable<IProduct> {
        return this.http.put<IProduct>(`${this.endpoint}/${product.id}`, product, this.httpOptions)
        .pipe(
            tap(_ => this.log(`updated product id=${product.id}`)),
            catchError(this.handleError<IProduct>('updateproduct'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
      
          this.log(`${operation} failed: ${error.message}`);
      
          return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }
  }