import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export interface CartItem {
  id: number;
  title: string;
  brand: string;
  credits: number;
  image: string;
  quantity: number;
}

export const cartItemsAtom = atomWithStorage<CartItem[]>('cartItems', []);

export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => total + item.quantity, 0);
});

export const cartAnimationAtom = atom(false);
