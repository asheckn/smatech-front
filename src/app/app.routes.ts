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
import {CheckOrderComponent} from './features/check-order/check-order.component';
import {PaymentsComponent} from './features/payments/payments.component';
import {ProfileDetailsComponent} from './features/profile/profile-details/profile-details.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'store', component: StoreComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'checkOrder', component: CheckOrderComponent},
  {path: 'account', component: ProfileComponent, children: [
      {path: '', component: OrdersComponent},
      {path: 'profile', component: ProfileDetailsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'payments', component: PaymentsComponent},
    ]},

  // {path: 'forgot-password', component: ForgotPasswordComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminLayoutComponent, children: [
      // {path: '', redirectTo:'/profile/detail', pathMatch:"full"},
      // {path: 'detail', component: ProfileDetailComponent},
      // {path: 'invoice', component: ProfileInvoicesComponent},
      // {path: 'statements', component: ProfileStatementsComponent},
      // {path: 'payments', component: ProfileWalletIncomingPaymentsComponent},
      // {path: 'wallet/fund', component: ProfileFundWalletComponent},
      // {path: 'statement-detail', component: ProfileStatementDetailComponent},
      // {path: 'invoice-detail', component: ProfileInvoiceDetailComponent},
      // {path: 'security', component: ProfilePasswordsComponent},
      // {path: 'pay-invoice', component: PayInvoiceComponent}
    ]},
  // {path: 'checkout', component: CheckoutComponent},
  // {path: 'product', component: ProductComponent},
  // {path: 'cart', component: CartComponent},
  // {path: 'about-us', component: AboutUsComponent},
  // {path: 'contact-us', component: ContactUsComponent},
  // { path: '**', component: PageNotFoundComponent },
];
