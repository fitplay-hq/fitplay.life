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
  selectedVariants?: Record<string, string>; // Add selected variants
  variantKey?: string; // Unique key for variant combination
}

export const cartItemsAtom = atomWithStorage<CartItem[]>('cartItems', []);

export const getCartItemQuantityAtom = atom(
  (get) => (productId: string, selectedVariants?: Record<string, string>): number => {
    const cartItems = get(cartItemsAtom);

    if (selectedVariants && Object.keys(selectedVariants).length > 0) {
      // For variant products, find by variant key
      const variantKey = `${productId}-${Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('-')}`;
      const item = cartItems.find(item => item.variantKey === variantKey);
      return item ? item.quantity : 0;
    } else {
      // For non-variant products, find by productId (legacy support)
      const item = cartItems.find(item => item.productId === productId && !item.variantKey);
      return item ? item.quantity : 0;
    }
  }
);

export const clearCartAtom = atom(null, (get, set) => {
  set(cartItemsAtom, []);
});

export const addToCartAtom = atom(
  null,
  (get, set, { product, selectedVariants }: { product: any; selectedVariants?: Record<string, string> }) => {
    const currentItems = get(cartItemsAtom);

    // Create a unique key for this variant combination
    const variantKey = selectedVariants && Object.keys(selectedVariants).length > 0
      ? `${product.id}-${Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('-')}`
      : product.id;

    // Check if this exact variant combination already exists in cart
    const existingItem = currentItems.find(item =>
      item.variantKey === variantKey
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
        item.variantKey === variantKey
          ? { ...item, quantity: result.newQuantity }
          : item
      );

      set(cartItemsAtom, updatedItems);
    } else {
      // If new variant combination, add to cart with quantity 1
      result.isNewItem = true;
      const newItem: CartItem = {
        id: Date.now() + Math.random(), // Ensure unique ID
        productId: product.id,
        title: product.name,
        brand: product.brand || 'FitPlay',
        credits: (selectedVariants && product.variants?.length)
          ? getSelectedVariantPrice(product, selectedVariants) * 2
          : (product.price || product.variants?.[0]?.mrp || 0) * 2,
        image: product.images?.[0] || '',
        quantity: 1,
        selectedVariants,
        variantKey
      };
      result.item = newItem;

      set(cartItemsAtom, [...currentItems, newItem]);
    }

    return result;
  }
);

// Helper function to get selected variant price
function getSelectedVariantPrice(product: any, selectedVariants: Record<string, string>) {
  if (!product.variants?.length) return product.price || 0;

  // Group variants by category
  const groupedVariants: Record<string, any[]> = {};
  product.variants.forEach((variant: any) => {
    if (!groupedVariants[variant.variantCategory]) {
      groupedVariants[variant.variantCategory] = [];
    }
    groupedVariants[variant.variantCategory].push(variant);
  });

  const categories = Object.keys(groupedVariants);

  // Find the variant that matches all selected options
  const matchingVariant = product.variants.find((variant: any) => {
    return categories.every((category) => {
      return selectedVariants[category] === variant.variantValue &&
             groupedVariants[category].some((v: any) => v.variantValue === variant.variantValue);
    });
  });

  return matchingVariant?.mrp || product.variants[0]?.mrp || 0;
}

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
  (get, set, { productId, quantity, selectedVariants }: {
    productId: string;
    quantity: number;
    selectedVariants?: Record<string, string>;
  }) => {
    const currentItems = get(cartItemsAtom);

    // Find the item by productId and variant combination
    let existingItem;
    if (selectedVariants && Object.keys(selectedVariants).length > 0) {
      const variantKey = `${productId}-${Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('-')}`;
      existingItem = currentItems.find(item => item.variantKey === variantKey);
    } else {
      existingItem = currentItems.find(item => item.productId === productId && !item.variantKey);
    }

    if (!existingItem) {
      return { action: 'not_found', productId } as const;
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      let updatedItems;
      if (selectedVariants && Object.keys(selectedVariants).length > 0) {
        const variantKey = `${productId}-${Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('-')}`;
        updatedItems = currentItems.filter(item => item.variantKey !== variantKey);
      } else {
        updatedItems = currentItems.filter(item => item.productId !== productId && !item.variantKey);
      }
      set(cartItemsAtom, updatedItems);
      return { action: 'removed', item: existingItem } as const;
    } else {
      // Update the quantity
      let updatedItems;
      if (selectedVariants && Object.keys(selectedVariants).length > 0) {
        const variantKey = `${productId}-${Object.entries(selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('-')}`;
        updatedItems = currentItems.map(item =>
          item.variantKey === variantKey
            ? { ...item, quantity }
            : item
        );
      } else {
        updatedItems = currentItems.map(item =>
          item.productId === productId && !item.variantKey
            ? { ...item, quantity }
            : item
        );
      }
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
