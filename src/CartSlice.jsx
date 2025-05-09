// CartSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,  // Compteur total des articles
    totalPrice: 0,  // Ajout du prix total (en nombre, non formaté)
  },
  reducers: {
    // Ajouter un article au panier
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      // Mettre à jour totalItems
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

      // Mettre à jour totalPrice (en tant que nombre)
      state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.cost.replace('$', '')) * item.quantity), 0);
    },

    // Retirer un article du panier
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);

      // Mettre à jour totalItems
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

      // Mettre à jour totalPrice
      state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.cost.replace('$', '')) * item.quantity), 0);
    },

    // Mettre à jour la quantité d'un article
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // Mettre à jour totalItems
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

      // Mettre à jour totalPrice
      state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.cost.replace('$', '')) * item.quantity), 0);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
