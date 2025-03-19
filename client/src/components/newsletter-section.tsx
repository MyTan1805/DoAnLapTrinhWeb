import { useState } from 'react';
import { useLanguage } from '@/lib/context';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - In a real application, this would call an API endpoint
    setTimeout(() => {
      toast({
        title: language === 'vi' ? 'Đăng ký thành công' : 'Subscription successful',
        description: language === 'vi' 
          ? 'Cảm ơn bạn đã đăng ký nhận thông tin từ chúng tôi' 
          : 'Thank you for subscribing to our newsletter',
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-14 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              {language === 'vi' ? 'Đăng ký nhận thông tin' : 'Subscribe to our newsletter'}
            </h2>
            <p className="text-white/80">
              {language === 'vi' 
                ? 'Nhận thông tin về sản phẩm mới, khuyến mãi và các mẹo làm đẹp hàng tuần.'
                : 'Get updates on new products, promotions, and weekly beauty tips.'}
            </p>
          </div>
          
          <div className="md:w-1/2">
            <form className="flex flex-col sm:flex-row sm:max-w-md md:ml-auto" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder={language === 'vi' ? 'Địa chỉ email của bạn' : 'Your email address'} 
                className="rounded-full px-5 py-3 w-full text-gray-800 focus:outline-none mb-3 sm:mb-0 sm:mr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-secondary hover:bg-secondary-dark text-white font-medium rounded-full px-6 py-3 transition duration-300 disabled:opacity-75"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (language === 'vi' ? 'Đang xử lý...' : 'Processing...') 
                  : (language === 'vi' ? 'Đăng ký' : 'Subscribe')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
