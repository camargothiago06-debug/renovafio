import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, GenderMode, Plan, Product, TabType } from './types';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { MenuDrawer } from './components/MenuDrawer';
import { HomeOverview } from './components/HomeOverview';
import { ScienceSection } from './components/ScienceSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProductGallery } from './components/ProductGallery';
import { DiagnosticQuizModal } from './components/DiagnosticQuizModal';
import { PricingSection } from './components/PricingSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FaqSection } from './components/FaqSection';
import { CustomerJourneySection } from './components/journey/CustomerJourneySection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { LuxuryFooter } from './components/LuxuryFooter';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function App() {
  const [gender, setGender] = useState<GenderMode>('masculino');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('renova_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('renova_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product | Plan) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          ('id' in item.product ? item.product.id : item.product.id) === product.id &&
          item.gender === gender
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1, gender }];
    });

    const name = 'name' in product ? product.name : product.title;
    showToast(`${name} adicionado ao seu pedido!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity = quantity;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectPlan = (plan: Plan) => {
    handleAddToCart(plan);
    setIsCheckoutOpen(true);
  };

  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  return (
    <div
      className={`min-h-screen text-[#f4f4f5] font-sans selection:bg-[#d4af37]/30 transition-colors duration-700 relative overflow-x-hidden ${
        isFemale ? 'theme-feminine' : 'theme-masculine'
      }`}
    >
      {/* Refined Minimalist Soft Lighting Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isFemale ? (
          <>
            {/* Top Rose-Gold & Champagne Atmospheric Crown */}
            <div
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[450px] rounded-full blur-[150px] opacity-35 transition-all duration-1000"
              style={{
                background: 'radial-gradient(circle, #E2A999 0%, #D4AF37 40%, transparent 70%)',
              }}
            />
            {/* Right Side Rose Champagne Bloom */}
            <div
              className="absolute top-[30%] -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25"
              style={{
                background: 'radial-gradient(circle, #E2A999 0%, #B86B77 45%, transparent 70%)',
              }}
            />
            {/* Left Side Warm Gold Accent */}
            <div
              className="absolute top-[65%] -left-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20"
              style={{
                background: 'radial-gradient(circle, #D4AF37 0%, #E2A999 50%, transparent 70%)',
              }}
            />
            {/* Ultra-Soft Editorial Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.035] luxury-bg-grid-feminine" />
          </>
        ) : (
          <>
            {/* Soft, Gentle Top Atmospheric Luminescence */}
            <div
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] rounded-full blur-[140px] opacity-15 transition-all duration-1000"
              style={{ backgroundColor: '#D4AF37' }}
            />
            {/* Ultra-Soft Editorial Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.015] luxury-bg-grid" />
          </>
        )}
      </div>

      {/* Top Fixed Master Bar: Announcement + Header + Navigation Tabs (100% Frozen at Top) */}
      <div className="fixed top-0 left-0 right-0 w-full z-40">
        <Header
          gender={gender}
          onSelectGender={setGender}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
          onGoHome={() => {
            setActiveTab('inicio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        {/* Sophisticated Luxury Tab Navigation Bar (Frozen Together) */}
        <NavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          gender={gender}
        />
      </div>

      {/* Main Screen Content with Top Offset for Combined Frozen Top Bar */}
      <div className="w-full pt-[var(--header-height,136px)]">
        {/* Expanding Minimalist Menu Drawer */}
        <MenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          gender={gender}
          onSelectGender={setGender}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectTab={setActiveTab}
        />

        {/* Tab Content Display with Smooth Transitions */}
        <main className="w-full min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${gender}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* TAB 1: INÍCIO (Visão Geral & Destaques) */}
              {activeTab === 'inicio' && (
                <HomeOverview
                  gender={gender}
                  onSelectTab={setActiveTab}
                  onOpenQuiz={() => setIsQuizOpen(true)}
                  onSelectPlan={handleSelectPlan}
                />
              )}

              {/* TAB 2: GALERIA DE FÓRMULAS */}
              {activeTab === 'galeria' && (
                <div className="w-full">
                  <ProductGallery gender={gender} onAddToCart={handleAddToCart} />
                </div>
              )}

              {/* TAB 3: A CIÊNCIA 450MG */}
              {activeTab === 'ciencia' && (
                <div className="w-full">
                  <ScienceSection gender={gender} />
                </div>
              )}

              {/* TAB 4: RESULTADOS CLÍNICOS & CASOS REAIS */}
              {activeTab === 'resultados' && (
                <div className="w-full space-y-4">
                  <BeforeAfterSection gender={gender} />
                  <SocialProofSection gender={gender} />
                </div>
              )}

              {/* TAB 5: PROTOCOLOS & PREÇOS */}
              {activeTab === 'protocolos' && (
                <div className="w-full">
                  <PricingSection gender={gender} onSelectPlan={handleSelectPlan} />
                </div>
              )}

              {/* TAB 6: MINHA JORNADA / ACOMPANHAMENTO DO CLIENTE */}
              {activeTab === 'jornada' && (
                <div className="w-full">
                  <CustomerJourneySection gender={gender} onSelectTab={setActiveTab} />
                </div>
              )}

              {/* TAB 7: DÚVIDAS & FAQ */}
              {activeTab === 'faq' && (
                <div className="w-full">
                  <FaqSection gender={gender} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Editorial Luxury Footer */}
      <LuxuryFooter
        gender={gender}
        onSelectGender={setGender}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectTab={setActiveTab}
      />

      {/* Dedicated Floating WhatsApp Concierge */}
      <WhatsAppConcierge gender={gender} />

      {/* Diagnostic Trichology Quiz Modal */}
      <DiagnosticQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        gender={gender}
        onSelectPlan={handleSelectPlan}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        gender={gender}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        gender={gender}
        onSuccessOrder={() => {
          setCart([]);
          localStorage.removeItem('renova_cart');
        }}
      />

      {/* Toast feedback notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#141419] border border-zinc-700 text-white text-xs font-medium shadow-2xl flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
