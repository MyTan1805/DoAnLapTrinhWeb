import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/context";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Users, 
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminSidebar() {
  const [location] = useLocation();
  const { language } = useLanguage();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    products: true
  });
  
  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  const menuItems = [
    {
      title: language === 'vi' ? 'Tổng quan' : 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/admin',
      active: location === '/admin',
    },
    {
      title: language === 'vi' ? 'Sản phẩm' : 'Products',
      icon: <Package className="h-5 w-5" />,
      menu: 'products',
      active: location.startsWith('/admin/products'),
      children: [
        {
          title: language === 'vi' ? 'Tất cả sản phẩm' : 'All Products',
          path: '/admin/products',
          active: location === '/admin/products',
        },
        {
          title: language === 'vi' ? 'Thêm sản phẩm' : 'Add Product',
          path: '/admin/products/add',
          active: location === '/admin/products/add',
        },
        {
          title: language === 'vi' ? 'Danh mục' : 'Categories',
          path: '/admin/categories',
          active: location === '/admin/categories',
        },
      ]
    },
    {
      title: language === 'vi' ? 'Đơn hàng' : 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />,
      path: '/admin/orders',
      active: location.startsWith('/admin/orders'),
    },
    {
      title: language === 'vi' ? 'Bài viết' : 'Blog Posts',
      icon: <FileText className="h-5 w-5" />,
      path: '/admin/blog-posts',
      active: location.startsWith('/admin/blog-posts'),
    },
    {
      title: language === 'vi' ? 'Người dùng' : 'Users',
      icon: <Users className="h-5 w-5" />,
      path: '/admin/users',
      active: location.startsWith('/admin/users'),
    },
    {
      title: language === 'vi' ? 'Cài đặt' : 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/admin/settings',
      active: location.startsWith('/admin/settings'),
    },
  ];
  
  return (
    <div className="bg-secondary h-screen w-64 flex-shrink-0 text-white">
      <div className="p-4 border-b border-gray-700">
        <Link href="/admin" className="font-heading text-xl font-bold flex items-center">
          <span className="text-primary">ADMIN</span>
          <span className="ml-1">PANEL</span>
        </Link>
      </div>
      
      <div className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.menu)}
                    className={cn(
                      "flex items-center justify-between w-full p-3 rounded-md",
                      item.active ? "bg-secondary-dark text-primary" : "hover:bg-gray-700"
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {expandedMenus[item.menu] ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </button>
                  
                  {expandedMenus[item.menu] && (
                    <ul className="pl-10 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.path}
                            className={cn(
                              "block p-2 rounded-md",
                              child.active ? "text-primary" : "text-gray-300 hover:text-white"
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-md",
                    item.active ? "bg-secondary-dark text-primary" : "hover:bg-gray-700"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
        >
          <div className="flex items-center">
            <LogOut className="h-5 w-5" />
            <span className="ml-3">
              {language === 'vi' ? 'Trở về trang chủ' : 'Back to Site'}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
