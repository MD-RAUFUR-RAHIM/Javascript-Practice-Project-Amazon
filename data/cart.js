import { products } from "./products.js";

export let cart= JSON.parse(localStorage.getItem('cart'));
export let selectedDeliveryOptions = {};

if(!cart){
  cart =[{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  }];
}


// export const cart =[{
//   productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//   quantity: 2,
// },{
//   productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//   quantity: 1,
// }];

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId){
      let matchingItem;
      cart.forEach((cartItem)=>{
        if(productId ===cartItem.productId){
            matchingItem = cartItem;
        }
      });
      if(matchingItem){
        matchingItem.quantity +=1;
      }else{
        cart.push({
          productId: productId,
          quantity: 1
        });
      } 
      saveToStorage();
  }

 export function removeFromCart (productId){
    const newCart = [];
    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    
    saveToStorage();
  }



  // export function decreaseTotalShippingCost(productId, deliveryOptionInputs) {
  //   const updatedSelectedDeliveryOptions = {};
  
  //   deliveryOptionInputs.forEach((input) => {
  //     const currentProductId = input.getAttribute('data-product-id');
  //     const selectedValue = input.value;
  //     updatedSelectedDeliveryOptions[currentProductId] = selectedValue;
  //   });
  
  //   delete updatedSelectedDeliveryOptions[productId];
  //   const newShippingCost = calculateTotalShippingCost(updatedSelectedDeliveryOptions);
  //   localStorage.setItem('selectedDeliveryOptions', JSON.stringify(selectedDeliveryOptions));
  //   const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
  //   if (paymentSummaryMoney) {
  //     paymentSummaryMoney.textContent = `$${newShippingCost.toFixed(2)}`;
  //   }
  // }
  export function decreaseTotalShippingCost(productId, deliveryOptionInputs) {
    const updatedSelectedDeliveryOptions = {};
  
    deliveryOptionInputs.forEach((input) => {
      const currentProductId = input.getAttribute('data-product-id');
      const selectedValue = input.value;
      updatedSelectedDeliveryOptions[currentProductId] = selectedValue;
    });
  
    delete updatedSelectedDeliveryOptions[productId];
    const newShippingCost = calculateTotalShippingCost(updatedSelectedDeliveryOptions);
    localStorage.setItem('selectedDeliveryOptions', JSON.stringify(updatedSelectedDeliveryOptions)); // Use updatedSelectedDeliveryOptions here
    const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
    if (paymentSummaryMoney) {
      paymentSummaryMoney.textContent = `$${newShippingCost.toFixed(2)}`;
    }
  }
  
  
  
  



export function decreaseFromQuantity(productId, cart) {
  const cartItem = cart.find((item) => item.productId === productId);
  let cartQuantity= 0;
  if (cartItem && cartItem.quantity > 0) {
    cartItem.quantity -= 1;
    cartQuantity = cartItem.quantity;

    // Update the quantity label in the HTML
    document.querySelector('.js-quantity-label').innerHTML = cartQuantity;
  }
}
export function totalQuantity()
{
  let totalQuantity= 0;
  cart.forEach((cartItem)=>{
    totalQuantity= totalQuantity + cartItem.quantity;
  });
  return totalQuantity;
}

// 
export function totalCost(cart, products) {
  let totalItemCost = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = products.find((product) => product.id === cartItem.productId);

    if (matchingProduct) {
      totalItemCost += (matchingProduct.priceCents * cartItem.quantity) / 100;
    }
  });

  totalItemCost = totalItemCost.toFixed(2);

  return totalItemCost;
}
export function calculateTotalShippingCost(deliveryOptions) {
  let totalCost = 0;

  for (const productId in deliveryOptions) {
    const selectedValue = deliveryOptions[productId];
    
    // Calculate and add the cost of the selected delivery option for each product
    if (selectedValue === "Free Shipping") {
      // You can add specific logic for each delivery option if needed
      totalCost += 0;
    } else if (selectedValue === "$4.99") {
      totalCost += 4.99;
    } else if (selectedValue === "$9.99") {
      totalCost += 9.99;
    }
  }
    totalCost.toFixed(2);
  return totalCost;
}
// export function removeShippingCost(productId){
//   const newDeliveryOptions = [];
//   deliveryOptions.forEach((deliveryItems)=>{
//     if(deliveryItems.productId !== productId){
//       newDeliveryOptions.push(deliveryItems);
//     }
//   });
//   deliveryOptions = newDeliveryOptions;
// }

