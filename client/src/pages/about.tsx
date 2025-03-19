import { useLanguage } from '@/lib/context';
import Layout from '@/components/layout/layout';
import NewsletterSection from '@/components/newsletter-section';

export default function About() {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-2">
            {language === 'vi' ? 'Giới thiệu' : 'About Us'}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary">
              {language === 'vi' ? 'Trang chủ' : 'Home'}
            </a>
            <span className="mx-2">/</span>
            <span>
              {language === 'vi' ? 'Giới thiệu' : 'About Us'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold font-heading mb-6">
                {language === 'vi' 
                  ? 'Chào mừng đến với Mỹ Phẩm VN' 
                  : 'Welcome to My Pham VN'}
              </h2>
              
              <div className="prose max-w-none">
                <p>
                  {language === 'vi' 
                    ? 'Thành lập vào năm 2020, Mỹ Phẩm VN đã nhanh chóng trở thành điểm đến uy tín cho những người yêu thích làm đẹp tại Việt Nam. Chúng tôi tự hào mang đến bộ sưu tập đa dạng các sản phẩm mỹ phẩm chất lượng cao, từ chăm sóc da, trang điểm đến chăm sóc tóc và nước hoa.'
                    : 'Founded in 2020, My Pham VN has quickly become a trusted destination for beauty enthusiasts in Vietnam. We are proud to offer a diverse collection of high-quality cosmetic products, from skincare and makeup to hair care and fragrances.'}
                </p>
                
                <p>
                  {language === 'vi' 
                    ? 'Với sứ mệnh giúp mọi người khám phá và tôn vinh vẻ đẹp tự nhiên của mình, chúng tôi không ngừng tìm kiếm những sản phẩm tốt nhất từ các thương hiệu uy tín trong nước và quốc tế. Chúng tôi tin rằng mỗi người đều có quyền tiếp cận với những sản phẩm làm đẹp an toàn, hiệu quả và phù hợp với làn da Á Đông.'
                    : 'With a mission to help everyone discover and celebrate their natural beauty, we constantly search for the best products from reputable domestic and international brands. We believe that everyone has the right to access safe, effective beauty products that are suitable for Asian skin.'}
                </p>
                
                <h3 className="text-xl font-bold mt-6">
                  {language === 'vi' ? 'Giá trị cốt lõi của chúng tôi' : 'Our Core Values'}
                </h3>
                
                <ul>
                  <li>
                    <strong>{language === 'vi' ? 'Chất lượng:' : 'Quality:'}</strong> {language === 'vi' 
                      ? 'Chúng tôi cam kết chỉ cung cấp những sản phẩm chính hãng với chất lượng đảm bảo.' 
                      : 'We are committed to providing only genuine products with guaranteed quality.'}
                  </li>
                  <li>
                    <strong>{language === 'vi' ? 'Đa dạng:' : 'Diversity:'}</strong> {language === 'vi' 
                      ? 'Chúng tôi mang đến nhiều lựa chọn để đáp ứng nhu cầu đa dạng của khách hàng.' 
                      : 'We offer many choices to meet the diverse needs of our customers.'}
                  </li>
                  <li>
                    <strong>{language === 'vi' ? 'Trung thực:' : 'Honesty:'}</strong> {language === 'vi' 
                      ? 'Chúng tôi luôn minh bạch về thông tin sản phẩm và chính sách kinh doanh.' 
                      : 'We are always transparent about product information and business policies.'}
                  </li>
                  <li>
                    <strong>{language === 'vi' ? 'Tận tâm:' : 'Dedication:'}</strong> {language === 'vi' 
                      ? 'Chúng tôi nỗ lực mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.' 
                      : 'We strive to provide the best shopping experience for our customers.'}
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt={language === 'vi' ? 'Đội ngũ Mỹ Phẩm VN' : 'My Pham VN Team'} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <h2 className="text-2xl font-bold font-heading text-center mb-12">
              {language === 'vi' ? 'Tại sao chọn chúng tôi' : 'Why Choose Us'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.7 4.3a1 1 0 0 0-1.4 0L12 10.6 5.7 4.3a1 1 0 0 0-1.4 1.4l6.3 6.3-6.3 6.3a1 1 0 0 0 1.4 1.4l6.3-6.3 6.3 6.3a1 1 0 0 0 1.4-1.4L13.4 12l6.3-6.3a1 1 0 0 0 0-1.4z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {language === 'vi' ? 'Sản phẩm Chính Hãng' : 'Authentic Products'}
                </h3>
                <p className="text-gray-600">
                  {language === 'vi' 
                    ? 'Chúng tôi cam kết 100% sản phẩm chính hãng, an toàn cho sức khỏe người tiêu dùng.' 
                    : 'We commit to 100% authentic products that are safe for consumers\' health.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {language === 'vi' ? 'Tư Vấn Chuyên Nghiệp' : 'Professional Consultation'}
                </h3>
                <p className="text-gray-600">
                  {language === 'vi' 
                    ? 'Đội ngũ tư vấn viên giàu kinh nghiệm, giúp bạn lựa chọn sản phẩm phù hợp nhất.' 
                    : 'Our experienced consultants help you choose the most suitable products.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {language === 'vi' ? 'Giao Hàng Nhanh Chóng' : 'Fast Delivery'}
                </h3>
                <p className="text-gray-600">
                  {language === 'vi' 
                    ? 'Đơn hàng được xử lý và giao đến tận tay bạn trong thời gian ngắn nhất.' 
                    : 'Orders are processed and delivered to you in the shortest time possible.'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">
              {language === 'vi' ? 'Đội Ngũ Của Chúng Tôi' : 'Our Team'}
            </h2>
            
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              {language === 'vi' 
                ? 'Đội ngũ chuyên nghiệp của Mỹ Phẩm VN gồm những chuyên gia đam mê và giàu kinh nghiệm trong lĩnh vực làm đẹp, luôn sẵn sàng hỗ trợ và tư vấn cho khách hàng.' 
                : 'The professional team of My Pham VN consists of passionate and experienced experts in the beauty field, always ready to support and advise customers.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                  </svg>
                </div>
                <h3 className="font-bold">Nguyễn Thị Hương</h3>
                <p className="text-gray-500">{language === 'vi' ? 'Nhà sáng lập' : 'Founder'}</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                  </svg>
                </div>
                <h3 className="font-bold">Trần Văn Minh</h3>
                <p className="text-gray-500">{language === 'vi' ? 'Giám đốc điều hành' : 'CEO'}</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                  </svg>
                </div>
                <h3 className="font-bold">Phạm Thu Thảo</h3>
                <p className="text-gray-500">{language === 'vi' ? 'Chuyên gia làm đẹp' : 'Beauty Expert'}</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                  </svg>
                </div>
                <h3 className="font-bold">Lê Quang Dũng</h3>
                <p className="text-gray-500">{language === 'vi' ? 'Quản lý sản phẩm' : 'Product Manager'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </Layout>
  );
}
