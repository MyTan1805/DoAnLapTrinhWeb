import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import Layout from '@/components/layout/layout';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon, FilterIcon, XIcon } from 'lucide-react';

export default function Shop({ params }: { params?: { category?: string } }) {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Fetch categories
  const { data: categories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  // Fetch all products
  const { data: allProducts, isLoading, error } = useQuery<any[]>({
    queryKey: ['/api/products']
  });
  
  // Set selected category based on URL param
  useEffect(() => {
    if (params?.category && categories) {
      const category = categories.find(c => c.slug === params.category);
      if (category) {
        setSelectedCategory(category.id);
      }
    }
  }, [params?.category, categories]);
  
  // Filter products based on criteria
  const filteredProducts = allProducts?.filter(product => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory && product.categoryId !== selectedCategory) {
      return false;
    }
    
    // Filter by price range
    const price = product.salePrice || product.price;
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = filteredProducts ? [...filteredProducts] : [];
  if (sortOption === 'price-asc') {
    sortedProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortOption === 'price-desc') {
    sortedProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (sortOption === 'name-asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'rating-desc') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  
  // Function to get category name by id
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Create loading skeletons
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
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
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-2">
            {selectedCategory && categories
              ? getCategoryName(selectedCategory)
              : language === 'vi' ? 'Cửa hàng' : 'Shop'}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary">
              {language === 'vi' ? 'Trang chủ' : 'Home'}
            </a>
            <span className="mx-2">/</span>
            <span>
              {selectedCategory && categories
                ? getCategoryName(selectedCategory)
                : language === 'vi' ? 'Cửa hàng' : 'Shop'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
            <input
              type="text"
              placeholder={language === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
              className="pl-10 pr-4 py-2 w-full rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          
          <div className="hidden md:flex items-center ml-4 space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                {language === 'vi' ? 'Sắp xếp theo:' : 'Sort by:'}
              </span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-40 h-10 text-sm">
                  <SelectValue placeholder={language === 'vi' ? 'Mặc định' : 'Default'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{language === 'vi' ? 'Mặc định' : 'Default'}</SelectItem>
                  <SelectItem value="price-asc">{language === 'vi' ? 'Giá tăng dần' : 'Price: Low to High'}</SelectItem>
                  <SelectItem value="price-desc">{language === 'vi' ? 'Giá giảm dần' : 'Price: High to Low'}</SelectItem>
                  <SelectItem value="name-asc">{language === 'vi' ? 'Tên A-Z' : 'Name: A to Z'}</SelectItem>
                  <SelectItem value="name-desc">{language === 'vi' ? 'Tên Z-A' : 'Name: Z to A'}</SelectItem>
                  <SelectItem value="rating-desc">{language === 'vi' ? 'Đánh giá' : 'Rating'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <button 
            className="md:hidden flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded"
            onClick={toggleMobileFilter}
          >
            <FilterIcon className="h-4 w-4" />
            <span className="text-sm">{language === 'vi' ? 'Lọc' : 'Filter'}</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex">
              <div className="w-4/5 max-w-sm bg-white h-full overflow-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-medium">
                    {language === 'vi' ? 'Bộ lọc' : 'Filters'}
                  </h3>
                  <button onClick={toggleMobileFilter}>
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium mb-3">
                    {language === 'vi' ? 'Danh mục' : 'Categories'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="all-categories-mobile" 
                        checked={selectedCategory === null}
                        onCheckedChange={() => setSelectedCategory(null)}
                      />
                      <Label htmlFor="all-categories-mobile" className="ml-2 text-sm">
                        {language === 'vi' ? 'Tất cả' : 'All'}
                      </Label>
                    </div>
                    
                    {categories?.map(category => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`category-${category.id}-mobile`} 
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}-mobile`} className="ml-2 text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">
                      {language === 'vi' ? 'Giá' : 'Price Range'}
                    </h4>
                    <div className="px-2">
                      <Slider
                        min={0}
                        max={1000000}
                        step={10000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-6"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">
                      {language === 'vi' ? 'Sắp xếp theo' : 'Sort by'}
                    </h4>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full text-sm">
                        <SelectValue placeholder={language === 'vi' ? 'Mặc định' : 'Default'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">{language === 'vi' ? 'Mặc định' : 'Default'}</SelectItem>
                        <SelectItem value="price-asc">{language === 'vi' ? 'Giá tăng dần' : 'Price: Low to High'}</SelectItem>
                        <SelectItem value="price-desc">{language === 'vi' ? 'Giá giảm dần' : 'Price: High to Low'}</SelectItem>
                        <SelectItem value="name-asc">{language === 'vi' ? 'Tên A-Z' : 'Name: A to Z'}</SelectItem>
                        <SelectItem value="name-desc">{language === 'vi' ? 'Tên Z-A' : 'Name: Z to A'}</SelectItem>
                        <SelectItem value="rating-desc">{language === 'vi' ? 'Đánh giá' : 'Rating'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Clickable overlay to close filter */}
              <div className="flex-grow" onClick={toggleMobileFilter}></div>
            </div>
          )}
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0 pr-8">
            <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
              <h3 className="font-medium mb-4">
                {language === 'vi' ? 'Danh mục' : 'Categories'}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="all-categories" 
                    checked={selectedCategory === null}
                    onCheckedChange={() => setSelectedCategory(null)}
                  />
                  <Label htmlFor="all-categories" className="ml-2">
                    {language === 'vi' ? 'Tất cả' : 'All'}
                  </Label>
                </div>
                
                {categories?.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategory === category.id}
                      onCheckedChange={() => setSelectedCategory(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="ml-2">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-medium mb-4">
                {language === 'vi' ? 'Lọc theo giá' : 'Filter by Price'}
              </h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-6"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">
                  {language === 'vi' 
                    ? 'Đã có lỗi xảy ra khi tải sản phẩm.' 
                    : 'An error occurred while loading products.'}
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {renderSkeletons()}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {language === 'vi' 
                    ? 'Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.' 
                    : 'No products found matching your search criteria.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
