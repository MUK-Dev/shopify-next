import { checkoutDetailFragment } from "../common";

const checkoutLineItemsAddMutation = `
  mutation(
    $checkoutId: ID!,
    $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        ${checkoutDetailFragment}
      }
    }
  }
`

export default checkoutLineItemsAddMutation;