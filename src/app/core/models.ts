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
