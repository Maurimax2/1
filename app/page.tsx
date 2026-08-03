import { Hero } from '@/components/sections/Hero';
import { LogoCloud } from '@/components/sections/LogoCloud';
import { Stats } from '@/components/sections/Stats';
import { SummerSale } from '@/components/sections/SummerSale';
import { Plans } from '@/components/sections/Plans';
import { Devices } from '@/components/sections/Devices';
import { Categories } from '@/components/sections/Categories';
import { Why } from '@/components/sections/Why';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { GlowDivider } from '@/components/ui/Aurora';

export default function HomePage() {
  return (
    <>
      <span id="top" />
      <Hero />
      <LogoCloud />
      <Stats />
      <SummerSale />
      <Plans />
      <GlowDivider />
      <Devices />
      <Categories />
      <GlowDivider />
      <Why />
      <Testimonials />
      <FAQ />
    </>
  );
}
