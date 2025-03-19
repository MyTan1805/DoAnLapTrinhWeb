import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import AdminLayout from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function EditProduct({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  const { language } = useLanguage();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch product details
  const { data: product, isLoading: isLoadingProduct, error: productError } = useQuery<any>({
    queryKey: [`/api/products/${productId}`],
    enabled: !isNaN(productId)
  });
  
  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  // Define form schema
  const formSchema = z.object({
    name: z.string().min(1, {
      message: language === 'vi' 
        ? 'Tên sản phẩm không được bỏ trống' 
        : 'Product name cannot be empty',
    }),
    slug: z.string().min(1, {
      message: language === 'vi' 
        ? 'Slug không được bỏ trống' 
        : 'Slug cannot be empty',
    }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: language === 'vi'
        ? 'Slug chỉ chứa chữ thường, số và dấu gạch ngang'
        : 'Slug should contain only lowercase letters, numbers, and hyphens',
    }),
    description: z.string().min(1, {
      message: language === 'vi' 
        ? 'Mô tả không được bỏ trống' 
        : 'Description cannot be empty',
    }),
    price: z.coerce.number().min(0, {
      message: language === 'vi' 
        ? 'Giá không được âm' 
        : 'Price cannot be negative',
    }),
    salePrice: z.coerce.number().min(0, {
      message: language === 'vi' 
        ? 'Giá khuyến mãi không được âm' 
        : 'Sale price cannot be negative',
    }).optional().nullable(),
    imageUrl: z.string().min(1, {
      message: language === 'vi' 
        ? 'URL hình ảnh không được bỏ trống' 
        : 'Image URL cannot be empty',
    }),
    categoryId: z.coerce.number(),
    stock: z.coerce.number().int().min(0, {
      message: language === 'vi' 
        ? 'Số lượng không được âm' 
        : 'Stock cannot be negative',
    }),
    featured: z.boolean().default(false),
    isNew: z.boolean().default(false),
    rating: z.coerce.number().min(0).max(5).default(0),
    numReviews: z.coerce.number().int().min(0).default(0),
  });
  
  type FormValues = z.infer<typeof formSchema>;
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: 0,
      salePrice: null,
      imageUrl: '',
      categoryId: 1, // Default to first category
      stock: 0,
      featured: false,
      isNew: false,
      rating: 0,
      numReviews: 0,
    },
  });
  
  // Generate slug from product name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Handle name change to auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue('name', name);
    
    // Only auto-generate slug if user hasn't manually edited it yet
    // or if slug is still the same as the previous auto-generated one
    if (
      !form.getValues('slug') || 
      form.getValues('slug') === generateSlug(form.getValues('name'))
    ) {
      form.setValue('slug', generateSlug(name));
    }
  };
  
  // Handle image URL change to update preview
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue('imageUrl', url);
    setImagePreview(url);
  };
  
  // Update form with product data once loaded
  useEffect(() => {
    if (product && !isLoadingProduct) {
      form.reset({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        stock: product.stock,
        featured: product.featured,
        isNew: product.isNew,
        rating: product.rating,
        numReviews: product.numReviews,
      });
      
      setImagePreview(product.imageUrl);
      setIsLoading(false);
    }
  }, [product, isLoadingProduct, form]);
  
  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await apiRequest('PUT', `/api/products/${productId}`, values);
      
      // Invalidate products query to refetch the updated list
      await queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      await queryClient.invalidateQueries({ queryKey: [`/api/products/${productId}`] });
      
      toast({
        title: language === 'vi' ? 'Cập nhật thành công' : 'Product Updated',
        description: language === 'vi' 
          ? 'Sản phẩm đã được cập nhật thành công.' 
          : 'The product has been successfully updated.',
      });
      
      // Navigate back to products list
      navigate('/admin/products');
    } catch (error) {
      toast({
        title: language === 'vi' ? 'Lỗi' : 'Error',
        description: language === 'vi' 
          ? 'Đã xảy ra lỗi khi cập nhật sản phẩm.' 
          : 'An error occurred while updating the product.',
        variant: 'destructive'
      });
    }
  };
  
  // If there's an error loading the product
  if (productError) {
    return (
      <AdminLayout title={language === 'vi' ? 'Lỗi' : 'Error'}>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-lg font-medium text-red-600 mb-2">
            {language === 'vi' 
              ? 'Không thể tải thông tin sản phẩm' 
              : 'Failed to load product information'}
          </h2>
          <p className="text-gray-500 mb-4">
            {language === 'vi' 
              ? 'Có lỗi xảy ra khi tải thông tin sản phẩm. Vui lòng thử lại sau.' 
              : 'There was an error loading the product information. Please try again later.'}
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/products')}
          >
            {language === 'vi' ? 'Quay lại danh sách' : 'Back to List'}
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout title={language === 'vi' ? 'Chỉnh sửa sản phẩm' : 'Edit Product'}>
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/products')}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'vi' ? 'Quay lại danh sách' : 'Back to List'}
        </Button>
      </div>
      
      {isLoading || isLoadingProduct ? (
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-gray-600">
              {language === 'vi' ? 'Đang tải thông tin sản phẩm...' : 'Loading product information...'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'vi' ? 'Tên sản phẩm' : 'Product Name'} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={handleNameChange}
                            placeholder={language === 'vi' ? 'Nhập tên sản phẩm' : 'Enter product name'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={language === 'vi' ? 'nhap-ten-san-pham' : 'enter-product-name'}
                          />
                        </FormControl>
                        <FormDescription>
                          {language === 'vi' 
                            ? 'URL-friendly tên sản phẩm' 
                            : 'URL-friendly product name'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'vi' ? 'Danh mục' : 'Category'} *
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue 
                                placeholder={
                                  language === 'vi' 
                                    ? 'Chọn danh mục' 
                                    : 'Select category'
                                } 
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingCategories ? (
                              <div className="p-2 text-center">
                                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                <span className="text-sm text-gray-500 mt-1">
                                  {language === 'vi' ? 'Đang tải...' : 'Loading...'}
                                </span>
                              </div>
                            ) : (
                              categories?.map((category) => (
                                <SelectItem 
                                  key={category.id} 
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'vi' ? 'Giá' : 'Price'} *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              min={0}
                              step={1000}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'vi' ? 'Giá khuyến mãi' : 'Sale Price'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              min={0}
                              step={1000}
                              value={field.value === null ? '' : field.value}
                              onChange={e => {
                                const value = e.target.value === '' ? null : Number(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            {language === 'vi' 
                              ? 'Để trống nếu không có khuyến mãi' 
                              : 'Leave empty if not on sale'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'vi' ? 'Số lượng tồn kho' : 'Stock'} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              {language === 'vi' ? 'Sản phẩm nổi bật' : 'Featured Product'}
                            </FormLabel>
                            <FormDescription>
                              {language === 'vi' 
                                ? 'Hiển thị trên trang chủ' 
                                : 'Show on homepage'}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isNew"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              {language === 'vi' ? 'Sản phẩm mới' : 'New Product'}
                            </FormLabel>
                            <FormDescription>
                              {language === 'vi' 
                                ? 'Đánh dấu là sản phẩm mới' 
                                : 'Mark as new product'}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'vi' ? 'Mô tả' : 'Description'} *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            placeholder={language === 'vi' 
                              ? 'Nhập mô tả sản phẩm chi tiết' 
                              : 'Enter detailed product description'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === 'vi' ? 'URL Hình ảnh' : 'Image URL'} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={handleImageUrlChange}
                            placeholder={language === 'vi' 
                              ? 'Nhập URL hình ảnh' 
                              : 'Enter image URL'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {imagePreview && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">
                        {language === 'vi' ? 'Xem trước hình ảnh' : 'Image Preview'}
                      </p>
                      <div className="border rounded-lg overflow-hidden w-full h-48">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                          onError={() => setImagePreview(null)}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'vi' ? 'Đánh giá' : 'Rating'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              min={0}
                              max={5}
                              step={0.1}
                            />
                          </FormControl>
                          <FormDescription>
                            {language === 'vi' 
                              ? 'Đánh giá từ 0-5 sao' 
                              : 'Rating from 0-5 stars'}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="numReviews"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'vi' ? 'Số lượng đánh giá' : 'Number of Reviews'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/products')}
                  className="mr-2"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'vi' ? 'Đang lưu...' : 'Saving...'}
                    </>
                  ) : (
                    language === 'vi' ? 'Cập nhật sản phẩm' : 'Update Product'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </AdminLayout>
  );
}
