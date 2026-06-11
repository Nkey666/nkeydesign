import { Hero } from "@/components/site/hero";
import { Manifesto } from "@/components/site/manifesto";
import { Services } from "@/components/site/services";
import { Works } from "@/components/site/works";
import { PriceConfigurator } from "@/components/site/price-configurator";
import { Faq } from "@/components/site/faq";
import { AboutSpecialist } from "@/components/site/about-specialist";
import { FinalCta } from "@/components/site/final-cta";
import { Footer } from "@/components/site/footer";
import { buildJsonLd } from "@/lib/seo";

const jsonLd = buildJsonLd();

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <Services />
      <Works />
      <PriceConfigurator />
      <Faq />
      <AboutSpecialist />
      <FinalCta />
      <Footer />
    </main>
  );
}
