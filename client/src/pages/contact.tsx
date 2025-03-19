import { useState } from 'react';
import { useLanguage } from '@/lib/context';
import Layout from '@/components/layout/layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import NewsletterSection from '@/components/newsletter-section';

export default function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === 'vi' ? 'Thông tin thiếu' : 'Missing information',
        description: language === 'vi' 
          ? 'Vui lòng điền đầy đủ thông tin cần thiết' 
          : 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending form data
    setTimeout(() => {
      toast({
        title: language === 'vi' ? 'Gửi thành công' : 'Message sent',
        description: language === 'vi' 
          ? 'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi sớm nhất có thể.' 
          : 'Thank you for contacting us. We will respond as soon as possible.',
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-heading mb-2">
            {language === 'vi' ? 'Liên hệ' : 'Contact Us'}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary">
              {language === 'vi' ? 'Trang chủ' : 'Home'}
            </a>
            <span className="mx-2">/</span>
            <span>
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">
              {language === 'vi' ? 'Liên hệ với chúng tôi' : 'Get in Touch'}
            </h2>
            <p className="text-gray-600">
              {language === 'vi' 
                ? 'Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc góp ý nào.' 
                : 'We are always ready to listen and support you. Please contact us if you have any questions or suggestions.'}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3 bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-6">
                {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="font-medium">
                      {language === 'vi' ? 'Địa chỉ' : 'Address'}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="font-medium">
                      {language === 'vi' ? 'Điện thoại' : 'Phone'}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:19001234" className="hover:text-primary">1900 1234</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="font-medium">
                      {language === 'vi' ? 'Email' : 'Email'}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:info@myphamvn.com" className="hover:text-primary">info@myphamvn.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mt-1 mr-3 text-primary" />
                  <div>
                    <h4 className="font-medium">
                      {language === 'vi' ? 'Giờ làm việc' : 'Working Hours'}
                    </h4>
                    <p className="text-gray-600 mt-1">
                      {language === 'vi' ? 'Thứ 2 - Thứ 7: 8:00 - 20:00' : 'Monday - Saturday: 8:00 - 20:00'}
                      <br />
                      {language === 'vi' ? 'Chủ nhật: 10:00 - 18:00' : 'Sunday: 10:00 - 18:00'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">
                  {language === 'vi' ? 'Theo dõi chúng tôi' : 'Follow Us'}
                </h4>
                
                <div className="flex gap-2">
                  <a 
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
                    aria-label="TikTok"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="lucide">
                      <path d="M382.8 171.6c20.8 15.7 34.7 39.4 40.6 67.6 3.3 15.7 4.9 33.9 3.5 53.4-1.3 19.3-5.8 35.9-11.3 51-33.7 99-143.7 152.5-221.6 113.2-35.6-18-60.7-52.7-63.5-95.7-2.7-43.1 15.1-82.9 53-110.2 3.2-2.3 6.1 1 4.1 4.7-5.7 10.2-10.8 21.9-12.8 34.1-1.7 10.7-1.9 20-0.6 28.9.3 2.3 1.3 5.5 .9 7.6-.5 2.9-3.6 3.1-5.1 .7-0.9-1.4-1.7-3-2.4-4.7-5.1-12.7-7.1-29.1-6.5-47 .5-16 3.3-31.2 8.8-43.6 4.1-9.3 8.6-17.2 13.6-24.1 4.6-6.3 27-45.4 73.4-41.8 16.5 1.3 27.6 8.1 33 20.9 5.7 13.7 2.9 32.8-4.8 54.4-19.5 54.6-62.8 89.6-112.8 98.3-26.7 4.6-47.5 1-61.4-10.4-13.8-11.3-19.5-28.7-18.8-47.2 .5-14.4 5.8-27.1 16.5-35.8 9.5-7.7 21.3-11.2 34.3-11.2 30 0 54.3 22.6 60.3 48.5 .8 3.5 1.2 7.1 1.2 10.9 0 3.5-1.8 7.8-4.2 10.6-4.3 5-11.1 7.1-16.8 5.2-12.3-4-11.7-20.4-7.9-28.1 1.5-3.1 2.8-6.2 4.1-9.3 .7-1.7-1.6-8.1-5.5-9.1-3.8-1-9.1 1.7-12 4.3-12.4 11.1-15.7 41.2-11.1 59.9 1.4 5.8 3.9 10.8 7.1 14.8 6.9 8.7 18.9 12.2 32.6 9.6 24.2-4.6 45.7-20.5 60.2-44.2 9.6-15.6 15.1-32.6 16.8-51.8 .5-5.5 .6-10.5 .2-15.5-0.4-5.1-2.4-9.8-5.5-13.4-7.3-8.6-21.1-12.8-36.9-10.4-26.2 3.9-48.1 30.5-51.8 62.9-1.4 12.3-.3 23.7 3.2 33.5 .5 1.4 1.1 2.8 1.8 4.1 1.3 2.6-3.4 4.9-5.1 2.3-13.7-20.7-19.9-51.4-8.1-79.7 10.4-25 34.8-46.8 66.7-46.8 15.8 0 34 5.4 45.6 20.7 5.3 7 8.6 15.4 9.7 24.9 2.7 22.5-5.1 47.8-19.7 70.4-10.8 16.7-24.7 30.1-41.3 39.7-9.6 5.6-19.9 9.5-30.3 11.3-10.8 1.9-21.6 1.6-31.6-1.7-21.4-7.1-33.8-25-35.6-45-3.1-34.8 19.5-71.4 56.2-89.8 22.2-11.2 46.4-14.1 67.9-8.3 29.6 8 49.2 31.9 59.1 59.8 8.5 24 9.6 50 3.2 76.5-6.2 25.6-18.5 46.1-35.4 59.9-31.3 25.4-77.6 29.9-113.7 11.1-17.7-9.3-30.1-25.2-34.6-45-4.4-19.7-2-41.2 6.9-61.2 14.5-32.5 44.3-51.5 78.3-49.9 32.8 1.5 57.8 28.2 60.5 65.7 1 14.2-1.3 27.8-7 40.5-5.2 11.5-20.5 35.9-36.4 31.4-5.8-1.6-8.9-7.5-7.9-15.1 .5-3.8 2.4-8.5 4.9-14.2 4.9-11.3 12.4-26.9 9.7-41.9-2.3-12.8-11.9-21.4-26.1-21.4-15.9 0-28.8 12.3-34.1 29.6-4.6 15.1-3.4 31.2 3.2 41.8 9.5 15.3 28.9 22.2 52 16.2 50.7-13.2 94.6-48.1 115.4-114.2 18-57.4 3.2-118.1-37.1-148.3-45.1-33.9-127.3-5.9-146.3 65.4-5.4 20.2-4.3 38.6 3.1 55.2 1.4 3.2 3.2 6.1 5.3 8.8 4.1 5.3-2.3 12.1-7.5 9.1-5.8-3.4-10.5-8.2-14.3-14-24.2-36.7-26.1-96.3-3.5-133.4 2.9-4.8 6.3-9.2 10.1-13.3 0 0 109-124.2 212.8 1.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-6">
                {language === 'vi' ? 'Gửi tin nhắn cho chúng tôi' : 'Send Us a Message'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'vi' ? 'Họ và tên' : 'Full Name'} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={language === 'vi' ? 'Nhập họ và tên của bạn' : 'Enter your name'}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder={language === 'vi' ? 'Nhập email của bạn' : 'Enter your email'}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <Label htmlFor="subject">
                    {language === 'vi' ? 'Tiêu đề' : 'Subject'}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={language === 'vi' ? 'Nhập tiêu đề' : 'Enter subject'}
                  />
                </div>
                
                <div className="space-y-2 mb-6">
                  <Label htmlFor="message">
                    {language === 'vi' ? 'Tin nhắn' : 'Message'} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder={language === 'vi' ? 'Nhập tin nhắn của bạn' : 'Enter your message'}
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-full transition duration-300 flex items-center justify-center disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (language === 'vi' ? 'Đang gửi...' : 'Sending...') 
                    : (language === 'vi' ? 'Gửi tin nhắn' : 'Send Message')}
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-lg shadow-sm overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241520601884!2d106.70162651532035!3d10.777599892320798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xe4f9a7d91ded7bef!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1654567890123!5m2!1svi!2s" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </Layout>
  );
}
