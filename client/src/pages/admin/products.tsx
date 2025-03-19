import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '@/lib/context';
import AdminLayout from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Pencil, 
  Trash2, 
  Plus, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Search 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { apiRequest } from '@/lib/queryClient';
import { Skeleton } from '@/components/ui/skeleton';

export default function Products() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  
  const itemsPerPage = 10;
  
  // Fetch products
  const { data: products, isLoading } = useQuery<any[]>({
    queryKey: ['/api/products']
  });
  
  // Fetch categories
  const { data: categories } = useQuery<any[]>({
    queryKey: ['/api/categories']
  });
  
  // Filter products based on search term
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Paginate products
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = filteredProducts ? Math.ceil(filteredProducts.length / itemsPerPage) : 0;
  
  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    return categories?.find(cat => cat.id === categoryId)?.name || '';
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Open delete dialog
  const openDeleteDialog = (productId: number) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };
  
  // Close delete dialog
  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setProductToDelete(null);
  };
  
  // Delete product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setIsDeletingProduct(true);
    
    try {
      await apiRequest('DELETE', `/api/products/${productToDelete}`);
      
      // Invalidate products query to refetch the updated list
      await queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      
      toast({
        title: language === 'vi' ? 'Xóa thành công' : 'Successfully deleted',
        description: language === 'vi' 
          ? 'Sản phẩm đã được xóa thành công.' 
          : 'The product has been successfully deleted.',
      });
      
      closeDeleteDialog();
    } catch (error) {
      toast({
        title: language === 'vi' ? 'Lỗi' : 'Error',
        description: language === 'vi' 
          ? 'Đã xảy ra lỗi khi xóa sản phẩm.' 
          : 'An error occurred while deleting the product.',
        variant: 'destructive'
      });
    } finally {
      setIsDeletingProduct(false);
    }
  };
  
  return (
    <AdminLayout title={language === 'vi' ? 'Quản lý sản phẩm' : 'Product Management'}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Input
              placeholder={language === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <Link href="/admin/products/add">
            <Button className="bg-primary hover:bg-primary-dark">
              <Plus className="mr-2 h-4 w-4" />
              {language === 'vi' ? 'Thêm sản phẩm' : 'Add Product'}
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-4">
              <div className="space-y-4">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">{language === 'vi' ? 'ID' : 'ID'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Hình ảnh' : 'Image'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Tên sản phẩm' : 'Product Name'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Danh mục' : 'Category'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Giá' : 'Price'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Còn hàng' : 'Stock'}</TableHead>
                  <TableHead>{language === 'vi' ? 'Trạng thái' : 'Status'}</TableHead>
                  <TableHead className="text-right">{language === 'vi' ? 'Thao tác' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                      {language === 'vi' 
                        ? 'Không tìm thấy sản phẩm nào' 
                        : 'No products found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                      <TableCell>
                        {product.salePrice ? (
                          <div>
                            <span className="text-primary font-medium">
                              {formatPrice(product.salePrice)}
                            </span>
                            <span className="text-gray-400 text-sm line-through ml-2">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        ) : (
                          formatPrice(product.price)
                        )}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        {product.featured && (
                          <Badge className="mr-1 bg-secondary">
                            {language === 'vi' ? 'Nổi bật' : 'Featured'}
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-accent">
                            {language === 'vi' ? 'Mới' : 'New'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/product/${product.slug}`} target="_blank">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>
                                  {language === 'vi' ? 'Xem' : 'View'}
                                </span>
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>
                                  {language === 'vi' ? 'Sửa' : 'Edit'}
                                </span>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem 
                              className="text-red-600" 
                              onClick={() => openDeleteDialog(product.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>
                                {language === 'vi' ? 'Xóa' : 'Delete'}
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-gray-500">
                {language === 'vi' 
                  ? `Hiển thị ${(currentPage - 1) * itemsPerPage + 1} đến ${Math.min(currentPage * itemsPerPage, filteredProducts?.length || 0)} trong số ${filteredProducts?.length} sản phẩm`
                  : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredProducts?.length || 0)} of ${filteredProducts?.length} products`}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index + 1}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'vi' ? 'Xác nhận xóa' : 'Confirm Deletion'}
            </DialogTitle>
            <DialogDescription>
              {language === 'vi' 
                ? 'Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.'
                : 'Are you sure you want to delete this product? This action cannot be undone.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog} disabled={isDeletingProduct}>
              {language === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
              disabled={isDeletingProduct}
            >
              {isDeletingProduct 
                ? (language === 'vi' ? 'Đang xóa...' : 'Deleting...') 
                : (language === 'vi' ? 'Xóa' : 'Delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
