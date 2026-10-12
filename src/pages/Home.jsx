import Hero from '../sections/Hero'
import AboutPreview from '../sections/AboutPreview'
import FeaturedProperties from '../sections/FeaturedProperties'
import ServicesPreview from '../sections/ServicesPreview'
import WhyChoose from '../sections/WhyChoose'
import TeamPreview from '../sections/TeamPreview'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProperties />
      <ServicesPreview />
      <WhyChoose />
      <TeamPreview />
      <CTASection />
    </>
  )
}
