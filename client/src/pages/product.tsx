import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage, useCart } from '@/lib/context';
import Layout from '@/components/layout/layout';
import FeaturedProductsSection from '@/components/featured-products-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, ShoppingBag, Minus, Plus, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const { cart, addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product details
  const { data: product, isLoading: isLoadingProduct, error: productError } = useQuery<any>({
    queryKey: [`/api/products/${params.slug}`]
  });
  
  // Fetch categories for category name
  const { data: categories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity);
      toast({
        title: language === 'vi' ? 'Đã thêm vào giỏ hàng' : 'Added to cart',
        description: product.name,
      });
    } catch (error) {
      toast({
        title: language === 'vi' ? 'Lỗi' : 'Error',
        description: language === 'vi' 
          ? 'Không thể thêm sản phẩm vào giỏ hàng' 
          : 'Could not add product to cart',
        variant: 'destructive'
      });
    }
  };
  
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (productError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {language === 'vi' ? 'Sản phẩm không tồn tại' : 'Product not found'}
          </h1>
          <p className="mb-8">
            {language === 'vi' 
              ? 'Không thể tìm thấy sản phẩm bạn đang tìm kiếm.'
              : 'We could not find the product you were looking for.'}
          </p>
          <a 
            href="/shop" 
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            {language === 'vi' ? 'Quay lại cửa hàng' : 'Back to shop'}
          </a>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {isLoadingProduct ? (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="pt-4">
                <Skeleton className="h-10 w-1/3" />
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="space-y-4 pt-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        ) : (
          product && (
            <>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h1 className="text-3xl font-bold font-heading mb-2">{product.name}</h1>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400 mr-3">
                      {[...Array(5)].map((_, index) => {
                        if (index < Math.floor(product.rating)) {
                          return <Star key={index} fill="currentColor" className="h-5 w-5" />;
                        } else if (index < Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                          return (
                            <div key={index} className="relative">
                              <Star className="h-5 w-5" />
                              <Star
                                fill="currentColor"
                                className="h-5 w-5 absolute top-0 left-0"
                                style={{ clipPath: `inset(0 ${100 - ((product.rating - Math.floor(product.rating)) * 100)}% 0 0)` }}
                              />
                            </div>
                          );
                        } else {
                          return <Star key={index} className="h-5 w-5" />;
                        }
                      })}
                      <span className="text-gray-500 ml-1">({product.numReviews})</span>
                    </div>
                    
                    <span className="text-gray-500">
                      {language === 'vi' ? 'Danh mục:' : 'Category:'} {getCategoryName(product.categoryId)}
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    {product.salePrice ? (
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary mr-3">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="ml-3 bg-primary text-white text-sm py-1 px-2 rounded-full">
                          -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  
                  <div className="prose prose-gray mb-6">
                    <p>{product.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="border rounded-md flex items-center h-12 mr-4">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-full flex items-center justify-center text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {language === 'vi' ? 'Còn hàng:' : 'In stock:'} {product.stock}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={handleAddToCart}
                        disabled={cart.loading || product.stock === 0}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center disabled:opacity-70"
                      >
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        {cart.loading 
                          ? (language === 'vi' ? 'Đang thêm...' : 'Adding...') 
                          : (language === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to Cart')}
                      </button>
                      
                      <button className="sm:w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-300">
                        <Heart className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="border-b w-full justify-start rounded-none bg-transparent mb-6">
                    <TabsTrigger 
                      value="description" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2"
                    >
                      {language === 'vi' ? 'Mô tả' : 'Description'}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reviews" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2"
                    >
                      {language === 'vi' ? 'Đánh giá' : 'Reviews'} ({product.numReviews})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-0">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-bold mb-4">
                        {language === 'vi' ? 'Chi tiết sản phẩm' : 'Product Details'}
                      </h3>
                      <p>{product.description}</p>
                      <p>
                        {language === 'vi' 
                          ? 'Ngoài việc làm sạch, sản phẩm này còn giúp loại bỏ tạp chất, làm thông thoáng lỗ chân lông và cung cấp các dưỡng chất thiết yếu cho làn da của bạn. Sử dụng đều đặn để có kết quả tốt nhất.'
                          : 'In addition to cleansing, this product helps remove impurities, unclog pores, and provide essential nutrients to your skin. Use regularly for best results.'}
                      </p>
                      <h4 className="text-lg font-semibold mt-4 mb-2">
                        {language === 'vi' ? 'Hướng dẫn sử dụng' : 'How to Use'}
                      </h4>
                      <ul>
                        <li>
                          {language === 'vi' 
                            ? 'Thoa đều lên da mặt đã được làm sạch.'
                            : 'Apply evenly to cleansed face.'}
                        </li>
                        <li>
                          {language === 'vi' 
                            ? 'Massage nhẹ nhàng theo chuyển động tròn.'
                            : 'Gently massage in circular motions.'}
                        </li>
                        <li>
                          {language === 'vi' 
                            ? 'Rửa sạch với nước ấm.'
                            : 'Rinse thoroughly with warm water.'}
                        </li>
                        <li>
                          {language === 'vi' 
                            ? 'Sử dụng 1-2 lần mỗi ngày để có kết quả tốt nhất.'
                            : 'Use 1-2 times daily for best results.'}
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-0">
                    <div className="space-y-6">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <div className="text-3xl font-bold">{product.rating.toFixed(1)}/5</div>
                          <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, index) => (
                              <Star 
                                key={index} 
                                className="h-5 w-5" 
                                fill={index < Math.floor(product.rating) ? "currentColor" : "none"} 
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {product.numReviews} {language === 'vi' ? 'đánh giá' : 'reviews'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <div className="text-center py-8 text-gray-500">
                          {language === 'vi' 
                            ? 'Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!'
                            : 'There are no reviews for this product yet. Be the first to review!'}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )
        )}
      </div>
      
      <div className="mt-16">
        <FeaturedProductsSection />
      </div>
    </Layout>
  );
}
