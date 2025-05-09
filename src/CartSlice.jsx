import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0, // Ajouter un compteur pour le nombre total d'articles
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      // Mettre à jour le totalItems après chaque ajout
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);

      // Mettre à jour le totalItems après la suppression
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // Mettre à jour le totalItems après la mise à jour de la quantité
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

// Export des actions pour les utiliser dans ProductList.jsx et CartItem.jsx
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

//  Export du reducer par défaut pour store.js
export default CartSlice.reducer;
