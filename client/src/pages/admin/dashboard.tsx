import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import AdminLayout from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShoppingBag, Users, CreditCard, TrendingUp, Package, Archive } from 'lucide-react';

// Mock data for charts (in a real app, this would come from the API)
const salesData = [
  { name: 'T1', Doanh_thu: 4000 },
  { name: 'T2', Doanh_thu: 3000 },
  { name: 'T3', Doanh_thu: 5000 },
  { name: 'T4', Doanh_thu: 2780 },
  { name: 'T5', Doanh_thu: 1890 },
  { name: 'T6', Doanh_thu: 2390 },
  { name: 'T7', Doanh_thu: 3490 },
  { name: 'T8', Doanh_thu: 2000 },
  { name: 'T9', Doanh_thu: 2500 },
  { name: 'T10', Doanh_thu: 4500 },
  { name: 'T11', Doanh_thu: 4800 },
  { name: 'T12', Doanh_thu: 6000 },
];

const productCategoryData = [
  { name: 'Chăm sóc da', value: 45 },
  { name: 'Trang điểm', value: 30 },
  { name: 'Chăm sóc tóc', value: 15 },
  { name: 'Nước hoa', value: 8 },
  { name: 'Dụng cụ làm đẹp', value: 5 },
];

export default function Dashboard() {
  const { language } = useLanguage();
  
  // Fetch products for count
  const { data: products, isLoading: isLoadingProducts } = useQuery<any[]>({
    queryKey: ['/api/products']
  });
  
  // Fetch categories for count
  const { data: categories, isLoading: isLoadingCategories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  // Fetch blog posts for count
  const { data: blogPosts, isLoading: isLoadingBlogPosts } = useQuery<any[]>({
    queryKey: ['/api/blog-posts']
  });
  
  return (
    <AdminLayout title={language === 'vi' ? 'Tổng quan' : 'Dashboard'}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {language === 'vi' ? 'Tổng đơn hàng' : 'Total Orders'}
                  </p>
                  <h3 className="text-2xl font-bold">125</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-gray-500 ml-1">
                  {language === 'vi' ? 'so với tháng trước' : 'vs last month'}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {language === 'vi' ? 'Doanh thu' : 'Revenue'}
                  </p>
                  <h3 className="text-2xl font-bold">35.500.000₫</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8.2%</span>
                <span className="text-gray-500 ml-1">
                  {language === 'vi' ? 'so với tháng trước' : 'vs last month'}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Package className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {language === 'vi' ? 'Sản phẩm' : 'Products'}
                  </p>
                  {isLoadingProducts ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <h3 className="text-2xl font-bold">{products?.length || 0}</h3>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Archive className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-500">
                  {language === 'vi' ? 'Danh mục:' : 'Categories:'} {isLoadingCategories ? '...' : categories?.length || 0}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Users className="h-6 w-6 text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {language === 'vi' ? 'Khách hàng' : 'Customers'}
                  </p>
                  <h3 className="text-2xl font-bold">78</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">5.3%</span>
                <span className="text-gray-500 ml-1">
                  {language === 'vi' ? 'so với tháng trước' : 'vs last month'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="revenue">
          <TabsList className="mb-6">
            <TabsTrigger value="revenue">
              {language === 'vi' ? 'Doanh thu' : 'Revenue'}
            </TabsTrigger>
            <TabsTrigger value="categories">
              {language === 'vi' ? 'Danh mục' : 'Categories'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'vi' ? 'Doanh thu theo tháng' : 'Monthly Revenue'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value.toLocaleString('vi-VN')}₫`, language === 'vi' ? 'Doanh thu' : 'Revenue']}
                        labelFormatter={(label) => language === 'vi' ? `Tháng ${label.substring(1)}` : `Month ${label.substring(1)}`}
                      />
                      <Legend wrapperStyle={{ position: 'relative', marginTop: '10px' }} />
                      <Bar 
                        dataKey="Doanh_thu" 
                        name={language === 'vi' ? 'Doanh thu (VNĐ)' : 'Revenue (VND)'} 
                        fill="#FF6B81" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'vi' ? 'Đơn hàng gần đây' : 'Recent Orders'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">#ORD001</div>
                        <div className="text-sm text-gray-500">15/06/2023</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">Nguyễn Văn A</div>
                        <div className="text-sm font-medium text-primary">1.200.000₫</div>
                      </div>
                      <div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {language === 'vi' ? 'Đã thanh toán' : 'Paid'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">#ORD002</div>
                        <div className="text-sm text-gray-500">14/06/2023</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">Trần Thị B</div>
                        <div className="text-sm font-medium text-primary">850.000₫</div>
                      </div>
                      <div>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          {language === 'vi' ? 'Đang giao' : 'Shipping'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">#ORD003</div>
                        <div className="text-sm text-gray-500">13/06/2023</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">Phạm Văn C</div>
                        <div className="text-sm font-medium text-primary">2.350.000₫</div>
                      </div>
                      <div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {language === 'vi' ? 'Đã giao' : 'Delivered'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">#ORD004</div>
                        <div className="text-sm text-gray-500">12/06/2023</div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-sm">Lê Thị D</div>
                        <div className="text-sm font-medium text-primary">1.050.000₫</div>
                      </div>
                      <div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {language === 'vi' ? 'Đã giao' : 'Delivered'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'vi' ? 'Sản phẩm bán chạy' : 'Top Selling Products'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div className="flex-grow">
                        <div className="font-medium">Kem dưỡng ẩm cao cấp</div>
                        <div className="text-sm text-gray-500">32 {language === 'vi' ? 'đã bán' : 'sold'}</div>
                      </div>
                      <div className="text-primary font-medium">420.000₫</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div className="flex-grow">
                        <div className="font-medium">Son môi dưỡng ẩm VN Beauty</div>
                        <div className="text-sm text-gray-500">28 {language === 'vi' ? 'đã bán' : 'sold'}</div>
                      </div>
                      <div className="text-primary font-medium">255.000₫</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div className="flex-grow">
                        <div className="font-medium">Dầu gội thảo mộc dưỡng tóc</div>
                        <div className="text-sm text-gray-500">23 {language === 'vi' ? 'đã bán' : 'sold'}</div>
                      </div>
                      <div className="text-primary font-medium">180.000₫</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div className="flex-grow">
                        <div className="font-medium">Serum Vitamin C dưỡng trắng</div>
                        <div className="text-sm text-gray-500">19 {language === 'vi' ? 'đã bán' : 'sold'}</div>
                      </div>
                      <div className="text-primary font-medium">590.000₫</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'vi' ? 'Phân bố sản phẩm theo danh mục' : 'Product Distribution by Category'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={productCategoryData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 100,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        scale="band" 
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, language === 'vi' ? 'Tỷ lệ' : 'Percentage']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name={language === 'vi' ? 'Phần trăm (%)' : 'Percentage (%)'} 
                        fill="#9F7AEA" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Blog Stats */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'vi' ? 'Hoạt động blog gần đây' : 'Recent Blog Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-primary">
                  {isLoadingBlogPosts ? <Skeleton className="h-8 w-16 mx-auto" /> : blogPosts?.length || 0}
                </h3>
                <p className="text-gray-600 mt-2">
                  {language === 'vi' ? 'Tổng số bài viết' : 'Total Posts'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-primary">142</h3>
                <p className="text-gray-600 mt-2">
                  {language === 'vi' ? 'Tổng số bình luận' : 'Total Comments'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-primary">450</h3>
                <p className="text-gray-600 mt-2">
                  {language === 'vi' ? 'Lượt xem' : 'Views'}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-4">
                {language === 'vi' ? 'Bài viết phổ biến' : 'Popular Posts'}
              </h4>
              
              <div className="space-y-3">
                {isLoadingBlogPosts ? (
                  <>
                    <div className="flex justify-between p-2 border-b">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex justify-between p-2 border-b">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </>
                ) : (
                  blogPosts?.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex justify-between p-2 border-b">
                      <span className="font-medium">{post.title}</span>
                      <span className="text-gray-500 text-sm">56 {language === 'vi' ? 'lượt xem' : 'views'}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
