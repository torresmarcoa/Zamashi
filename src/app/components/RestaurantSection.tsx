import { MessageCircle } from 'lucide-react';

interface RestaurantSectionProps {
  language: 'es' | 'en';
}

const translations = {
  es: {
    title: 'Nuestros Restaurantes',
    zamashi: {
      name: 'Zamashi',
      subtitle: 'Cocina Japonesa Auténtica',
      description:
        'Experimenta la esencia de la cocina japonesa con nuestros platos cuidadosamente elaborados. Desde sushi fresco hasta ramen tradicional, cada bocado es una celebración de sabores auténticos.',
      reserve: 'Reservar por WhatsApp',
    },
    kazamashi: {
      name: 'Kazamashi',
      subtitle: 'Cocina Italiana Contemporánea',
      description:
        'Descubre nuestra nueva propuesta italiana con pastas artesanales y recetas tradicionales. Próximamente abriremos para desayunos, ofreciendo la mejor experiencia matutina.',
      reserve: 'Reservar por WhatsApp',
      comingSoon: 'Próximos desayunos',
    },
  },
  en: {
    title: 'Our Restaurants',
    zamashi: {
      name: 'Zamashi',
      subtitle: 'Authentic Japanese Cuisine',
      description:
        'Experience the essence of Japanese cuisine with our carefully crafted dishes. From fresh sushi to traditional ramen, every bite is a celebration of authentic flavors.',
      reserve: 'Reserve via WhatsApp',
    },
    kazamashi: {
      name: 'Kazamashi',
      subtitle: 'Contemporary Italian Cuisine',
      description:
        'Discover our new Italian proposal with artisan pasta and traditional recipes. Coming soon for breakfast, offering the best morning experience.',
      reserve: 'Reserve via WhatsApp',
      comingSoon: 'Breakfast Coming Soon',
    },
  },
};

export default function RestaurantSection({ language }: RestaurantSectionProps) {
  const t = translations[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Zamashi */}
          <div className="group">
            <div className="relative h-96 mb-6 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1737138472957-fbafdf3eafe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzgwNjMwMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Zamashi Restaurant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-2">
              {t.zamashi.name}
            </h3>
            <p className="text-lg text-neutral-600 mb-4">{t.zamashi.subtitle}</p>
            <p className="text-neutral-700 mb-6">{t.zamashi.description}</p>
            <a
              href="https://wa.me/1234567890?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20Zamashi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.zamashi.reserve}</span>
            </a>
          </div>

          {/* Kazamashi */}
          <div className="group">
            <div className="relative h-96 mb-6 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1662197480393-2a82030b7b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc4MDQ2NjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Kazamashi Restaurant"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full">
                {t.kazamashi.comingSoon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900 mb-2">
              {t.kazamashi.name}
            </h3>
            <p className="text-lg text-neutral-600 mb-4">{t.kazamashi.subtitle}</p>
            <p className="text-neutral-700 mb-6">{t.kazamashi.description}</p>
            <a
              href="https://wa.me/1234567890?text=Hola,%20me%20gustaría%20hacer%20una%20reserva%20en%20Kazamashi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.kazamashi.reserve}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
