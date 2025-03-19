import { useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage, useCart } from '@/lib/context';
import Layout from '@/components/layout/layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import NewsletterSection from '@/components/newsletter-section';

export default function Checkout() {
  const { language } = useLanguage();
  const { cart, clearCart } = useCart();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
    paymentMethod: 'cod'
  });
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast({
        title: language === 'vi' ? 'Giỏ hàng trống' : 'Empty cart',
        description: language === 'vi' 
          ? 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán' 
          : 'Please add products to your cart before checkout',
        variant: 'destructive'
      });
      return;
    }
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: language === 'vi' ? 'Thông tin thiếu' : 'Missing information',
        description: language === 'vi' 
          ? 'Vui lòng điền đầy đủ thông tin cần thiết' 
          : 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(async () => {
      try {
        await clearCart();
        toast({
          title: language === 'vi' ? 'Đặt hàng thành công' : 'Order successful',
          description: language === 'vi' 
            ? 'Cảm ơn bạn đã mua hàng! Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.' 
            : 'Thank you for your purchase! We will contact you to confirm your order.',
        });
        navigate('/');
      } catch (error) {
        toast({
          title: language === 'vi' ? 'Lỗi' : 'Error',
          description: language === 'vi' 
            ? 'Đã xảy ra lỗi khi xử lý đơn hàng của bạn' 
            : 'An error occurred while processing your order',
          variant: 'destructive'
        });
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };
  
  if (cart.loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-600">
            {language === 'vi' ? 'Đang tải thông tin...' : 'Loading...'}
          </p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-heading mb-6">
          {language === 'vi' ? 'Thanh toán' : 'Checkout'}
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-medium text-lg mb-4 pb-2 border-b">
                  {language === 'vi' ? 'Thông tin giao hàng' : 'Shipping Information'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      {language === 'vi' ? 'Họ và tên' : 'Full Name'} *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'vi' ? 'Số điện thoại' : 'Phone'} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      {language === 'vi' ? 'Tỉnh/Thành phố' : 'City'} *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">
                      {language === 'vi' ? 'Địa chỉ' : 'Address'} *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      {language === 'vi' ? 'Mã bưu điện' : 'Postal Code'}
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">
                    {language === 'vi' ? 'Ghi chú đơn hàng' : 'Order Notes'}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder={language === 'vi' 
                      ? 'Ghi chú về đơn hàng, ví dụ: thông tin giao hàng đặc biệt.' 
                      : 'Notes about your order, e.g. special delivery information.'}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="resize-none"
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-medium text-lg mb-4 pb-2 border-b">
                  {language === 'vi' ? 'Phương thức thanh toán' : 'Payment Method'}
                </h2>
                
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={handleRadioChange}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="font-medium cursor-pointer">
                        {language === 'vi' ? 'Thanh toán khi nhận hàng' : 'Cash on Delivery'}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        {language === 'vi' 
                          ? 'Thanh toán bằng tiền mặt khi nhận hàng' 
                          : 'Pay with cash upon delivery'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="bank" id="bank" />
                    <div className="flex-1">
                      <Label htmlFor="bank" className="font-medium cursor-pointer">
                        {language === 'vi' ? 'Chuyển khoản ngân hàng' : 'Bank Transfer'}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        {language === 'vi' 
                          ? 'Thực hiện thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi' 
                          : 'Make your payment directly into our bank account'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="momo" id="momo" />
                    <div className="flex-1">
                      <Label htmlFor="momo" className="font-medium cursor-pointer">
                        MoMo
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        {language === 'vi' 
                          ? 'Thanh toán qua ví điện tử MoMo' 
                          : 'Pay with MoMo e-wallet'}
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="font-medium text-lg mb-4 pb-2 border-b">
                {language === 'vi' ? 'Đơn hàng của bạn' : 'Your Order'}
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map(item => (
                  <div key={item.id} className="flex justify-between pb-2 border-b border-gray-100">
                    <div className="flex">
                      <span className="font-medium">
                        {item.quantity} x
                      </span>
                      <span className="ml-2">{item.product.name}</span>
                    </div>
                    <span className="font-medium">
                      {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
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
              
              <button
                onClick={handleSubmit}
                disabled={isProcessing || cart.items.length === 0}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center disabled:opacity-70"
              >
                {isProcessing 
                  ? (language === 'vi' ? 'Đang xử lý...' : 'Processing...') 
                  : (language === 'vi' ? 'Đặt hàng' : 'Place Order')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </Layout>
  );
}
