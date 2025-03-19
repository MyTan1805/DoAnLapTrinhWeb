import Layout from '@/components/layout/layout';
import HeroSection from '@/components/hero-section';
import CategorySection from '@/components/category-section';
import FeaturedProductsSection from '@/components/featured-products-section';
import SpecialOffersSection from '@/components/special-offers-section';
import BlogSection from '@/components/blog-section';
import BrandsSection from '@/components/brands-section';
import NewsletterSection from '@/components/newsletter-section';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <SpecialOffersSection />
      <BlogSection />
      <BrandsSection />
      <NewsletterSection />
    </Layout>
  );
}
