import { ApiFetcher } from "@common/types/api";
import { _SHOPIFY_CHECKOUT_ID_COOKIE, _SHOPIFY_CHECKOUT_URL_COOKIE, _SHOPIFY_COOKIE_EXPIRE } from "@framework/const";
import { Checkout, CheckoutCreatePayload, Maybe } from "@framework/schema";
import Cookies from "js-cookie";
import { checkoutCreateMutation } from "./mutations";

const createCheckout = async (fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>): Promise<Checkout> => {
  const { data } = await fetch({
    query: checkoutCreateMutation
  })



  const { checkout } = data.checkoutCreate;

  if (!checkout) {
    throw new Error("Checkout cannot be created")
  }

  const { id } = checkout;

  if (id) {
    const options = {
      expires: _SHOPIFY_COOKIE_EXPIRE
    }
    Cookies.set(_SHOPIFY_CHECKOUT_ID_COOKIE, id, options)
    Cookies.set(_SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout;
}

export default createCheckout;