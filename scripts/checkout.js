import {cart,removeFromCart,decreaseFromQuantity,totalQuantity, totalCost,calculateTotalShippingCost,decreaseTotalShippingCost} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let cartSummaryHTML = '';
let paymentSummaryHTML = '';
let matchingProduct;
if(cart.length === 0)
{
  cartSummaryHTML = `
    <div class="cart-empty-message">
      Your cart is empty.
    </div>`;
  // You can set default values for paymentSummaryHTML as well
  paymentSummaryHTML = `
    <div class="payment-summary js-payment-summary">
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div class="js-total-quantity">Items: 0</div>
        <div class="payment-summary-money js-payment-summary-money">$0.00</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$0.00</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$0.00</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$0.00</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$0.00</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    </div>`;
}
else{
  cart.forEach((cartItem)=>{
    const productId= cartItem.productId;
    
    products.forEach((product) => {
      if(product.id === productId){
        matchingProduct = product;
      }
    });
    cartSummaryHTML += `
    <div class="cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
  
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              value="Free Shipping"
              data-product-id="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              value="$4.99"
              data-product-id="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              value="$9.99"
              data-product-id="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  paymentSummaryHTML = `<div class="payment-summary js-payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>
  
          <div class="payment-summary-row">
            <div class="js-total-quantity">Items: ${totalQuantity()}</div>
            <div class="payment-summary-money js-payment-summary-money"></div>
          </div>
  
          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-money-button">$0.00</div>
          </div>
  
          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>
  
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>
  
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>
  
          <button class="place-order-button button-primary">
            Place your order
          </button>
          </div>`;
  
  });
}


document.querySelector('.js-order-summary').innerHTML= cartSummaryHTML;
document.querySelector('.js-payment-summary').innerHTML =paymentSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeFromCart(productId);
        delete selectedDeliveryOptions[productId];
        const newShippingCost = calculateTotalShippingCost(selectedDeliveryOptions);
        const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
        if (paymentSummaryMoney) {
          paymentSummaryMoney.textContent = `$${newShippingCost.toFixed(2)}`;
        }
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) {
          container.remove();
        }
      } else {
        decreaseFromQuantity(productId, cart);
      }
      
      const totalQuantityElement = document.querySelector('.js-total-quantity');
      if (totalQuantityElement) {
        totalQuantityElement.textContent = `Items: ${totalQuantity()}`;
      }
      
      const getElement = document.querySelector('.js-payment-summary-money');
      if (getElement) {
        getElement.textContent = `Total Cost: $${totalCost(cart, products)}`;
      }
    }
  });
});



const getElement = document.querySelector('.js-payment-summary-money');
  if(getElement){
    getElement.textContent = `Total Cost: $${totalCost(cart, products)}`;
  }



const deliveryOptionInputs = document.querySelectorAll(`input[name^="delivery-option-"]`);
const selectedDeliveryOptions = {};



deliveryOptionInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const selectedValue = input.value;
    const productId = input.getAttribute('data-product-id');
    selectedDeliveryOptions[productId] = selectedValue;

    // Save the selectedDeliveryOptions in local storage
    localStorage.setItem('selectedDeliveryOptions', JSON.stringify(selectedDeliveryOptions));

    const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
    if (paymentSummaryMoney) {
      paymentSummaryMoney.textContent = `$${calculateTotalShippingCost(selectedDeliveryOptions)}`;
    }
  });
});



window.addEventListener('load', () => {
  const savedDeliveryOptions = JSON.parse(localStorage.getItem('selectedDeliveryOptions'));
  if (savedDeliveryOptions) {
    deliveryOptionInputs.forEach((input) => {
      const productId = input.getAttribute('data-product-id');
      const selectedValue = savedDeliveryOptions[productId];
      if (selectedValue === input.value) {
        input.checked = true;
      }
      selectedDeliveryOptions[productId] = selectedValue;
      localStorage.setItem('selectedDeliveryOptions', JSON.stringify(selectedDeliveryOptions));
      const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
      if (paymentSummaryMoney) {
        paymentSummaryMoney.textContent = `$${calculateTotalShippingCost(selectedDeliveryOptions)}`;
      }
    });
  }

  
  deliveryOptionInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const selectedValue = input.value;
      const productId = input.getAttribute('data-product-id');
      selectedDeliveryOptions[productId] = selectedValue;
      localStorage.setItem('selectedDeliveryOptions', JSON.stringify(selectedDeliveryOptions));
      const paymentSummaryMoney = document.querySelector('.js-payment-summary-money-button');
      if (paymentSummaryMoney) {
        paymentSummaryMoney.textContent = `$${calculateTotalShippingCost(selectedDeliveryOptions)}`;
      }
    });
  });
});
