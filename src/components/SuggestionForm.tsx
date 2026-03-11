import React from 'react';
import { useStore } from '@nanostores/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import { createSuggestion } from '../lib/campingApi';

const schema = z.object({
  name: z.string().min(2, 'Min 2 characters').max(100, 'Max 100 characters'),
  email: z.string().email('Invalid email').max(150, 'Max 150 characters'),
  confirmEmail: z.string().email('Invalid email').max(150, 'Max 150 characters'),
  category: z.string().min(1, 'Required').max(50),
  message: z.string().min(10, 'Min 10 characters').max(2000, 'Max 2000 characters'),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

type FormData = z.infer<typeof schema>;

export default function SuggestionForm() {
  const lang = useStore($language);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createSuggestion({ ...data, lang });
      toast.success(t('sug_success', lang), {
        duration: 5000,
        style: {
          borderRadius: '16px',
          background: 'var(--fallback-b1,oklch(var(--b1)))',
          color: 'var(--fallback-bc,oklch(var(--bc)))',
        },
      });
      reset();
    } catch {
      toast.error(t('error', lang));
    }
  };

  const categories = [
    { value: 'general', label: t('sug_cat_general', lang) },
    { value: 'services', label: t('sug_cat_services', lang) },
    { value: 'facilities', label: t('sug_cat_facilities', lang) },
    { value: 'activities', label: t('sug_cat_activities', lang) },
  ];

  return (
    <section id="contact" className="py-24 bg-base-200/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              {t('sug_title', lang)}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-base-content mt-3 mb-6">
              {t('sug_title', lang)}
            </h2>
            <p className="text-base-content/60 text-lg leading-relaxed mb-8">
              {t('sug_subtitle', lang)}
            </p>

            {/* Decorative Cards */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 bg-base-100 rounded-2xl p-4 shadow-md border border-base-200"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-base-content">
                    {lang === 'es' ? 'Tu opinión importa' : lang === 'en' ? 'Your opinion matters' : lang === 'pt' ? 'Sua opinião importa' : '你的意见很重要'}
                  </h4>
                  <p className="text-sm text-base-content/50">
                    {lang === 'es'
                      ? 'Cada sugerencia es revisada por nuestro equipo'
                      : lang === 'en'
                      ? 'Every suggestion is reviewed by our team'
                      : lang === 'pt'
                      ? 'Cada sugestão é revisada pela nossa equipe'
                      : '我们的团队会审核每一条建议'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 bg-base-100 rounded-2xl p-4 shadow-md border border-base-200"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-base-content">
                    {lang === 'es' ? 'Mejoramos constantemente' : lang === 'en' ? 'We constantly improve' : lang === 'pt' ? 'Melhoramos constantemente' : '我们持续改进'}
                  </h4>
                  <p className="text-sm text-base-content/50">
                    {lang === 'es'
                      ? 'Implementamos las mejores ideas de nuestros visitantes'
                      : lang === 'en'
                      ? 'We implement the best ideas from our visitors'
                      : lang === 'pt'
                      ? 'Implementamos as melhores ideias dos nossos visitantes'
                      : '我们会落实访客最好的想法'}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200 space-y-5"
            >
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('sug_name', lang)}</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={t('sug_name', lang)}
                  className={`input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/30 ${
                    errors.name ? 'input-error' : ''
                  }`}
                />
                {errors.name && (
                  <span className="text-error text-xs mt-1">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('sug_email', lang)}</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder={t('sug_email', lang)}
                  className={`input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/30 ${
                    errors.email ? 'input-error' : ''
                  }`}
                />
                {errors.email && (
                  <span className="text-error text-xs mt-1">{errors.email.message}</span>
                )}
              </div>

              {/* Confirm Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('sug_confirm_email', lang)}</span>
                </label>
                <input
                  {...register('confirmEmail')}
                  type="email"
                  placeholder={t('sug_confirm_email', lang)}
                  className={`input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary/30 ${
                    errors.confirmEmail ? 'input-error' : ''
                  }`}
                />
                {errors.confirmEmail && (
                  <span className="text-error text-xs mt-1">
                    {lang === 'es' ? 'Los correos no coinciden' : lang === 'en' ? "Emails don't match" : lang === 'pt' ? 'Os e-mails não coincidem' : '邮箱地址不一致'}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('sug_category', lang)}</span>
                </label>
                <select
                  {...register('category')}
                  className={`select select-bordered w-full rounded-xl ${
                    errors.category ? 'select-error' : ''
                  }`}
                >
                  <option value="">{t('sug_category', lang)}</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-error text-xs mt-1">{errors.category.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('sug_message', lang)}</span>
                </label>
                <textarea
                  {...register('message')}
                  placeholder={t('sug_message', lang)}
                  rows={4}
                  className={`textarea textarea-bordered w-full rounded-xl resize-none focus:ring-2 focus:ring-primary/30 ${
                    errors.message ? 'textarea-error' : ''
                  }`}
                />
                {errors.message && (
                  <span className="text-error text-xs mt-1">{errors.message.message}</span>
                )}
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block rounded-2xl h-14 text-lg shadow-lg shadow-primary/30"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('sug_submit', lang)}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
