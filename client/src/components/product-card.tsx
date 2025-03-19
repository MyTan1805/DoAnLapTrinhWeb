import { Link } from "wouter";
import { useLanguage, useCart } from "@/lib/context";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ProductCardProps = {
  id: number;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  imageUrl: string;
  categoryName: string;
  isNew?: boolean;
  featured?: boolean;
  rating: number;
  numReviews: number;
};

export default function ProductCard({
  id,
  name,
  slug,
  price,
  salePrice,
  imageUrl,
  categoryName,
  isNew = false,
  featured = false,
  rating,
  numReviews
}: ProductCardProps) {
  const { language } = useLanguage();
  const { addToCart, cart } = useCart();
  const { toast } = useToast();
  
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
  
  const formattedSalePrice = salePrice 
    ? new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
      }).format(salePrice)
    : null;

  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(id, 1);
      toast({
        title: language === 'vi' ? 'Đã thêm vào giỏ hàng' : 'Added to cart',
        description: name,
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
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 group">
      <div className="relative">
        <Link href={`/product/${slug}`} className="block">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </Link>
        {(isNew || discount > 0 || featured) && (
          <div className="absolute top-2 left-2">
            {isNew && (
              <span className="bg-accent text-white text-xs font-medium py-1 px-2 rounded-full block mb-2">
                {language === 'vi' ? 'Mới' : 'New'}
              </span>
            )}
            
            {discount > 0 && (
              <span className="bg-primary text-white text-xs font-medium py-1 px-2 rounded-full block mb-2">
                -{discount}%
              </span>
            )}
            
            {featured && !isNew && discount === 0 && (
              <span className="bg-secondary text-white text-xs font-medium py-1 px-2 rounded-full block mb-2">
                {language === 'vi' ? 'Bán chạy' : 'Featured'}
              </span>
            )}
          </div>
        )}
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-primary hover:text-white transition duration-300">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-yellow-400 mb-2">
          {[...Array(5)].map((_, index) => {
            if (index < Math.floor(rating)) {
              return <Star key={index} fill="currentColor" className="h-4 w-4" />;
            } else if (index < Math.ceil(rating) && !Number.isInteger(rating)) {
              return (
                <div key={index} className="relative">
                  <Star className="h-4 w-4" />
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 absolute top-0 left-0"
                    style={{ clipPath: `inset(0 ${100 - ((rating - Math.floor(rating)) * 100)}% 0 0)` }}
                  />
                </div>
              );
            } else {
              return <Star key={index} className="h-4 w-4" />;
            }
          })}
          <span className="text-gray-500 text-sm ml-1">({numReviews})</span>
        </div>
        
        <h3 className="font-heading font-medium mb-1 group-hover:text-primary transition duration-300">
          <Link href={`/product/${slug}`}>{name}</Link>
        </h3>
        <p className="text-gray-500 text-sm mb-2">{categoryName}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className={cn("font-semibold", salePrice ? "text-primary" : "")}>
              {salePrice ? formattedSalePrice : formattedPrice}
            </span>
            {salePrice && (
              <span className="text-gray-400 text-sm line-through ml-2">{formattedPrice}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-neutral-200 hover:bg-primary hover:text-white rounded-full p-2 transition duration-300"
            disabled={cart.loading}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
