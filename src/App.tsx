import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, GenderMode, Plan, Product } from './types';
import { Header } from './components/Header';
import { MenuDrawer } from './components/MenuDrawer';
import { HeroBannerSlider } from './components/HeroBannerSlider';
import { ScienceSection } from './components/ScienceSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProductGallery } from './components/ProductGallery';
import { DiagnosticQuizModal } from './components/DiagnosticQuizModal';
import { PricingSection } from './components/PricingSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { LuxuryFooter } from './components/LuxuryFooter';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function App() {
  const [gender, setGender] = useState<GenderMode>('masculino');
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

  return (
    <div
      className={`min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans selection:bg-[#d4af37]/30 transition-colors duration-700 relative ${
        isFemale ? 'theme-feminine' : 'theme-masculine'
      }`}
    >
      {/* Header & Floating Navigation */}
      <Header
        gender={gender}
        onSelectGender={setGender}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* Expanding Minimalist Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        gender={gender}
        onSelectGender={setGender}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Screen Content with Smooth Theme Switch Fade */}
      <motion.main
        key={gender}
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full overflow-hidden"
      >
        {/* Fullscreen Editorial Hero Banner Slider with Models & Clinical Gold Telemetry */}
        <HeroBannerSlider
          gender={gender}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onExplorePlans={() => {
            const el = document.getElementById('protocolos');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Science & Active Ingredients (Foto 4 Representation) */}
        <ScienceSection gender={gender} />

        {/* Interactive Before & After Slider (Foto 2 & 3 Clinical Results) */}
        <BeforeAfterSection gender={gender} />

        {/* Exclusive Dynamic Product Line Gallery */}
        <ProductGallery gender={gender} onAddToCart={handleAddToCart} />

        {/* Treatment Protocol Tiers & Pricing */}
        <PricingSection gender={gender} onSelectPlan={handleSelectPlan} />

        {/* Clinical Proof & Patient Testimonials */}
        <SocialProofSection gender={gender} />

        {/* FAQ Section */}
        <FaqSection gender={gender} />
      </motion.main>

      {/* Editorial Luxury Footer */}
      <LuxuryFooter
        gender={gender}
        onSelectGender={setGender}
        onOpenQuiz={() => setIsQuizOpen(true)}
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
