import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../components/home/Hero.jsx';
import Perks from '../components/home/Perks.jsx';
import FeaturedMenu from '../components/home/FeaturedMenu.jsx';
import History from '../components/home/History.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import ReservationSection from '../components/home/ReservationSection.jsx';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Perks />
        <FeaturedMenu />
        <History />
        <TestimonialsSection />
        <ReservationSection />
      </main>
      <Footer />
    </>
  );
}
