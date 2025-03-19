import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage, useCart } from '@/lib/context';
import Layout from '@/components/layout/layout';
import CartItem from '@/components/cart-item';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const { language } = useLanguage();
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [isClearingCart, setIsClearingCart] = useState(false);
  
  // Calculate cart totals
  const subtotal = cart.items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  
  // Format currency for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleClearCart = async () => {
    if (isClearingCart) return;
    
    setIsClearingCart(true);
    try {
      await clearCart();
      toast({
        title: language === 'vi' ? 'Giỏ hàng đã được xóa' : 'Cart cleared',
        description: language === 'vi' 
          ? 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng của bạn' 
          : 'All items have been removed from your cart',
      });
    } catch (error) {
      toast({
        title: language === 'vi' ? 'Lỗi' : 'Error',
        description: language === 'vi' 
          ? 'Không thể xóa giỏ hàng' 
          : 'Could not clear cart',
        variant: 'destructive'
      });
    } finally {
      setIsClearingCart(false);
    }
  };
  
  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="flex items-center py-4 border-b border-gray-200">
        <Skeleton className="w-20 h-20 rounded-md" />
        <div className="ml-4 flex-grow">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    ));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-heading mb-6">
          {language === 'vi' ? 'Giỏ hàng của bạn' : 'Your Cart'}
        </h1>
        
        {cart.loading ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderSkeletons()}
          </div>
        ) : cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {language === 'vi' ? 'Giỏ hàng của bạn đang trống' : 'Your cart is empty'}
            </h2>
            <p className="text-gray-500 mb-6">
              {language === 'vi' 
                ? 'Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.' 
                : 'Looks like you haven\'t added any products to your cart yet.'}
            </p>
            <Link 
              href="/shop" 
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-full transition duration-300 inline-flex items-center"
            >
              {language === 'vi' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <h2 className="font-medium text-lg">
                    {language === 'vi' ? 'Sản phẩm' : 'Products'} ({cart.items.length})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    disabled={isClearingCart}
                    className="text-red-500 hover:text-red-700 flex items-center disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {language === 'vi' ? 'Xóa tất cả' : 'Clear all'}
                  </button>
                </div>
                
                {cart.items.map(item => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productId={item.productId}
                    quantity={item.quantity}
                    product={item.product}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-medium text-lg mb-4 pb-2 border-b">
                  {language === 'vi' ? 'Tổng giỏ hàng' : 'Cart Summary'}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'vi' ? 'Tạm tính' : 'Subtotal'}
                    </span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {language === 'vi' ? 'Phí vận chuyển' : 'Shipping'}
                    </span>
                    <span>
                      {language === 'vi' ? 'Miễn phí' : 'Free'}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>
                        {language === 'vi' ? 'Tổng cộng' : 'Total'}
                      </span>
                      <span className="text-primary">{formatPrice(subtotal)}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {language === 'vi' 
                        ? '(Đã bao gồm VAT nếu có)' 
                        : '(Including VAT if applicable)'}
                    </p>
                  </div>
                </div>
                
                <Link
                  href="/checkout"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
                >
                  {language === 'vi' ? 'Tiến hành thanh toán' : 'Proceed to Checkout'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                
                <Link
                  href="/shop"
                  className="w-full mt-3 border border-gray-300 bg-white text-gray-800 font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center hover:bg-gray-50"
                >
                  {language === 'vi' ? 'Tiếp tục mua sắm' : 'Continue Shopping'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
