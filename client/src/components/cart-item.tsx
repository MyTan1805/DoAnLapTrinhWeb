import { useState } from "react";
import { useLanguage, useCart } from "@/lib/context";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CartItemProps = {
  id: number;
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

export default function CartItem({ id, productId, quantity, product }: CartItemProps) {
  const { language } = useLanguage();
  const { updateCartItem, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(product.salePrice ?? product.price);
  
  const formattedTotalPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format((product.salePrice ?? product.price) * quantity);
  
  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await updateCartItem(id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveItem = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-heading font-medium text-sm sm:text-base">
          {product.name}
        </h3>
        <p className="text-primary font-medium text-sm mt-1">
          {formattedPrice}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 ml-auto">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => handleUpdateQuantity(quantity - 1)}
            className={cn(
              "p-1 text-gray-500 hover:text-gray-700",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading || quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className={cn(
              "p-1 text-gray-500 hover:text-gray-700",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="w-24 text-right">
          <p className="font-semibold">{formattedTotalPrice}</p>
        </div>
        
        <button
          onClick={handleRemoveItem}
          className={cn(
            "p-1 text-gray-400 hover:text-red-500",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
