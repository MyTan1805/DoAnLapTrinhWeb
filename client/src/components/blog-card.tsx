import { Link } from "wouter";
import { useLanguage } from "@/lib/context";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";

type BlogCardProps = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  publishDate: string;
  category: string;
};

export default function BlogCard({
  id,
  title,
  slug,
  excerpt,
  imageUrl,
  publishDate,
  category
}: BlogCardProps) {
  const { language } = useLanguage();
  
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
      // For English, use relative time (e.g., '3 days ago')
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: enUS
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
      <Link href={`/blog/${slug}`} className="block overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover hover:scale-105 transition duration-500"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{formatDate(publishDate)}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
        </div>
        
        <h3 className="font-heading text-xl font-semibold mb-3 hover:text-primary transition duration-300">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {excerpt}
        </p>
        
        <Link 
          href={`/blog/${slug}`} 
          className="text-primary font-medium hover:text-primary-dark transition duration-300 inline-flex items-center mt-auto"
        >
          {language === 'vi' ? 'Đọc tiếp' : 'Read more'}
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
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
