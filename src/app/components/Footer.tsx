import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  language: 'es' | 'en';
}

const translations = {
  es: {
    zamashi: 'Zamashi',
    kazamashi: 'Kazamashi',
    followUs: 'Síguenos',
    contact: 'Contacto',
    hours: 'Horarios',
    zamashiHours: 'Lun-Dom: 1:00 PM - 11:00 PM',
    kazamashiHours: 'Mar-Dom: 8:00 AM - 11:00 PM',
    rights: 'Todos los derechos reservados.',
  },
  en: {
    zamashi: 'Zamashi',
    kazamashi: 'Kazamashi',
    followUs: 'Follow Us',
    contact: 'Contact',
    hours: 'Hours',
    zamashiHours: 'Mon-Sun: 1:00 PM - 11:00 PM',
    kazamashiHours: 'Tue-Sun: 8:00 AM - 11:00 PM',
    rights: 'All rights reserved.',
  },
};

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Zamashi Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.zamashi}</h3>
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>Av. Principal 123, Centro Histórico</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+525512345678" className="hover:text-white">
                  +52 55 1234 5678
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hola@zamashi.com" className="hover:text-white">
                  hola@zamashi.com
                </a>
              </div>
              <p className="text-sm">{t.zamashiHours}</p>
            </div>
          </div>

          {/* Kazamashi Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.kazamashi}</h3>
            <div className="space-y-3 text-neutral-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p>Av. Presidente Masaryk 456, Polanco</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+525587654321" className="hover:text-white">
                  +52 55 8765 4321
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:hola@kazamashi.com" className="hover:text-white">
                  hola@kazamashi.com
                </a>
              </div>
              <p className="text-sm">{t.kazamashiHours}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/zamashi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/zamashi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>
            © {new Date().getFullYear()} Zamashi & Kazamashi. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
