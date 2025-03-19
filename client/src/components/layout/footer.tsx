import { Link } from "wouter";
import { useLanguage } from "@/lib/context";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-secondary text-white pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">MỸ PHẨM VN</h3>
            <p className="text-gray-300 mb-4">
              {language === 'vi' 
                ? 'Chúng tôi cung cấp các sản phẩm mỹ phẩm chất lượng cao giúp bạn tỏa sáng vẻ đẹp tự nhiên mỗi ngày.'
                : 'We provide high quality cosmetics products to help you shine your natural beauty every day.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="lucide">
                  <path d="M382.8 171.6c20.8 15.7 34.7 39.4 40.6 67.6 3.3 15.7 4.9 33.9 3.5 53.4-1.3 19.3-5.8 35.9-11.3 51-33.7 99-143.7 152.5-221.6 113.2-35.6-18-60.7-52.7-63.5-95.7-2.7-43.1 15.1-82.9 53-110.2 3.2-2.3 6.1 1 4.1 4.7-5.7 10.2-10.8 21.9-12.8 34.1-1.7 10.7-1.9 20-0.6 28.9.3 2.3 1.3 5.5 .9 7.6-.5 2.9-3.6 3.1-5.1 .7-0.9-1.4-1.7-3-2.4-4.7-5.1-12.7-7.1-29.1-6.5-47 .5-16 3.3-31.2 8.8-43.6 4.1-9.3 8.6-17.2 13.6-24.1 4.6-6.3 27-45.4 73.4-41.8 16.5 1.3 27.6 8.1 33 20.9 5.7 13.7 2.9 32.8-4.8 54.4-19.5 54.6-62.8 89.6-112.8 98.3-26.7 4.6-47.5 1-61.4-10.4-13.8-11.3-19.5-28.7-18.8-47.2 .5-14.4 5.8-27.1 16.5-35.8 9.5-7.7 21.3-11.2 34.3-11.2 30 0 54.3 22.6 60.3 48.5 .8 3.5 1.2 7.1 1.2 10.9 0 3.5-1.8 7.8-4.2 10.6-4.3 5-11.1 7.1-16.8 5.2-12.3-4-11.7-20.4-7.9-28.1 1.5-3.1 2.8-6.2 4.1-9.3 .7-1.7-1.6-8.1-5.5-9.1-3.8-1-9.1 1.7-12 4.3-12.4 11.1-15.7 41.2-11.1 59.9 1.4 5.8 3.9 10.8 7.1 14.8 6.9 8.7 18.9 12.2 32.6 9.6 24.2-4.6 45.7-20.5 60.2-44.2 9.6-15.6 15.1-32.6 16.8-51.8 .5-5.5 .6-10.5 .2-15.5-0.4-5.1-2.4-9.8-5.5-13.4-7.3-8.6-21.1-12.8-36.9-10.4-26.2 3.9-48.1 30.5-51.8 62.9-1.4 12.3-.3 23.7 3.2 33.5 .5 1.4 1.1 2.8 1.8 4.1 1.3 2.6-3.4 4.9-5.1 2.3-13.7-20.7-19.9-51.4-8.1-79.7 10.4-25 34.8-46.8 66.7-46.8 15.8 0 34 5.4 45.6 20.7 5.3 7 8.6 15.4 9.7 24.9 2.7 22.5-5.1 47.8-19.7 70.4-10.8 16.7-24.7 30.1-41.3 39.7-9.6 5.6-19.9 9.5-30.3 11.3-10.8 1.9-21.6 1.6-31.6-1.7-21.4-7.1-33.8-25-35.6-45-3.1-34.8 19.5-71.4 56.2-89.8 22.2-11.2 46.4-14.1 67.9-8.3 29.6 8 49.2 31.9 59.1 59.8 8.5 24 9.6 50 3.2 76.5-6.2 25.6-18.5 46.1-35.4 59.9-31.3 25.4-77.6 29.9-113.7 11.1-17.7-9.3-30.1-25.2-34.6-45-4.4-19.7-2-41.2 6.9-61.2 14.5-32.5 44.3-51.5 78.3-49.9 32.8 1.5 57.8 28.2 60.5 65.7 1 14.2-1.3 27.8-7 40.5-5.2 11.5-20.5 35.9-36.4 31.4-5.8-1.6-8.9-7.5-7.9-15.1 .5-3.8 2.4-8.5 4.9-14.2 4.9-11.3 12.4-26.9 9.7-41.9-2.3-12.8-11.9-21.4-26.1-21.4-15.9 0-28.8 12.3-34.1 29.6-4.6 15.1-3.4 31.2 3.2 41.8 9.5 15.3 28.9 22.2 52 16.2 50.7-13.2 94.6-48.1 115.4-114.2 18-57.4 3.2-118.1-37.1-148.3-45.1-33.9-127.3-5.9-146.3 65.4-5.4 20.2-4.3 38.6 3.1 55.2 1.4 3.2 3.2 6.1 5.3 8.8 4.1 5.3-2.3 12.1-7.5 9.1-5.8-3.4-10.5-8.2-14.3-14-24.2-36.7-26.1-96.3-3.5-133.4 2.9-4.8 6.3-9.2 10.1-13.3 0 0 109-124.2 212.8 1.3z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              {language === 'vi' ? 'Danh mục sản phẩm' : 'Product Categories'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/cham-soc-da" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Chăm sóc da' : 'Skincare'}
                </Link>
              </li>
              <li>
                <Link href="/shop/trang-diem" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Trang điểm' : 'Makeup'}
                </Link>
              </li>
              <li>
                <Link href="/shop/cham-soc-toc" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Chăm sóc tóc' : 'Hair Care'}
                </Link>
              </li>
              <li>
                <Link href="/shop/nuoc-hoa" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Nước hoa' : 'Perfume'}
                </Link>
              </li>
              <li>
                <Link href="/shop/dung-cu-lam-dep" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Dụng cụ làm đẹp' : 'Beauty Tools'}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Thương hiệu' : 'Brands'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              {language === 'vi' ? 'Thông tin' : 'Information'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Về chúng tôi' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Blog làm đẹp' : 'Beauty Blog'}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Chính sách đổi trả' : 'Return Policy'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition duration-300">
                  {language === 'vi' ? 'Liên hệ' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-primary" />
                <span className="text-gray-300">
                  123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">1900 1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">info@myphamvn.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-300">
                  {language === 'vi' ? 'T2-T7: 8:00 - 20:00' : 'Mon-Sat: 8:00 - 20:00'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2023 Mỹ Phẩm VN. {language === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center space-x-2">
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="25" rx="3" fill="#E6E6E6"/>
              <path d="M16 15H24V9H16V15Z" fill="#FF6B81"/>
              <path d="M16.5 12H23.5M19 9V15M21 9V15" stroke="white" strokeWidth="0.5"/>
            </svg>
            
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="25" rx="3" fill="#E6E6E6"/>
              <circle cx="20" cy="12" r="6" fill="#FF6B81"/>
              <circle cx="17" cy="12" r="6" fill="#1434CB" fillOpacity="0.8"/>
            </svg>
            
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="25" rx="3" fill="#E6E6E6"/>
              <path d="M28 17H12C11.4477 17 11 16.5523 11 16V8C11 7.44772 11.4477 7 12 7H28C28.5523 7 29 7.44772 29 8V16C29 16.5523 28.5523 17 28 17Z" fill="#169BD7"/>
              <path d="M17 11.5C17 12.8807 15.8807 14 14.5 14C13.1193 14 12 12.8807 12 11.5C12 10.1193 13.1193 9 14.5 9C15.8807 9 17 10.1193 17 11.5Z" fill="#FFFFFF"/>
              <path d="M17 14L19 17H12L15 14H17Z" fill="#FFFFFF"/>
            </svg>
            
            <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="25" rx="3" fill="#E6E6E6"/>
              <rect x="12" y="7" width="16" height="11" rx="2" fill="#A50064"/>
              <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" fill="#FFDD00"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
