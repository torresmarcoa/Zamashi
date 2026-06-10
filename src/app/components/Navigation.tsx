import { Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface NavigationProps {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
}

const translations = {
  es: {
    home: 'Inicio',
    menu: 'Menú',
    locations: 'Ubicaciones',
  },
  en: {
    home: 'Home',
    menu: 'Menu',
    locations: 'Locations',
  },
};

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const t = translations[language];
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-bold text-neutral-900 cursor-pointer hover:text-neutral-700 transition-colors">
                ZAMASHI
              </h1>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive('/')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {t.home}
              </Link>
              <Link
                to="/menu"
                className={`transition-colors ${
                  isActive('/menu')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {t.menu}
              </Link>
              <Link
                to="/locations"
                className={`transition-colors ${
                  isActive('/locations')
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {t.locations}
              </Link>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{language === 'es' ? 'EN' : 'ES'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
