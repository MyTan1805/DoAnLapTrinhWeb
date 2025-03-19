import { Link } from 'wouter';
import { useLanguage } from '@/lib/context';

export default function SpecialOffersSection() {
  const { language } = useLanguage();
  
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            {language === 'vi' ? 'Khuyến mãi đặc biệt' : 'Special Offers'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/shop" className="block relative overflow-hidden rounded-lg group">
            <img 
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80" 
              alt={language === 'vi' ? 'Ưu đãi mùa hè' : 'Summer Sale'} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 to-transparent flex items-center">
              <div className="p-6 md:p-10 max-w-md">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  {language === 'vi' ? 'Ưu đãi mùa hè' : 'Summer Sale'}
                </h3>
                <p className="text-white/90 mb-4">
                  {language === 'vi' 
                    ? 'Giảm giá lên đến 30% cho tất cả sản phẩm chăm sóc da'
                    : 'Up to 30% off on all skincare products'}
                </p>
                <span className="inline-block bg-white text-primary font-medium py-2 px-4 rounded-full group-hover:bg-primary group-hover:text-white transition duration-300">
                  {language === 'vi' ? 'Mua ngay' : 'Shop now'}
                </span>
              </div>
            </div>
          </Link>
          
          <Link href="/shop" className="block relative overflow-hidden rounded-lg group">
            <img 
              src="https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400&q=80" 
              alt={language === 'vi' ? 'Bộ quà tặng' : 'Gift Sets'} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
              <div className="p-6 md:p-10 max-w-md">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  {language === 'vi' ? 'Bộ quà tặng' : 'Gift Sets'}
                </h3>
                <p className="text-white/90 mb-4">
                  {language === 'vi' 
                    ? 'Tặng kèm son môi khi mua bộ sản phẩm trang điểm'
                    : 'Free lipstick with makeup sets'}
                </p>
                <span className="inline-block bg-white text-primary font-medium py-2 px-4 rounded-full group-hover:bg-primary group-hover:text-white transition duration-300">
                  {language === 'vi' ? 'Khám phá ngay' : 'Explore now'}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
