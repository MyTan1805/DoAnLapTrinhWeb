import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { apiRequest } from './queryClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types
export type CartItem = {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    salePrice: number | null;
    imageUrl: string;
    slug: string;
  };
};

type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

type CartAction = 
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

type CartContextType = {
  cart: CartState;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (id: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

type LanguageState = 'vi' | 'en';
type LanguageAction = { type: 'SET_LANGUAGE'; payload: LanguageState };
type LanguageContextType = {
  language: LanguageState;
  setLanguage: (lang: LanguageState) => void;
};

// Initial states
const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null
};

const initialLanguageState: LanguageState = 'vi';

// Contexts
const CartContext = createContext<CartContextType | undefined>(undefined);
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Reducers
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

function languageReducer(state: LanguageState, action: LanguageAction): LanguageState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return action.payload;
    default:
      return state;
  }
}

// Provider Components
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery<CartItem[]>({
    queryKey: ['/api/cart'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: 'SET_LOADING', payload: true });
    } else if (cartItems) {
      dispatch({ type: 'SET_CART', payload: cartItems });
    }
  }, [cartItems, isLoading]);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiRequest('POST', '/api/cart', { productId, quantity });
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
      }
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' });
      }
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiRequest('DELETE', `/api/cart/${id}`);
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
      }
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiRequest('DELETE', '/api/cart');
      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const savedLanguage = typeof window !== 'undefined' ? 
    (localStorage.getItem('language') as LanguageState || initialLanguageState) : 
    initialLanguageState;
  
  const [language, dispatch] = useReducer(languageReducer, savedLanguage);

  const setLanguage = (lang: LanguageState) => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hooks
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Combined provider for convenience
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LanguageProvider>
  );
}
