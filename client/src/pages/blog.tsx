import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import Layout from '@/components/layout/layout';
import BlogCard from '@/components/blog-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import NewsletterSection from '@/components/newsletter-section';

export default function Blog() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Fetch blog posts
  const { data: blogPosts, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/blog-posts']
  });
  
  // Get unique categories
  const categories = blogPosts 
    ? [...new Set(blogPosts.map(post => post.category))]
    : [];
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts?.filter(post => {
    // Filter by search term
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (activeCategory && post.category !== activeCategory) {
      return false;
    }
    
    return true;
  });
  
  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Skeleton className="w-full h-52" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-24 mt-3" />
        </div>
      </div>
    ));
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-2">
            {language === 'vi' ? 'Blog làm đẹp' : 'Beauty Blog'}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary">
              {language === 'vi' ? 'Trang chủ' : 'Home'}
            </a>
            <span className="mx-2">/</span>
            <span>
              {language === 'vi' ? 'Blog' : 'Blog'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder={language === 'vi' ? 'Tìm kiếm bài viết...' : 'Search posts...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <h3 className="font-heading font-medium mb-4">
                {language === 'vi' ? 'Danh mục' : 'Categories'}
              </h3>
              
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      activeCategory === null ? 'text-primary font-medium' : ''
                    }`}
                  >
                    {language === 'vi' ? 'Tất cả' : 'All'}
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                        activeCategory === category ? 'text-primary font-medium' : ''
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-heading font-medium mb-4">
                {language === 'vi' ? 'Theo dõi chúng tôi' : 'Follow Us'}
              </h3>
              
              <div className="flex gap-2">
                <a 
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                
                <a 
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                
                <a 
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                
                <a 
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">
                  {language === 'vi' 
                    ? 'Đã có lỗi xảy ra khi tải bài viết.' 
                    : 'An error occurred while loading blog posts.'}
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {renderSkeletons()}
              </div>
            ) : filteredPosts?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {language === 'vi' 
                    ? 'Không tìm thấy bài viết nào phù hợp với tiêu chí tìm kiếm.' 
                    : 'No posts found matching your search criteria.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredPosts?.map(post => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl}
                    publishDate={post.publishDate}
                    category={post.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </Layout>
  );
}
