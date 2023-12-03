import axios, { AxiosError } from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { Cart, CartApiResponse } from "~/models/Cart";
import { CartItemDto } from "~/models/CartItem";

export function useCart() {
  return useQuery<CartApiResponse, AxiosError>("cart", async () => {
    const res = await axios.get<CartApiResponse>(
      `${API_PATHS.cart}/profile/cart`,
      {
        headers: {
          Authorization: `Basic ${localStorage.getItem("basic_token")}`,
        },
      }
    );
    return res.data;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartApiResponse>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItemDto[]) =>
    axios.put<Cart>(`${API_PATHS.cart}/profile/cart`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("basic_token")}`,
      },
    })
  );
}
