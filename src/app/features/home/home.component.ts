import { Component } from '@angular/core';
import {HeroComponent} from '../../components/hero/hero.component';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';
import {ProductCardComponent} from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    CategoryCardComponent,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
})
export class HomeComponent {

}
