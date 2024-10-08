import {Component, OnInit} from '@angular/core';
import {IProduct} from "./product.model";
import {CartService} from "../cart/cart.service";
import {ProductService} from "./product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any;//IProduct[];
  filter: string = '';

  constructor(
    private cartSvc: CartService,
    private productSvb: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productSvb.getProducts().subscribe(products => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product: any) => product.category === this.filter);
  }

  getDiscountedClass(product: IProduct) {
    if (product.discount > 0)
      return ['strikethrough'];
    else return [];
  }
}
