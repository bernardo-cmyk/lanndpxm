import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Story from "@/components/Story";
import Collections from "@/components/Collections";
import ProductGrid from "@/components/ProductGrid";
import CoastGallery from "@/components/CoastGallery";
import LandscapingSection from "@/components/LandscapingSection";
import CustomOrders from "@/components/CustomOrders";
import ShippingFAQ from "@/components/ShippingFAQ";
import InstagramStrip from "@/components/InstagramStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Story />
        <Collections />
        <ProductGrid />
        <CoastGallery />
        <LandscapingSection />
        <CustomOrders />
        <ShippingFAQ />
        <InstagramStrip />
      </main>
      <Footer />
    </>
  );
}
