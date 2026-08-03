'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ALL_PRODUCTS, findProduct, type Product } from './products';

const STORAGE_KEY = 'moortv.cart.v1';

export type CartLine = { id: string; qty: number };

type State = { lines: CartLine[]; hydrated: boolean };

type Action =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; id: string; qty?: number }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' };

const MAX_QTY = 20;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { lines: action.lines, hydrated: true };

    case 'add': {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.id === action.id);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, { id: action.id, qty: Math.min(MAX_QTY, qty) }] };
    }

    case 'remove':
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };

    case 'setQty': {
      if (action.qty <= 0) {
        return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l,
        ),
      };
    }

    case 'clear':
      return { ...state, lines: [] };
  }
}

export type CartItem = { product: Product; qty: number; lineTotal: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  savings: number;
  total: number;
  hydrated: boolean;
  isOpen: boolean;
  /** Product id that was most recently added — drives the "added" micro-interaction. */
  lastAdded: string | null;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything that no longer maps to a real product (catalogue changes).
    return parsed.flatMap((entry) => {
      if (typeof entry !== 'object' || entry === null) return [];
      const { id, qty } = entry as Partial<CartLine>;
      if (typeof id !== 'string' || !ALL_PRODUCTS.some((p) => p.id === id)) return [];
      const n = typeof qty === 'number' && Number.isFinite(qty) ? Math.floor(qty) : 1;
      if (n <= 0) return [];
      return [{ id, qty: Math.min(MAX_QTY, n) }];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch({ type: 'hydrate', lines: readStorage() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* private mode / quota — the cart just won't survive a reload */
    }
  }, [state.lines, state.hydrated]);

  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    dispatch({ type: 'add', id, qty });
    setLastAdded(id);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setLastAdded(null), 1800);
  }, []);

  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'setQty', id, qty }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const items: CartItem[] = state.lines.flatMap((line) => {
      const product = findProduct(line.id);
      if (!product) return [];
      return [{ product, qty: line.qty, lineTotal: product.price * line.qty }];
    });

    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
    const savings = items.reduce(
      (sum, i) => sum + (i.product.compareAt ? (i.product.compareAt - i.product.price) * i.qty : 0),
      0,
    );

    return {
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      savings,
      total: subtotal,
      hydrated: state.hydrated,
      isOpen,
      lastAdded,
      add,
      remove,
      setQty,
      clear,
      openCart,
      closeCart,
    };
  }, [state.lines, state.hydrated, isOpen, lastAdded, add, remove, setQty, clear, openCart, closeCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
