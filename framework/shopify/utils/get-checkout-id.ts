import { _SHOPIFY_CHECKOUT_ID_COOKIE } from "@framework/const";
import Cookies from "js-cookie";

const getCheckoutId = () => Cookies.get(_SHOPIFY_CHECKOUT_ID_COOKIE)

export default getCheckoutId;