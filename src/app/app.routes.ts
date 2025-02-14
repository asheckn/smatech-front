import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {AdminLayoutComponent} from './features/admin/admin-layout/admin-layout.component';
import {authGuard} from './core/guards/auth.guard';
import {StoreComponent} from './features/store/store.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {LoginComponent} from './features/auth/login/login.component';
import {CartComponent} from './features/cart/cart.component';
import {CheckoutComponent} from './features/checkout/checkout.component';
import {ProfileComponent} from './features/profile/profile.component';
import {OrdersComponent} from './features/orders/orders.component';
import {OrdersComponent as AdminOrders}  from './features/admin/orders/orders.component';
import {CheckOrderComponent} from './features/check-order/check-order.component';
import {PaymentsComponent} from './features/payments/payments.component';
import {ProfileDetailsComponent} from './features/profile/profile-details/profile-details.component';
import {ProductsComponent} from './features/admin/products/products.component';
import {CategoriesComponent} from './features/admin/categories/categories.component';
import {CustomersComponent} from './features/admin/customers/customers.component';
import {CreateProductComponent} from './features/admin/products/create-product/create-product.component';
import {UsersComponent} from './features/admin/users/users.component';
import {OrderDetailComponent} from './features/admin/orders/order-detail/order-detail.component';
import {AuthAdminGuard} from './core/guards/auth-admin.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: 'store', component: StoreComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent ,canActivate:[authGuard],},
  {path: 'checkout', component: CheckoutComponent ,canActivate:[authGuard],},
  {path: 'checkOrder', component: CheckOrderComponent,canActivate:[authGuard],},
  {path: 'account',  component: ProfileComponent,canActivate:[authGuard], children: [
      {path: '', component: OrdersComponent},
      {path: 'profile', component: ProfileDetailsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'payments', component: PaymentsComponent},
    ]},
  {path: 'admin', component: AdminLayoutComponent,canActivate:[AuthAdminGuard], children: [
      {path: '', redirectTo:'/admin/orders', pathMatch:"full"},
      {path: 'orders', component: AdminOrders},
      {path: 'orders/view', component: OrderDetailComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'products/create', component: CreateProductComponent},
      {path: 'sales', component: PaymentsComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'users', component: UsersComponent},

    ]},
];
