import { useOutletContext } from 'react-router';
import LocationsSection from '../components/LocationsSection';

interface OutletContext {
  language: 'es' | 'en';
}

export default function LocationsPage() {
  const { language } = useOutletContext<OutletContext>();

  return (
    <div className="pt-16">
      <LocationsSection language={language} />
    </div>
  );
}
