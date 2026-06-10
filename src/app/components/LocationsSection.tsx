import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

interface LocationsSectionProps {
  language: "es" | "en";
}

const translations = {
  es: {
    title: "Nuestras Ubicaciones",
    phone: "Teléfono",
    hours: "Horario",
    reserve: "Reservar",
    viewMap: "Ver en Mapa",
    locations: [
      {
        name: "Zamashi - Centro",
        address: "Av. Principal 123, Centro Histórico",
        phone: "+52 55 1234 5678",
        hours: "Lun-Dom: 1:00 PM - 11:00 PM",
        whatsapp: "https://wa.me/525512345678",
        mapUrl: "https://maps.google.com",
      },
      {
        name: "Kazamashi - Polanco",
        address: "Av. Presidente Masaryk 456, Polanco",
        phone: "+52 55 8765 4321",
        hours: "Mar-Dom: 8:00 AM - 11:00 PM (Desayunos próximamente)",
        whatsapp: "https://wa.me/525587654321",
        mapUrl: "https://maps.google.com",
      },
    ],
  },
  en: {
    title: "Our Locations",
    phone: "Phone",
    hours: "Hours",
    reserve: "Reserve",
    viewMap: "View on Map",
    locations: [
      {
        name: "Zamashi - Downtown",
        address: "123 Main Avenue, Historic Center",
        phone: "+52 55 1234 5678",
        hours: "Mon-Sun: 1:00 PM - 11:00 PM",
        whatsapp: "https://wa.me/525512345678",
        mapUrl: "https://maps.google.com",
      },
      {
        name: "Kazamashi - Polanco",
        address: "456 Presidente Masaryk Avenue, Polanco",
        phone: "+52 55 8765 4321",
        hours: "Tue-Sun: 8:00 AM - 11:00 PM (Breakfast coming soon)",
        whatsapp: "https://wa.me/525587654321",
        mapUrl: "https://maps.google.com",
      },
    ],
  },
};

export default function LocationsSection({ language }: LocationsSectionProps) {
  const t = translations[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {t.locations.map((location, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Map Placeholder */}
              <div className="h-64 bg-neutral-200 relative">
                <img
                  src={
                    index === 0
                      ? "https://images.unsplash.com/photo-1777502286448-35389817f504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxqYXBhbmVzZSUyMHN1c2hpJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzgwNjMwMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                      : "https://images.unsplash.com/photo-1647943766693-a9ce5760e50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxpdGFsaWFuJTIwcGFzdGElMjByZXN0YXVyYW50fGVufDF8fHx8MTc4MDQ2NjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  }
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  {location.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-neutral-600 mt-1 flex-shrink-0" />
                    <p className="text-neutral-700">{location.address}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                    <a className="text-neutral-700 hover:text-neutral-900">
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-neutral-600 mt-1 flex-shrink-0" />
                    <p className="text-neutral-700">{location.hours}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={location.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t.reserve}</span>
                  </a>
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>{t.viewMap}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
