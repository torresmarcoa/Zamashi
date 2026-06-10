import { useOutletContext } from 'react-router';
import VideoHero from '../components/VideoHero';
import RestaurantSection from '../components/RestaurantSection';
import ReviewsSection from '../components/ReviewsSection';

interface OutletContext {
  language: 'es' | 'en';
}

export default function HomePage() {
  const { language } = useOutletContext<OutletContext>();

  return (
    <>
      <VideoHero language={language} />
      <RestaurantSection language={language} />
      <ReviewsSection language={language} />
    </>
  );
}
