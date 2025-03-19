import { useLanguage } from '@/lib/context';

export default function BrandsSection() {
  const { language } = useLanguage();
  
  // Brand logos would typically come from an API
  // Using simple SVG placeholders for demonstration
  const brands = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
    { id: 3, name: 'Brand 3' },
    { id: 4, name: 'Brand 4' },
    { id: 5, name: 'Brand 5' }
  ];
  
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl font-bold text-center mb-8">
          {language === 'vi' ? 'Thương hiệu uy tín' : 'Trusted Brands'}
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="grayscale hover:grayscale-0 transition duration-300 opacity-70 hover:opacity-100"
            >
              <div className="h-10 md:h-12 w-24 md:w-28 flex items-center justify-center border border-gray-200 rounded">
                <svg width="100%" height="100%" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f8f8f8"/>
                  <text 
                    x="50%" 
                    y="50%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fill="#666"
                    fontFamily="Arial"
                    fontSize="12"
                  >
                    {brand.name}
                  </text>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
