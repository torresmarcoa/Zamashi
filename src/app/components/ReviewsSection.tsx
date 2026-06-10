import { useEffect, useRef } from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface ReviewsSectionProps {
  language: 'es' | 'en';
}

const translations = {
  es: {
    title: 'Lo Que Dicen Nuestros Clientes',
    reviews: 'reseñas',
    zamashiReviews: [
      { author: 'María González', rating: 5, date: 'Hace 2 semanas', text: 'Excelente experiencia. El sushi es fresco y auténtico. El servicio es impecable y el ambiente muy acogedor.', platform: 'Google' },
      { author: 'Carlos Ramírez', rating: 5, date: 'Hace 1 mes', text: 'El mejor restaurante japonés de la ciudad. El ramen es simplemente delicioso y los precios son razonables.', platform: 'TripAdvisor' },
      { author: 'Ana Martínez', rating: 5, date: 'Hace 3 semanas', text: 'Una joya escondida. La atención al detalle en cada plato es excepcional. Definitivamente volveremos.', platform: 'Google' },
      { author: 'Pedro López', rating: 5, date: 'Hace 1 semana', text: 'El omakase fue una experiencia única. Cada pieza de sushi era una obra de arte tanto visual como gastronómica.', platform: 'TripAdvisor' },
      { author: 'Valentina Cruz', rating: 5, date: 'Hace 4 días', text: 'Los rolls de salmón son impresionantes, nunca había probado algo tan delicioso. El servicio fue muy amable.', platform: 'Google' },
      { author: 'Diego Morales', rating: 5, date: 'Hace 2 meses', text: 'Ambiente increíble y comida de primer nivel. El chef conoce perfectamente su oficio. 100% recomendado.', platform: 'TripAdvisor' },
    ],
    kazamashiReviews: [
      { author: 'Roberto Silva', rating: 5, date: 'Hace 1 semana', text: 'La pasta es increíble, se nota que es hecha en casa. El tiramisú es el mejor que he probado.', platform: 'Google' },
      { author: 'Laura Fernández', rating: 5, date: 'Hace 2 semanas', text: 'Auténtica comida italiana. El ambiente es cálido y el servicio muy atento. Muy recomendado.', platform: 'TripAdvisor' },
      { author: 'Sofía Torres', rating: 5, date: 'Hace 3 días', text: 'La risotto de trufa es simplemente sublime. Un restaurante que merece cada estrella que tiene.', platform: 'Google' },
      { author: 'Andrés Vega', rating: 5, date: 'Hace 5 días', text: 'La pizza napolitana es auténtica, masa perfecta y ingredientes de calidad. Nos encantó todo.', platform: 'TripAdvisor' },
      { author: 'Isabel Rojas', rating: 5, date: 'Hace 3 semanas', text: 'Excelente lugar para una cena romántica. La lasaña está fuera de serie y el vino perfecto.', platform: 'Google' },
      { author: 'Camilo Herrera', rating: 5, date: 'Hace 1 mes', text: 'Las porciones son generosas y los precios muy justos para la calidad. Volveré sin duda.', platform: 'TripAdvisor' },
    ],
  },
  en: {
    title: 'What Our Customers Say',
    reviews: 'reviews',
    zamashiReviews: [
      { author: 'María González', rating: 5, date: '2 weeks ago', text: 'Excellent experience. The sushi is fresh and authentic. Service is impeccable and the atmosphere is very welcoming.', platform: 'Google' },
      { author: 'Carlos Ramírez', rating: 5, date: '1 month ago', text: 'The best Japanese restaurant in the city. The ramen is simply delicious and prices are reasonable.', platform: 'TripAdvisor' },
      { author: 'Ana Martínez', rating: 5, date: '3 weeks ago', text: 'A hidden gem. The attention to detail in each dish is exceptional. We will definitely return.', platform: 'Google' },
      { author: 'Pedro López', rating: 5, date: '1 week ago', text: 'The omakase was a unique experience. Each piece of sushi was a work of art both visually and gastronomically.', platform: 'TripAdvisor' },
      { author: 'Valentina Cruz', rating: 5, date: '4 days ago', text: 'The salmon rolls are impressive, I have never tasted anything so delicious. The service was very kind.', platform: 'Google' },
      { author: 'Diego Morales', rating: 5, date: '2 months ago', text: 'Incredible atmosphere and top-notch food. The chef truly knows his craft. 100% recommended.', platform: 'TripAdvisor' },
    ],
    kazamashiReviews: [
      { author: 'Roberto Silva', rating: 5, date: '1 week ago', text: "The pasta is incredible, you can tell it's homemade. The tiramisu is the best I've ever had.", platform: 'Google' },
      { author: 'Laura Fernández', rating: 5, date: '2 weeks ago', text: 'Authentic Italian food. The atmosphere is warm and the service very attentive. Highly recommended.', platform: 'TripAdvisor' },
      { author: 'Sofía Torres', rating: 5, date: '3 days ago', text: 'The truffle risotto is simply sublime. A restaurant that deserves every star it has.', platform: 'Google' },
      { author: 'Andrés Vega', rating: 5, date: '5 days ago', text: 'The Neapolitan pizza is authentic, perfect dough and quality ingredients. We loved everything.', platform: 'TripAdvisor' },
      { author: 'Isabel Rojas', rating: 5, date: '3 weeks ago', text: 'Excellent place for a romantic dinner. The lasagna is outstanding and the wine perfect.', platform: 'Google' },
      { author: 'Camilo Herrera', rating: 5, date: '1 month ago', text: 'Generous portions and very fair prices for the quality. Will definitely come back.', platform: 'TripAdvisor' },
    ],
  },
};

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  platform: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm border border-neutral-100 p-6 mx-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
          ))}
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${review.platform === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-700'}`}>
          {review.platform}
        </span>
      </div>
      <p className="text-neutral-700 text-sm leading-relaxed mb-4 line-clamp-3">"{review.text}"</p>
      <div className="border-t border-neutral-100 pt-3">
        <p className="font-semibold text-neutral-900 text-sm">{review.author}</p>
        <p className="text-xs text-neutral-500">{review.date}</p>
      </div>
    </div>
  );
}

