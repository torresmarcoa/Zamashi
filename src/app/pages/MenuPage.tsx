import { useOutletContext } from 'react-router';
import MenuSection from '../components/MenuSection';

interface OutletContext {
  language: 'es' | 'en';
}

export default function MenuPage() {
  const { language } = useOutletContext<OutletContext>();

  return (
    <div className="pt-16">
      <MenuSection language={language} />
    </div>
  );
}
