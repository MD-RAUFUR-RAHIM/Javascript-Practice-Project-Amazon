export let cart= JSON.parse(localStorage.getItem('cart'));

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

// export function decreaseFromQuantity(){
//   // if(cart.productId == productId && cart.quantity>0){
//   //   let cartQuantity = 0;
//   //   cart.quantity-=1;
//   //   document.querySelector('.js-quantity-label')
//   //   .innerHTML = cartQuantity;
//   // }
//   let cartQuantity = 0;

//   cart.forEach((cartItem) => {
//     cartQuantity = cartItem.quantity - 1;
//   });

//   document.querySelector('.js-quantity-label')
//     .innerHTML = cartQuantity;
// }

// // Check if there's anything in local storage and parse it
// export let cart = JSON.parse(localStorage.getItem('cart')) || [];


// function saveToStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// export function addToCart(productId) {
//   let matchingItem = cart.find((cartItem) => cartItem.productId === productId);

//   if (matchingItem) {
//     matchingItem.quantity += 1;
//   } else {
//     cart.push({
//       productId: productId,
//       quantity: 1,
//     });
//   }

//   saveToStorage();
// }

// export function removeFromCart(productId) {
//   const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
//   cart = newCart;
//   saveToStorage();
// }

// export function updateCartQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//   });
//   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
// }

// export function clearCart() {
//   cart = [];
//   saveToStorage();
// }

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