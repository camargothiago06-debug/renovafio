import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GenderMode, Product } from '../types';
import { PRODUCTS_LIST } from '../data/productData';
import { ProductCardImage } from './ProductCardImage';
import { Sparkles, Star, ShoppingBag, X, Check, Info, Clock, Plus } from 'lucide-react';

interface ProductGalleryProps {
  gender: GenderMode;
  onAddToCart: (product: Product) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ gender, onAddToCart }) => {
  const isFemale = gender === 'feminino';
  const products = PRODUCTS_LIST[gender];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';
  const goldSecondary = isFemale ? '#DFB775' : '#AA771C';

  return (
    <section id="produtos" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coleção Farmacêutica Exclusiva</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            GALERIA DE{' '}
            <span
              className="bg-clip-text text-transparent italic font-normal"
              style={{
                backgroundImage: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              Fórmulas e Protocolos.
            </span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg font-light">
            Manipulação sob rigorosos padrões farmacêuticos magistrais com ativos biodisponíveis de altíssima pureza.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-[#121216] border border-zinc-800 hover:border-zinc-700 p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden shadow-xl"
            >
              {/* Top Tag & Rating */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                  style={{
                    borderColor: `${goldPrimary}50`,
                    backgroundColor: `${goldPrimary}15`,
                    color: goldPrimary,
                  }}
                >
                  {product.tag}
                </span>

                <div className="flex items-center space-x-1.5 text-sm">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-zinc-400 text-xs font-mono">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Visual Showcase (Clean, Large, Authentic Product Image) */}
              <div
                onClick={() => setSelectedProduct(product)}
                className="w-full my-2 cursor-pointer relative"
              >
                <ProductCardImage
                  gender={gender}
                  imageUrl={product.imageUrl}
                  size="md"
                  alt={product.name}
                />
              </div>

              {/* Product Content Details */}
              <div className="space-y-3 mt-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#fae596] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                {/* Key Actives Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.keyActives.slice(0, 3).map((act, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800 font-medium"
                    >
                      {act}
                    </span>
                  ))}
                </div>

                {/* Price & Installments */}
                <div className="pt-3 border-t border-zinc-800/80 flex items-baseline justify-between">
                  <div>
                    {product.originalPrice && (
                      <span className="text-sm text-zinc-400 line-through mr-2 font-mono">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-2xl font-bold font-mono text-white">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-300">
                    ou {product.installments}
                  </span>
                </div>
              </div>

              {/* Actions: View Details & Add to Cart */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="py-3 px-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-sm font-medium text-zinc-200 hover:text-white transition-all flex items-center justify-center space-x-1.5"
                >
                  <Info className="w-4 h-4" />
                  <span>Ver Detalhes</span>
                </button>

                <button
                  onClick={() => onAddToCart(product)}
                  className="py-3 px-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-md"
                  style={{
                    background: isFemale
                      ? 'linear-gradient(135deg, #E2A999 0%, #B86B77 100%)'
                      : 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                    color: '#000',
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Comprar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Product Quick-View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center"
          >
            <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-3xl bg-[#121216] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Product Showcase Image */}
                <div className="flex flex-col items-center justify-center">
                  <ProductCardImage
                    gender={gender}
                    imageUrl={selectedProduct.imageUrl}
                    size="lg"
                    alt={selectedProduct.name}
                  />
                  <p className="text-xs font-mono text-zinc-400 mt-3 text-center">
                    Fórmula Magistral Exclusiva • Manipulação 450mg
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span
                      className="text-xs font-mono uppercase tracking-widest font-semibold"
                      style={{ color: goldPrimary }}
                    >
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-zinc-300">{selectedProduct.format}</p>
                  </div>

                  <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-mono text-zinc-400 uppercase font-semibold">Benefícios Clínicos:</p>
                    {selectedProduct.benefits.map((b, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm text-zinc-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* How to use */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-200 flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span><strong>Posologia:</strong> {selectedProduct.howToUse}</span>
                  </div>

                  {/* Price & Checkout CTA */}
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        R$ {selectedProduct.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-zinc-400 font-mono">
                        {selectedProduct.installments}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="px-6 py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 shadow-lg transition-transform active:scale-95"
                      style={{
                        background: isFemale
                          ? 'linear-gradient(135deg, #E2A999 0%, #B86B77 100%)'
                          : 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                        color: '#000',
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
