import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage, useCart } from "@/lib/context";
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage } = useLanguage();
  const { cart } = useCart();
  
  const totalCartItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar with Language Selector and Account Links */}
      <div className="bg-secondary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <span className="mr-2">{language === 'vi' ? 'Ngôn ngữ:' : 'Language:'}</span>
              <select 
                className="bg-secondary text-white text-xs border border-gray-600 rounded px-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>Hotline: 1900 1234</div>
          </div>
          <div className="flex space-x-4 text-xs">
            <Link href="/login" className="hover:text-primary-light">
              {language === 'vi' ? 'Đăng nhập' : 'Login'}
            </Link>
            <span>|</span>
            <Link href="/register" className="hover:text-primary-light">
              {language === 'vi' ? 'Đăng ký' : 'Register'}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link href="/" className="font-heading text-2xl font-bold text-primary">
            MỸ PHẨM <span className="text-secondary">VN</span>
          </Link>
          <button className="md:hidden text-gray-600" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop Navigation and Search */}
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6 font-medium">
              <li>
                <Link href="/" className={cn("hover:text-primary", location === "/" && "text-primary font-semibold")}>
                  {language === 'vi' ? 'Trang chủ' : 'Home'}
                </Link>
              </li>
              <li>
                <div className="relative group">
                  <Link href="/shop" className={cn("hover:text-primary flex items-center", location.startsWith("/shop") && "text-primary font-semibold")}>
                    {language === 'vi' ? 'Danh mục sản phẩm' : 'Products'}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-4 w-56 z-50">
                    <ul className="space-y-2">
                      <li><Link href="/shop/cham-soc-da" className="block hover:text-primary">{language === 'vi' ? 'Chăm sóc da' : 'Skincare'}</Link></li>
                      <li><Link href="/shop/trang-diem" className="block hover:text-primary">{language === 'vi' ? 'Trang điểm' : 'Makeup'}</Link></li>
                      <li><Link href="/shop/cham-soc-toc" className="block hover:text-primary">{language === 'vi' ? 'Chăm sóc tóc' : 'Hair Care'}</Link></li>
                      <li><Link href="/shop/nuoc-hoa" className="block hover:text-primary">{language === 'vi' ? 'Nước hoa' : 'Perfume'}</Link></li>
                      <li><Link href="/shop/dung-cu-lam-dep" className="block hover:text-primary">{language === 'vi' ? 'Dụng cụ làm đẹp' : 'Beauty Tools'}</Link></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link href="/blog" className={cn("hover:text-primary", location.startsWith("/blog") && "text-primary font-semibold")}>
                  {language === 'vi' ? 'Blog làm đẹp' : 'Beauty Blog'}
                </Link>
              </li>
              <li>
                <Link href="/about" className={cn("hover:text-primary", location === "/about" && "text-primary font-semibold")}>
                  {language === 'vi' ? 'Giới thiệu' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={cn("hover:text-primary", location === "/contact" && "text-primary font-semibold")}>
                  {language === 'vi' ? 'Liên hệ' : 'Contact'}
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="search" 
                placeholder={language === 'vi' ? 'Tìm kiếm...' : 'Search...'} 
                className="pl-10 pr-4 py-2 w-56 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <div className="relative">
              <Link href="/cart" className="block p-2">
                <ShoppingBag className="h-5 w-5" />
                {totalCartItems > 0 && (
                  <span className="absolute top-0 right-0 h-5 w-5 text-xs rounded-full bg-primary text-white flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3">
            <div className="flex flex-col space-y-3 pb-3">
              <div className="relative">
                <input 
                  type="search" 
                  placeholder={language === 'vi' ? 'Tìm kiếm...' : 'Search...'} 
                  className="pl-10 pr-4 py-2 w-full rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            <nav>
              <ul className="flex flex-col space-y-2 font-medium border-t border-gray-200 pt-3">
                <li>
                  <Link 
                    href="/" 
                    className={cn("block py-2 hover:text-primary", location === "/" && "text-primary font-semibold")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === 'vi' ? 'Trang chủ' : 'Home'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/shop" 
                    className={cn("block py-2 hover:text-primary", location.startsWith("/shop") && "text-primary font-semibold")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === 'vi' ? 'Danh mục sản phẩm' : 'Products'}
                  </Link>
                  <ul className="pl-4 mt-1 mb-2 space-y-1">
                    <li>
                      <Link 
                        href="/shop/cham-soc-da" 
                        className="block py-1 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {language === 'vi' ? 'Chăm sóc da' : 'Skincare'}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/shop/trang-diem" 
                        className="block py-1 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {language === 'vi' ? 'Trang điểm' : 'Makeup'}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/shop/cham-soc-toc" 
                        className="block py-1 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {language === 'vi' ? 'Chăm sóc tóc' : 'Hair Care'}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/shop/nuoc-hoa" 
                        className="block py-1 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {language === 'vi' ? 'Nước hoa' : 'Perfume'}
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/shop/dung-cu-lam-dep" 
                        className="block py-1 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {language === 'vi' ? 'Dụng cụ làm đẹp' : 'Beauty Tools'}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className={cn("block py-2 hover:text-primary", location.startsWith("/blog") && "text-primary font-semibold")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === 'vi' ? 'Blog làm đẹp' : 'Beauty Blog'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className={cn("block py-2 hover:text-primary", location === "/about" && "text-primary font-semibold")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === 'vi' ? 'Giới thiệu' : 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className={cn("block py-2 hover:text-primary", location === "/contact" && "text-primary font-semibold")}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language === 'vi' ? 'Liên hệ' : 'Contact'}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="pt-3 flex justify-between items-center border-t border-gray-200 mt-3">
              <Link 
                href="/cart" 
                className="py-2 px-4 bg-primary text-white rounded-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {language === 'vi' ? `Giỏ hàng (${totalCartItems})` : `Cart (${totalCartItems})`}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
