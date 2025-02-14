export interface Authority {
  authority: string;
}

export interface UserData {
  id: number;
  userCode: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  role: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  description: string | null;
  data: UserData;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  categoryCode: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  status: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
  image: string;
  description: string;
  productCode: string;
  price: number;
  vatRate: number;
  currencyCode: string;
  stock: number;
  deleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ResponseData {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ResponseData | any;
}

export interface CartItem {
  id: number;
  product: Product;
  total: number;
  quantity: number;
  vatAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingCart {
  id: number;
  cartCode: string;
  total: number;
  vatTotal: number;
  subTotal: number;
  items: CartItem[];
  customerId: number;
  deleted: boolean;
  checkedOut: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  total: number;
  quantity: number;
  vatAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  orderCode: string;
  invoiceNumber: string;
  orderTotal: number;
  vatTotal: number;
  subTotal: number;
  orderItems: OrderItem[];
  orderStatus:string;
  currencyCode: string;
  createdAt: string;
  updatedAt: string;
  reference: string;
  cart:ShoppingCart;
}

// export interface PayPalOrderRequest {
//   id: number;
//   orderId: string;
//   approveUrl: string;
//   requestAmount: number;
//   currency: string;
//   orderCode: string;
//   invoiceId: string;
//   customId: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }
//
// export interface Payment {
//   id: number;
//   paymentReference: string;
//   paymentStatus: string// Adjust based on possible statuses
//   paymentMethod: string // Extend if more methods exist
//   customerId: number;
//   orderCode: string;
//   orderInvoiceNumber: string;
//   currency: string;
//   amount: number;
//   paymentDescription: string;
//   payPalOrderId: string;
//   payPalOrderStatus: string // Adjust based on possible statuses
//   payPalOrderRequest: PayPalOrderRequest;
//   createdAt: string;
//   updatedAt: string | null;
// }

export interface PayPalOrderRequest {
  id: number;
  orderId: string;
  approveUrl: string;
  requestAmount: number;
  currency: string;
  orderCode: string;
  invoiceId: string;
  customId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: number;
  paymentReference: string;
  paymentStatus: string;
  paymentMethod: string;
  customerId: number;
  orderCode: string;
  orderInvoiceNumber: string;
  currency: string;
  amount: number;
  paymentDescription: string;
  payPalOrderId: string;
  payPalOrderStatus: string;
  payPalOrderRequest: PayPalOrderRequest;
  createdAt: string;
  updatedAt: string | null;
}







