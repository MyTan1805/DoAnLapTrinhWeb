import { Link } from "wouter";
import { useLanguage } from "@/lib/context";

export default function HeroSection() {
  const { language } = useLanguage();
  
  return (
    <section className="relative h-[500px] md:h-[600px] bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl text-white">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-primary-light">
              {language === 'vi' ? 'Tỏa sáng' : 'Shine'}
            </span> {language === 'vi' ? 'với vẻ đẹp tự nhiên' : 'with natural beauty'}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-neutral-100">
            {language === 'vi' 
              ? 'Khám phá bộ sưu tập mỹ phẩm cao cấp được chọn lọc kỹ lưỡng giúp khơi dậy vẻ đẹp riêng của bạn.'
              : 'Discover our carefully curated collection of premium cosmetics that help unleash your unique beauty.'}
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/shop" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-full transition duration-300 text-center">
              {language === 'vi' ? 'Mua sắm ngay' : 'Shop Now'}
            </Link>
            <Link href="/about" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-8 rounded-full transition duration-300 text-center">
              {language === 'vi' ? 'Tìm hiểu thêm' : 'Learn More'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
