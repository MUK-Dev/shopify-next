import { SelectedOption } from './../schema.d';
import { Product as ShopifyProduct, ImageEdge, MoneyV2, ProductOption, ProductVariantConnection, Checkout, CheckoutLineItemEdge } from "../schema"
import { Product } from "@common/types/products"
import { Cart, LineItem } from "@common/types/cart";

const normalizeProductImages = ({ edges }: { edges: Array<ImageEdge> }) => (
  edges.map(({ node: { originalSrc: url, ...rest } }) => (
    {
      url: `/images/${url}`,
      ...rest

    }
  ))
)

const normalizeProductPrice = ({ currencyCode, amount }: MoneyV2) => ({
  value: +amount,
  currencyCode
})

const normalizeProductOption = ({ id, name: displayName, values }: ProductOption) => ({
  id,
  displayName,
  values: values.map(v => {
    let output: any = { label: v };

    if (displayName.match(/colou?r/gi)) {
      output = {
        ...output,
        hexColor: v
      }
    }

    return output;
  })
});

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }) => normalizeProductOption({
        id,
        name,
        values: [value]
      }))
    }

  })
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options ?
      options.filter(o => o.name !== "Title").map(normalizeProductOption) : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest
  };

  return product;
}

const normalizeLineItem = ({
  node: { id, title, variant, ...rest }
}: CheckoutLineItemEdge): LineItem => {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    path: variant?.product?.handle ?? "",
    discounts: [],
    options: variant?.selectedOptions.map(({ name, value }) => normalizeProductOption({
      id,
      name,
      values: [value]
    })),
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? "",
      name: variant?.title,
      requiresShipping: variant.requiresShipping ?? false,
      price: variant?.priceV2.amount,
      listPrice: variant?.compareAtPriceV2.amount,
      image: {
        url: process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local" ?
          `/images/${variant?.image?.originalSrc}` :
          variant?.image?.originalSrc ??
          "/product-image-placeholder.svg"
      }
    },
    ...rest
  }
}

export const normalizeCart = (checkout: Checkout): Cart => {
  return {
    id: checkout.id,
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2.currencyCode
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
    totalPrice: checkout.totalPriceV2.amount,
    lineItems: checkout.lineItems.edges.map(normalizeLineItem),
    discounts: []
  }
}