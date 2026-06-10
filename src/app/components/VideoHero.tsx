import { Link } from 'react-router';

interface VideoHeroProps {
  language: 'es' | 'en';
}

const translations = {
  es: {
    title: 'Experiencia Gastronómica Excepcional',
    subtitle: 'Descubre la fusión perfecta entre tradición japonesa e italiana',
  },
  en: {
    title: 'Exceptional Dining Experience',
    subtitle: 'Discover the perfect fusion of Japanese and Italian tradition',
  },
};

export default function VideoHero({ language }: VideoHeroProps) {
  const t = translations[language];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1737138472957-fbafdf3eafe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzgwNjMwMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Restaurant ambiance"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="px-8 py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors text-center"
            >
              {language === 'es' ? 'Ver Menú' : 'View Menu'}
            </Link>
            <Link
              to="/locations"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              {language === 'es' ? 'Ubicaciones' : 'Locations'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
