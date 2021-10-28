/* eslint-disable react-hooks/rules-of-hooks */
import useCart, { UseCart } from "@common/cart/use-cart"
import { Cart } from "@common/types/cart";
import { SWRHook } from "@common/types/hooks";
import { Checkout } from "@framework/schema";
import { checkoutToCart, createCheckout, getCheckoutQuery } from "@framework/utils";
import { useMemo } from "react";

export default useCart as UseCart<typeof handler>;

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string

  }
  fetcherOutput: {
    node: Checkout
  }
  data: Cart
}

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery
  },
  async fetcher({ fetch, options, input: { checkoutId } }) {
    let checkout: Checkout
    if (checkoutId) {

      const { data } = await fetch({
        ...options, variables: {
          checkoutId
        }
      })
      console.log(data);

      checkout = data.node
    } else {
      checkout = await createCheckout(fetch as any);
    }

    const cart = checkoutToCart(checkout);
    return cart
  },
  useHook: ({ useData }) => () => {
    const response = useData({
      swrOptions: {
        revalidateOnFocus: false
      }
    })

    return useMemo(() => {
      return {
        ...response,
        isEmpty: (response?.data?.lineItems.length ?? 0) <= 0
      }
    }, [response])
  }
}