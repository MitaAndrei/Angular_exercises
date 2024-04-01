import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService} from '../services/products-service.service';
import { Product } from '../models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'Angular_exercises';
  products : Product[] = [];
  emptyProduct : Product = {id:undefined, name : '', description:'', ratings : [], createdOn : new Date};
  product : Product = {...this.emptyProduct};
  showProductForm : boolean = false;
  showEditForm : boolean = false;
  beingEdited : Product = {...this.emptyProduct};
  input : string = '';
  searchInput : Subject<string> = new Subject<string>;
  ratingsInput : string = '';
  constructor(private productService : ProductsService) { }
  ngOnInit(): void {
    this.getAllProducts();
    this.SearchProduct();
  }

  getAllProducts(){
    this.productService.GetAllProducts().subscribe(products => {
      console.log(products)
      this.products = products;
    });
    console.log(this.products)
  }

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
    this.showEditForm = false;
    this.ratingsInput = '';
    }

    toggleEditForm(product : Product) {
      this.showEditForm = !this.showEditForm;
      this.beingEdited = {...product};
      this.showProductForm = false;
      this.ratingsInput = product.ratings.toString();
      }

    createProduct(){
      let ratings : number[] = [];
      this.ratingsInput.trim().split(',').forEach(i => ratings.push(+i))
      this.product.ratings = ratings;
      this.productService.CreateProduct(this.product).subscribe(products => {
        this.getAllProducts();
        this.product = {...this.emptyProduct}
      });
      this.showProductForm = false;
    }

    DeleteProduct(id?: string) {
      this.productService.DeleteProduct(id).subscribe(() => this.getAllProducts())
    }

    UpdateProduct(p : Product){
      let ratings : number[] = [];
      this.ratingsInput.trim().split(',').forEach(i => ratings.push(+i))
      this.beingEdited.ratings = ratings;
      this.productService.UpdateProduct(p).subscribe( () => {
      this.getAllProducts();
      this.beingEdited = {...this.emptyProduct}}
      )
      this.showEditForm = false;
    }
  
    SearchProduct() {
      this.productService.searchInput(this.searchInput).subscribe(products => this.products = products)
    }

    GetMostRecentProduct(){
      this.productService.GetMostRecentProduct().subscribe(product => this.products = [product]);
    }

    SortByRatingAsc(){
      this.productService.SortByRatingAsc().subscribe(products => this.products = products);
    }

    SortByRatingDesc(){
      this.productService.SortByRatingDesc().subscribe(products => this.products = products);
    }


}