function AutoScrollCarousel({ reviews, speed = 0.5, direction = 1 }: { reviews: Review[]; speed?: number; direction?: 1 | -1 }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const repeated = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 332; // 320px + 2*6px margin
    const totalWidth = reviews.length * cardWidth;

    const animate = () => {
      posRef.current += speed * direction;

      if (direction === 1 && posRef.current >= totalWidth) {
        posRef.current -= totalWidth;
      } else if (direction === -1 && posRef.current <= 0) {
        posRef.current += totalWidth;
      }

      track.style.transform = `translateX(${-posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reviews.length, speed, direction]);

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex will-change-transform">
        {repeated.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsSection({ language }: ReviewsSectionProps) {
  const t = translations[language];

  const renderStars = (rating: number) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
          {t.title}
        </h2>

        {/* Overall Ratings */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: 'Zamashi', score: '4.9', count: '250+' },
            { name: 'Kazamashi', score: '4.8', count: '180+' },
          ].map(({ name, score, count }) => (
            <div key={name} className="bg-white p-8 rounded-xl shadow-md text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{name}</h3>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <span className="text-4xl font-bold text-neutral-900">{score}</span>
                {renderStars(5)}
              </div>
              <p className="text-neutral-600 mb-4">{count} {t.reviews}</p>
              <div className="flex justify-center space-x-4">
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <span>Google</span><ExternalLink className="w-4 h-4" />
                </a>
                <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700">
                  <span>TripAdvisor</span><ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousels */}
      <div className="space-y-6">
        <div>
          <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-4">Zamashi</p>
          <AutoScrollCarousel reviews={t.zamashiReviews} speed={0.6} direction={1} />
        </div>
        <div>
          <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-4">Kazamashi</p>
          <AutoScrollCarousel reviews={t.kazamashiReviews} speed={0.6} direction={-1} />
        </div>
      </div>
    </section>
  );
}
