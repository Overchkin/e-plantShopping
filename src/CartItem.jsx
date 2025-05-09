import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);  // Accéder aux items du panier
  const totalPrice = useSelector(state => state.cart.totalPrice);  // Accéder au prix total
  const dispatch = useDispatch();

  // Formatage du prix total pour l'affichage
  const formattedTotalPrice = totalPrice.toFixed(2);  // Formater en deux décimales

  // Fonction pour continuer les achats
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Fonction pour ajouter un article au panier
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  // Fonction pour augmenter la quantité d'un article
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Fonction pour diminuer la quantité d'un article
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Si la quantité est 1, on supprime l'article
    }
  };

  // Fonction pour supprimer un article du panier
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculer le sous-total pour chaque article
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')); // Extraire la valeur numérique du coût
    return (cost * item.quantity).toFixed(2); // Calculer et formater le sous-total
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${formattedTotalPrice}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
