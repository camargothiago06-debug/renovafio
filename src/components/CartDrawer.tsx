import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, GenderMode } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, Truck, ArrowRight, Sparkles, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  gender: GenderMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  gender,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const subtotal = items.reduce((acc, item) => {
    const price = 'price' in item.product ? item.product.price : item.product.totalPrice;
    return acc + price * item.quantity;
  }, 0);

  const discountValue = subtotal * (discountPercent / 100);
  const total = subtotal - discountValue;
  const isFreeShipping = subtotal >= 300;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase().trim() === 'RENOVA10' || couponCode.toUpperCase().trim() === 'PRIMEIRACOMPRA') {
      setDiscountPercent(10);
      setCouponSuccess('Cupom de 10% aplicado com sucesso!');
      setCouponError('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
      setCouponSuccess('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
        >
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
            className="relative z-10 w-full max-w-md h-full bg-[#0e0e12] border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <span className="font-display font-bold text-lg text-white">Seu Protocolo</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                    {items.length} {items.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="my-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs">
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    {isFreeShipping ? 'Frete VIP Grátis Liberado!' : `Faltam R$ ${(300 - subtotal).toFixed(2)} para Frete Grátis`}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {isFreeShipping ? '100%' : `${Math.min(100, Math.round((subtotal / 300) * 100))}%`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 300) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <p className="text-zinc-400 text-sm font-light">Seu carrinho está vazio.</p>
                  <button
                    onClick={onClose}
                    className="text-xs font-mono uppercase tracking-widest text-[#fae596] hover:underline"
                  >
                    Ver produtos & tratamentos →
                  </button>
                </div>
              ) : (
                <div className="space-y-3 my-4 max-h-[40vh] overflow-y-auto pr-1">
                  {items.map((item, idx) => {
                    const name = 'name' in item.product ? item.product.name : item.product.title;
                    const price = 'price' in item.product ? item.product.price : item.product.totalPrice;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1">
                          <p className="text-xs font-semibold text-white leading-tight">
                            {name}
                          </p>
                          <p className="text-xs font-mono font-bold" style={{ color: goldPrimary }}>
                            R$ {(price * item.quantity).toFixed(2)}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            Linha {item.gender}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-800">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="p-1 hover:text-white text-zinc-400"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="p-1 hover:text-white text-zinc-400"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Coupon input */}
              {items.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="mt-4 space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupom (ex: RENOVA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 uppercase font-mono focus:outline-none focus:border-zinc-600"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponSuccess && <p className="text-[11px] text-emerald-400 font-mono">{couponSuccess}</p>}
                  {couponError && <p className="text-[11px] text-rose-400 font-mono">{couponError}</p>}
                </form>
              )}
            </div>

            {/* Bottom Totals & Proceed CTA */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-3">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Desconto ({discountPercent}%)</span>
                      <span>- R$ {discountValue.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Frete</span>
                    <span className="text-emerald-400">{isFreeShipping ? 'Grátis (VIP)' : 'R$ 24,90'}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Total</span>
                    <span style={{ color: goldPrimary }}>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isFemale
                      ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #B86B77 100%)'
                      : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                    color: '#000',
                  }}
                >
                  <span>Avançar para Checkout Seguro</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-zinc-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ambiente Criptografado SSL 256-Bit</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
