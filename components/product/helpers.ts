import { Product } from "@common/types/products";

type AvailableChoices = "color" | "size" | string;

export type Choices = {
  [P in AvailableChoices]: string;
};

export const getVariant = (product: Product, choices: Choices) => (
  product.variants.find(v => (
    v.options.every(o => {
      const optionName = o.displayName.toLowerCase();
      return optionName in choices && choices[optionName] === o.values[0].label
    })
  ))
)