import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import Layout from '@/components/layout/layout';
import BlogSection from '@/components/blog-section';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import NewsletterSection from '@/components/newsletter-section';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  
  // Fetch blog post details
  const { data: post, isLoading, error } = useQuery<any>({
    queryKey: [`/api/blog-posts/${params.slug}`]
  });
  
  // Format date according to current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Format date based on language
    if (language === 'vi') {
      // For Vietnamese, use format: DD/MM/YYYY
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } else {
      // For English, format as: January 1, 2023
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    }
  };
  
  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {language === 'vi' ? 'Bài viết không tồn tại' : 'Blog post not found'}
          </h1>
          <p className="mb-8">
            {language === 'vi' 
              ? 'Không thể tìm thấy bài viết bạn đang tìm kiếm.'
              : 'We could not find the blog post you were looking for.'}
          </p>
          <a 
            href="/blog" 
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            {language === 'vi' ? 'Quay lại blog' : 'Back to blog'}
          </a>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <Skeleton className="h-10 w-3/4 max-w-2xl" />
          ) : (
            <>
              <h1 className="text-3xl font-bold font-heading mb-2">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <a href="/" className="hover:text-primary">
                  {language === 'vi' ? 'Trang chủ' : 'Home'}
                </a>
                <span className="mx-2">/</span>
                <a href="/blog" className="hover:text-primary">
                  {language === 'vi' ? 'Blog' : 'Blog'}
                </a>
                <span className="mx-2">/</span>
                <span>{post.title}</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="w-full h-[400px] rounded-lg" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            post && (
              <>
                <div className="rounded-lg overflow-hidden mb-8">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-auto" 
                  />
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>{formatDate(post.publishDate)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                
                <h1 className="text-3xl font-bold font-heading mb-6">
                  {post.title}
                </h1>
                
                <div className="prose max-w-none">
                  <p>{post.content}</p>
                  
                  <p>
                    {language === 'vi' 
                      ? 'Trong thế giới làm đẹp ngày nay, việc chăm sóc da không còn là một xu hướng đơn thuần mà đã trở thành một phần không thể thiếu trong cuộc sống hàng ngày của nhiều người. Với sự phát triển không ngừng của công nghệ và khoa học, các sản phẩm chăm sóc da ngày càng đa dạng và hiệu quả, mang đến nhiều lựa chọn hơn cho người tiêu dùng.'
                      : 'In today\'s beauty world, skincare is no longer just a trend but has become an essential part of many people\'s daily lives. With the continuous development of technology and science, skincare products are increasingly diverse and effective, offering more choices for consumers.'}
                  </p>
                  
                  <h2>
                    {language === 'vi' 
                      ? 'Làm thế nào để chọn sản phẩm phù hợp?'
                      : 'How to choose the right products?'}
                  </h2>
                  
                  <p>
                    {language === 'vi' 
                      ? 'Để chọn được sản phẩm phù hợp, điều quan trọng là bạn phải hiểu rõ loại da của mình. Da khô, da dầu, da hỗn hợp hay da nhạy cảm - mỗi loại da đều có những nhu cầu riêng biệt và cần được chăm sóc theo cách phù hợp.'
                      : 'To choose the right product, it\'s important that you understand your skin type. Dry, oily, combination, or sensitive skin - each skin type has its own unique needs and requires appropriate care.'}
                  </p>
                  
                  <ol>
                    <li>
                      {language === 'vi' 
                        ? 'Xác định loại da của bạn'
                        : 'Identify your skin type'}
                    </li>
                    <li>
                      {language === 'vi' 
                        ? 'Nghiên cứu thành phần sản phẩm'
                        : 'Research product ingredients'}
                    </li>
                    <li>
                      {language === 'vi' 
                        ? 'Thử nghiệm từng sản phẩm mới'
                        : 'Test each new product'}
                    </li>
                    <li>
                      {language === 'vi' 
                        ? 'Kiên nhẫn và theo dõi kết quả'
                        : 'Be patient and monitor results'}
                    </li>
                  </ol>
                  
                  <blockquote>
                    {language === 'vi' 
                      ? 'Chăm sóc da không phải là về việc hoàn hảo, mà là về sự nhất quán và tìm ra những gì phù hợp với bạn.'
                      : 'Skincare is not about perfection, but about consistency and finding what works for you.'}
                  </blockquote>
                  
                  <p>
                    {language === 'vi' 
                      ? 'Hãy nhớ rằng, mỗi làn da đều là duy nhất và những gì hiệu quả với người khác có thể không phù hợp với bạn. Vì vậy, hãy luôn lắng nghe làn da của mình và điều chỉnh thói quen chăm sóc da theo nhu cầu thực tế.'
                      : 'Remember, every skin is unique and what works for others may not work for you. Therefore, always listen to your skin and adjust your skincare routine according to your actual needs.'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 mt-8 pt-8">
                  <h3 className="font-bold text-lg mb-4">
                    {language === 'vi' ? 'Chia sẻ bài viết' : 'Share this post'}
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
                      aria-label="Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    
                    <a 
                      href="#"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Pinterest"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    
                    <a 
                      href="#"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                      aria-label="Email"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-heading text-center mb-10">
            {language === 'vi' ? 'Bài viết liên quan' : 'Related Posts'}
          </h2>
          
          <BlogSection />
        </div>
      </div>
      
      <NewsletterSection />
    </Layout>
  );
}
