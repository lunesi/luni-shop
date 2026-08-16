import { createContext, useContext, useReducer, type ReactNode } from "react";

type CartItem = { id: string; quantity: number };

type CartAction = { type: "add"; id: string } | { type: "remove"; id: string };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const exists = state.some((item) => item.id === action.id);

      if (exists) {
        return state.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...state, { id: action.id, quantity: 1 }];
    }
    case "remove":
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  addToCart: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const addToCart = (id: string) => dispatch({ type: "add", id });

  return (
    <CartContext.Provider value={{ items, totalCount, addToCart }}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart должен вызываться внутри CartProvider");
  }
  return context;
}
