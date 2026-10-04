import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import PositioningSection from './components/PositioningSection';
import FloatingChatbot from './components/FloatingChatbot';
import InteractiveEstimator from './components/InteractiveEstimator';
import TechStackSection from './components/TechStackSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ServiceDetailModal from './components/ServiceDetailModal';

export default function App() {
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [selectedServicesForBooking, setSelectedServicesForBooking] = useState(['web-dev', 'ai-chatbot']);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Clear any hash in URL so refresh always starts at top
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    // Scroll directly to start of page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceId) => {
    setSelectedServicesForBooking([serviceId]);
    scrollToSection('contact');
  };

  const handleSelectServicesFromEstimator = (serviceIds) => {
    setSelectedServicesForBooking(serviceIds);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-500/20 selection:text-sky-800 w-full overflow-x-hidden">
      {/* Navigation */}
      <Navbar onBookCallClick={() => scrollToSection('contact')} />

      {/* Main Experience */}
      <main>
        {/* Hero Section with Interactive 3D Product Stage */}
        <Hero 
          onExploreServices={() => scrollToSection('services')}
          onOpenEstimator={() => scrollToSection('estimator')}
        />

        {/* 8 Core Services Grid with 3D Card Tilt */}
        <ServicesSection 
          onSelectService={(service) => setActiveServiceModal(service)}
        />

        {/* Positioning: Ideas • Technology • Growth */}
        <PositioningSection 
          onGetStarted={() => scrollToSection('contact')}
        />

        {/* Interactive Scope & Timeline Estimator */}
        <InteractiveEstimator 
          onSelectServicesForBooking={handleSelectServicesFromEstimator}
          preselectedServiceId={selectedServicesForBooking[0]}
        />

        {/* Production Tech Stack */}
        <TechStackSection />

        {/* Project Discovery & Consultation Hub */}
        <ContactSection 
          selectedServicesForBooking={selectedServicesForBooking}
        />
      </main>

      {/* Footer */}
      <Footer 
        onSelectService={(service) => setActiveServiceModal(service)}
      />

      {/* Floating Turing-style AI Chatbot */}
      <FloatingChatbot onNavigateToSection={scrollToSection} />

      {/* Service Detail Modal */}
      {activeServiceModal && (
        <ServiceDetailModal 
          service={activeServiceModal}
          onClose={() => setActiveServiceModal(null)}
          onSelectForQuote={handleSelectServiceForQuote}
        />
      )}
    </div>
  );
}
