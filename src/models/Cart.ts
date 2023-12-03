import { CartItem } from "./CartItem";

export type Cart = {
  cartItems: CartItem[];
};

export type CartApiResponse = {
  data: {
    cart: Cart;
  };
  statusCode: number;
  message: string;
};
