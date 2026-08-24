import React from 'react';
import { motion } from 'motion/react';
import { GenderMode } from '../types';
import { Star, ShieldCheck, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

interface SocialProofSectionProps {
  gender: GenderMode;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ gender }) => {
  const isFemale = gender === 'feminino';
  const goldPrimary = isFemale ? '#E2A999' : '#D4AF37';

  const testimonials = isFemale
    ? [
        {
          name: 'Carolina G.',
          location: 'São Paulo, SP',
          age: '34 anos',
          rating: 5,
          text: 'Depois que tive meu segundo filho, meu cabelo caía em tufos no banho e a risca do topo abriu muito. Com 45 dias tomando a fórmula Renova Fio feminina, a queda parou 100% e hoje está cheio de cabelinhos novos crescendo. Inacreditável!',
          treatment: 'Protocolo 6 Meses • Eflúvio Telógeno',
          verified: true,
        },
        {
          name: 'Vanessa M.',
          location: 'Belo Horizonte, MG',
          age: '42 anos',
          rating: 5,
          text: 'Sempre fiz luzes e progressiva, meus fios estavam ralos e sem vida. O Renova Fio devolveu o corpo e a densidade que eu não tinha há 10 anos. Todo mundo no salão me pergunta o que eu fiz!',
          treatment: 'Protocolo 3 Meses • Afinamento Químico',
          verified: true,
        },
        {
          name: 'Fernanda R.',
          location: 'Curitiba, PR',
          age: '29 anos',
          rating: 5,
          text: 'Melhor investimento que fiz na minha autoestima. O atendimento da farmacêutica pelo WhatsApp foi maravilhoso e o frasco é lindo demais. Super recomendo para todas as mulheres!',
          treatment: 'Protocolo 6 Meses • Alopecia Androgenética',
          verified: true,
        },
      ]
    : [
        {
          name: 'Guilherme P.',
          location: 'Rio de Janeiro, RJ',
          age: '37 anos',
          rating: 5,
          text: 'Eu já tinha tentado minoxidil tópico de farmácia e desisti pela oleosidade. A fórmula em cápsula 450mg do Renova Fio mudou tudo: tomo uma de manhã e pronto. Em 3 meses minha coroa fechou totalmente. Vale cada centavo.',
          treatment: 'Protocolo 6 Meses • Calvície Grau III',
          verified: true,
        },
        {
          name: 'Eduardo F.',
          location: 'Porto Alegre, RS',
          age: '44 anos',
          rating: 5,
          text: 'O receio com dutasterida passou assim que comecei: zero efeitos colaterais e resultado rápido. Minhas entradas que estavam recuando há 5 anos voltaram a ter fios pretos e grossos.',
          treatment: 'Protocolo 3 Meses • Recuo Frontal',
          verified: true,
        },
        {
          name: 'Renato S.',
          location: 'Brasília, DF',
          age: '31 anos',
          rating: 5,
          text: 'Impressionado com a seriedade e discrição. A embalagem veio lacrada sem nada escrito por fora. O resultado aos 90 dias me surpreendeu muito. Indico de olhos fechados.',
          treatment: 'Protocolo 6 Meses • Prevenção e Densidade',
          verified: true,
        },
      ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-zinc-800/70 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider backdrop-blur-md"
            style={{
              borderColor: isFemale ? 'rgba(226, 169, 153, 0.3)' : 'rgba(212, 175, 55, 0.3)',
              backgroundColor: isFemale ? 'rgba(226, 169, 153, 0.08)' : 'rgba(212, 175, 55, 0.08)',
              color: isFemale ? '#ffdcd3' : '#fae596',
            }}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Comunidade Renova Fio</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            QUEM USA,{' '}
            <span
              className="bg-clip-text text-transparent italic font-normal"
              style={{
                backgroundImage: isFemale
                  ? 'linear-gradient(135deg, #FFF2F0 0%, #E2A999 50%, #DFB775 100%)'
                  : 'linear-gradient(135deg, #FFF0D0 0%, #D4AF37 50%, #AA771C 100%)',
                fontFamily: 'var(--font-cormorant)',
              }}
            >
              Comprova a Eficácia.
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Mais de 5.400 homens e mulheres que retomaram a densidade dos cabelos e a segurança no espelho.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#131317] border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between space-y-6 shadow-xl relative"
            >
              <div className="space-y-4">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>

                  {t.verified && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Compra Verificada</span>
                    </span>
                  )}
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    {t.location} • {t.age}
                  </p>
                </div>

                <span
                  className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-black/40 border border-zinc-800 text-zinc-400"
                >
                  {t.treatment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
