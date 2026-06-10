import { useState } from 'react';
import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function RootLayout() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation language={language} setLanguage={setLanguage} />
      <Outlet context={{ language }} />
      <Footer language={language} />
    </div>
  );
}
