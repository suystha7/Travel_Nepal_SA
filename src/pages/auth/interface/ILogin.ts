export interface ILoginData {
  statusCode: number;
  status: string;
  message: string;
  data: {
    user: User;
    refreshToken: string;
    accessToken: string;
  };
}

export interface User {
  address: string;
  avatar: string;
  created_at: string;
  email: string;
  full_name: string;
  gender: string;
  id: string;
  is_admin: boolean;
  is_delivery_agent: boolean;
  is_user: boolean;
  phone_no: string;
  qr_code: string;
}
