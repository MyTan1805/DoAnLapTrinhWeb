import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedProductsSection() {
  const { language } = useLanguage();
  
  const { data: categories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  const { data: featuredProducts, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/products?featured=true']
  });
  
  // Function to get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
        <Skeleton className="aspect-[3/4] w-full rounded-md" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-16" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
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
              ? 'Đã có lỗi xảy ra khi tải sản phẩm nổi bật.' 
              : 'An error occurred while loading featured products.'}
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
            {language === 'vi' ? 'Sản phẩm nổi bật' : 'Featured Products'}
          </h2>
          <Link href="/shop" className="hidden md:flex items-center text-primary hover:text-primary-dark font-medium transition duration-300">
            {language === 'vi' ? 'Xem tất cả' : 'View all'}
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {isLoading ? (
            renderSkeletons()
          ) : (
            featuredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                imageUrl={product.imageUrl}
                categoryName={getCategoryName(product.categoryId)}
                isNew={product.isNew}
                featured={product.featured}
                rating={product.rating}
                numReviews={product.numReviews}
              />
            ))
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/shop" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition duration-300">
            {language === 'vi' ? 'Xem tất cả sản phẩm' : 'View all products'}
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
