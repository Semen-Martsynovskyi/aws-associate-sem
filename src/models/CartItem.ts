import { Product } from "~/models/Product";

export type CartItem = {
  product: Product;
  count: number;
};

export type CartItemDto = {
  product_id: string;
  count: number;
};
