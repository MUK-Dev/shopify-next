export const _API_URL =
  process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
    process.env.NEXT_PUBLIC_LOCAL_STORE_DOMAIN :
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export const _SHOPIFY_CHECKOUT_ID_COOKIE =
  process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
    "shopify_local_checkoutId" :
    "shopify_checkoutId"

export const _SHOPIFY_CHECKOUT_URL_COOKIE = "shopify_checkoutUrl";

export const _SHOPIFY_COOKIE_EXPIRE = 90