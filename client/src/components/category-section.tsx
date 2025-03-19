import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import CategoryCard from '@/components/category-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategorySection() {
  const { language } = useLanguage();
  
  const { data: categories, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <Skeleton className="h-8 w-24 mt-4 mx-auto" />
      </div>
    ));
  };
  
  if (error) {
    return (
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
            {language === 'vi' ? 'Danh mục sản phẩm' : 'Product Categories'}
          </h2>
          <div className="text-center text-red-500">
            {language === 'vi' 
              ? 'Đã có lỗi xảy ra khi tải danh mục sản phẩm.' 
              : 'An error occurred while loading categories.'}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
          {language === 'vi' ? 'Danh mục sản phẩm' : 'Product Categories'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {isLoading ? (
            renderSkeletons()
          ) : (
            categories?.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                slug={category.slug}
                imageUrl={category.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
