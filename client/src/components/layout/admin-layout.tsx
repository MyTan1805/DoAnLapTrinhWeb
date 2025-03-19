import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/sidebar';
import { useLanguage } from '@/lib/context';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="py-6 px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          &copy; 2023 Mỹ Phẩm VN - {language === 'vi' ? 'Trang quản trị' : 'Admin Panel'}
        </footer>
      </div>
    </div>
  );
}
