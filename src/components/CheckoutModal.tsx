import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem, GenderMode } from '../types';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Lock, Copy, Check, Sparkles, Truck, Package, MessageCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  gender: GenderMode;
  onSuccessOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  gender,
  onSuccessOrder,
}) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('12');

  const subtotal = items.reduce((acc, item) => {
    const price = 'price' in item.product ? item.product.price : item.product.totalPrice;
    return acc + price * item.quantity;
  }, 0);

  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal - pixDiscount;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinishOrder = () => {
    const num = `RF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    setStep('success');
    onSuccessOrder();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: isFemale ? ['#e2a999', '#dfb775', '#ffffff'] : ['#d4af37', '#fae596', '#ffffff'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136renovafio-alta-tricologia-farmaceutica-450mg-ord5204000053039865802BR5925RENOVA FIO FARMACIA MAG6009SAO PAULO62070503***6304E8A2');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 w-full max-w-2xl bg-[#111115] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
              Checkout Seguro 256-Bit SSL
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Personal Data & Shipping Address */}
        {step === 'form' && (
          <form onSubmit={handleNextToPayment} className="py-6 space-y-4">
            <div className="space-y-1 mb-4">
              <h3 className="font-display font-bold text-xl text-white">
                Dados Pessoais & Endereço de Entrega
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Sua entrega será enviada em embalagem 100% lacrada e discreta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">E-mail para Rastreio</label>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">WhatsApp com DDD</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">CPF (para emissão da NF)</label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">CEP</label>
                <input
                  type="text"
                  required
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Endereço Completo com Número e Bairro</label>
                <input
                  type="text"
                  required
                  placeholder="Rua, Número, Complemento, Bairro"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            {/* Summary info */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Total do Pedido:</span>
              <span className="font-bold text-white text-base">R$ {subtotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-xl hover:scale-[1.01]"
              style={{
                background: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #B86B77 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                color: '#000',
              }}
            >
              <span>Continuar para Pagamento Seguro</span>
            </button>
          </form>
        )}

        {/* STEP 2: Payment Selector */}
        {step === 'payment' && (
          <div className="py-6 space-y-6">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-white">
                Forma de Pagamento
              </h3>
              <p className="text-xs text-zinc-400">
                Escolha PIX para 5% de desconto imediato ou Cartão de Crédito em até 12x.
              </p>
            </div>

            {/* Payment Method Switcher */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  paymentMethod === 'pix'
                    ? 'bg-emerald-950/30 border-emerald-500 text-white'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold font-mono">PIX (5% OFF)</p>
                  <p className="text-[10px] text-emerald-400">Aprovação Imediata</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  paymentMethod === 'card'
                    ? isFemale
                      ? 'bg-[#201518] border-[#E2A999] text-white'
                      : 'bg-[#18150f] border-[#D4AF37] text-white'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-zinc-300 shrink-0" />
                <div>
                  <p className="text-xs font-bold font-mono">Cartão de Crédito</p>
                  <p className="text-[10px] text-zinc-400">Até 12x sem juros</p>
                </div>
              </button>
            </div>

            {/* Pix Interface */}
            {paymentMethod === 'pix' && (
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center text-center space-y-4">
                <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  {/* Simulated QR Code matrix */}
                  <svg className="w-full h-full text-black" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="25" height="25" fill="black" />
                    <rect x="15" y="15" width="15" height="15" fill="white" />
                    <rect x="18" y="18" width="9" height="9" fill="black" />
                    <rect x="65" y="10" width="25" height="25" fill="black" />
                    <rect x="70" y="15" width="15" height="15" fill="white" />
                    <rect x="73" y="18" width="9" height="9" fill="black" />
                    <rect x="10" y="65" width="25" height="25" fill="black" />
                    <rect x="15" y="70" width="15" height="15" fill="white" />
                    <rect x="18" y="73" width="9" height="9" fill="black" />
                    <rect x="42" y="15" width="10" height="30" fill="black" />
                    <rect x="45" y="55" width="20" height="10" fill="black" />
                    <rect x="65" y="45" width="25" height="40" fill="black" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold font-mono text-emerald-400">
                    Total no PIX: R$ {total.toFixed(2)}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Escaneie o QR Code acima ou copie a chave Pix Copia e Cola.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white hover:bg-zinc-800 transition-colors flex items-center space-x-1.5"
                >
                  {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix'}</span>
                </button>
              </div>
            )}

            {/* Credit Card Interface */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Nome Impresso no Cartão</label>
                  <input
                    type="text"
                    placeholder="NOME COMO NO CARTAO"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 uppercase font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Parcelamento</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-zinc-500 font-mono"
                  >
                    <option value="1">1x de R$ {subtotal.toFixed(2)} (à vista)</option>
                    <option value="3">3x de R$ {(subtotal / 3).toFixed(2)} sem juros</option>
                    <option value="6">6x de R$ {(subtotal / 6).toFixed(2)} sem juros</option>
                    <option value="12">12x de R$ {(subtotal / 12).toFixed(2)} sem juros</option>
                  </select>
                </div>
              </div>
            )}

            {/* Complete Order Button */}
            <button
              onClick={handleFinishOrder}
              className="w-full py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-xl hover:scale-[1.01]"
              style={{
                background: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #B86B77 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                color: '#000',
              }}
            >
              <span>Concluir Pedido com Garantia</span>
            </button>
          </div>
        )}

        {/* STEP 3: Order Completed Success Receipt */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-6">
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border"
              style={{
                borderColor: `${goldPrimary}50`,
                backgroundColor: `${goldPrimary}15`,
                color: goldPrimary,
              }}
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
                Pedido Aprovado com Sucesso
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Bem-vindo(a) à Jornada Renova Fio
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Código do Pedido: <strong className="text-white">{orderNumber}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 space-y-2 text-left">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono">
                <Truck className="w-4 h-4" />
                <span>Previsão de Envio: Próximas 24 horas úteis</span>
              </div>
              <p className="text-zinc-400">
                Sua fórmula será manipulada sob demanda em nossa farmácia magistral e despachada em embalagem 100% lacrada e discreta. Enviamos os detalhes e o rastreio para seu WhatsApp.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono uppercase tracking-widest text-white transition-colors"
            >
              Fechar e Voltar ao Site
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
