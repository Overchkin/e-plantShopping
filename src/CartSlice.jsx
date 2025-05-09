import { createSlice } from '@reduxjs/toolkit';

// Fonction pour mettre à jour les totaux
const updateTotals = (state) => {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalPrice = state.items.reduce((total, item) => {
    // Convertir le prix en nombre sans le '$'
    const cost = parseFloat(item.cost.replace('$', ''));
    return total + (cost * item.quantity);
  }, 0);
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
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

      updateTotals(state);  // Mettre à jour les totaux
    },

    // Retirer un article du panier
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter(item => item.name !== itemName);

      updateTotals(state);  // Mettre à jour les totaux
    },

    // Mettre à jour la quantité d'un article
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      updateTotals(state);  // Mettre à jour les totaux
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
