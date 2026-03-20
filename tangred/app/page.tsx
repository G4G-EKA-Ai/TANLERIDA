import { BrandStory } from '@/components/home/BrandStory'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { HeroSection } from '@/components/home/HeroSection'
import { TanLeidaTeaser } from '@/components/home/TanLeidaTeaser'
import { Testimonials } from '@/components/home/Testimonials'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <BrandStory />
      <TanLeidaTeaser />
      <Testimonials />
    </div>
  )
}
