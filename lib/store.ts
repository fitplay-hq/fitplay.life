import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export interface CartItem {
  id: number;
  productId: string; // Changed from title/brand to productId
  title: string;
  brand: string;
  credits: number;
  image: string;
  quantity: number;
}

export const cartItemsAtom = atomWithStorage<CartItem[]>('cartItems', []);

export const getCartItemQuantityAtom = atom(
  (get) => (productId: string): number => {
    const cartItems = get(cartItemsAtom);
    const item = cartItems.find(item =>
      item.productId === productId
    );
    return item ? item.quantity : 0;
  }
);

export const clearCartAtom = atom(null, (get, set) => {
  set(cartItemsAtom, []);
});

export const addToCartAtom = atom(
  null,
  (get, set, product: any) => {
    const currentItems = get(cartItemsAtom);

    // Check if product already exists in cart
    const existingItem = currentItems.find(item =>
      item.productId === product.id
    );

    const result = {
      wasUpdated: false,
      isNewItem: false,
      newQuantity: 1,
      item: null as any
    };

    if (existingItem) {
      // If exists, increment quantity
      result.wasUpdated = true;
      result.newQuantity = existingItem.quantity + 1;
      result.item = { ...existingItem, quantity: result.newQuantity };

      const updatedItems = currentItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: result.newQuantity }
          : item
      );

      set(cartItemsAtom, updatedItems);
    } else {
      // If new product, add to cart with quantity 1
      result.isNewItem = true;
      const newItem: CartItem = {
        id: Date.now() + Math.random(), // Ensure unique ID
        productId: product.id,
        title: product.name,
        brand: product.brand || 'FitPlay',
        credits: product.price * 2, // Convert price to credits (multiply by 2)
        image: product.images?.[0] || '',
        quantity: 1
      };
      result.item = newItem;

      set(cartItemsAtom, [...currentItems, newItem]);
    }

    return result;
  }
);

export const removeFromCartAtom = atom(
  null,
  (get, set, itemId: number) => {
    const currentItems = get(cartItemsAtom);
    const itemToRemove = currentItems.find(item => item.id === itemId);
    
    if (itemToRemove) {
      const updatedItems = currentItems.filter(item => item.id !== itemId);
      set(cartItemsAtom, updatedItems);
      return itemToRemove;
    }
    
    return null;
  }
);

export const updateCartQuantityAtom = atom(
  null,
  (get, set, { id, quantity }: { id: number, quantity: number }) => {
    const currentItems = get(cartItemsAtom);
    const itemExists = currentItems.find(item => item.id === id);
    
    if (!itemExists) {
      return null;
    }
    
    if (quantity <= 0) {
      const updatedItems = currentItems.filter(item => item.id !== id);
      set(cartItemsAtom, updatedItems);
      return { action: 'removed', item: itemExists };
    }
    
    // Update the quantity
    const updatedItems = currentItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    set(cartItemsAtom, updatedItems);
    
    const updatedItem = updatedItems.find(item => item.id === id);
    return { action: 'updated', item: updatedItem };
  }
);

export const updateCartQuantityByProductAtom = atom(
  null,
  (get, set, { productId, quantity }: {
    productId: string;
    quantity: number;
  }) => {
    const currentItems = get(cartItemsAtom);

    // Find the item by productId
    const existingItem = currentItems.find(item =>
      item.productId === productId
    );

    if (!existingItem) {
      return { action: 'not_found', productId } as const;
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const updatedItems = currentItems.filter(item =>
        item.productId !== productId
      );
      set(cartItemsAtom, updatedItems);
      return { action: 'removed', item: existingItem } as const;
    } else {
      // Update the quantity
      const updatedItems = currentItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
      set(cartItemsAtom, updatedItems);

      const updatedItem = { ...existingItem, quantity };
      return { action: 'updated', item: updatedItem } as const;
    }
  }
);

export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => total + item.quantity, 0);
});

export const cartAnimationAtom = atom(false);

export const userCreditsAtom = atomWithStorage<number>('userCredits', 500);

export const purchaseCreditsAtom = atom(
  null, // no read value needed
  (get, set, creditsToAdd: number) => {
    const currentCredits = get(userCreditsAtom);
    const newTotal = currentCredits + creditsToAdd;
    set(userCreditsAtom, newTotal);
    return newTotal;
  }
);
