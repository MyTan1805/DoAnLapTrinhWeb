import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import BlogCard from '@/components/blog-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSection() {
  const { language } = useLanguage();
  
  const { data: blogPosts, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/blog-posts']
  });
  
  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
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
  
  if (error) {
    return (
      <section className="py-14 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 my-10">
            {language === 'vi' 
              ? 'Đã có lỗi xảy ra khi tải bài viết.' 
              : 'An error occurred while loading blog posts.'}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-14 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            {language === 'vi' ? 'Bài viết mới nhất' : 'Latest Blog Posts'}
          </h2>
          <Link href="/blog" className="hidden md:flex items-center text-primary hover:text-primary-dark font-medium transition duration-300">
            {language === 'vi' ? 'Xem tất cả bài viết' : 'View all posts'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            renderSkeletons()
          ) : (
            blogPosts?.slice(0, 3).map((post) => (
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
            ))
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition duration-300">
            {language === 'vi' ? 'Xem tất cả bài viết' : 'View all posts'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
