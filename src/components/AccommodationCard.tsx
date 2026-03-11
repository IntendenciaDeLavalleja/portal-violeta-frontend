import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, MapPin, Heart, ChevronLeft, ChevronRight,
  X, Tag, Check, Search, MessageSquare, Sparkles
} from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import type { Accommodation, Testimonial } from '../data/accommodations';
import { createPreReservation, fetchTestimonials } from '../lib/campingApi';
import toast from 'react-hot-toast';

const reservationSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  confirm_email: z.string().email().max(150),
  phone: z.string().min(6).max(30),
  guests: z.coerce.number().int().min(1).max(20),
  check_in: z.string().min(1),
  check_out: z.string().min(1),
  notes: z.string().max(1000).optional().or(z.literal('')),
}).refine((data) => data.email === data.confirm_email, {
  message: "Emails don't match",
  path: ["confirm_email"],
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface Props {
  accommodation: Accommodation;
  index?: number;
}

export default function AccommodationCard({ accommodation, index = 0 }: Props) {
  const lang = useStore($language);
  const testimonialsLang = lang === 'zh' ? 'es' : lang;
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      setLoadingReviews(true);
      fetchTestimonials(testimonialsLang, accommodation.id, 1, 20)
        .then(res => setTestimonials(res.testimonials))
        .finally(() => setLoadingReviews(false));
    }
  }, [modalOpen, testimonialsLang, accommodation.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 1,
      notes: '',
    },
  });

  const acc = accommodation;
  const discount = acc.originalPrice
    ? Math.round(((acc.originalPrice - acc.price) / acc.originalPrice) * 100)
    : 0;

  const typeLabels: Record<string, string> = {
    cabin: t('acc_cabins', lang),
    motorhome: t('acc_motorhome', lang),
    camping: t('acc_camping', lang),
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % acc.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + acc.images.length) % acc.images.length);
  };

  const onReserve = async (values: ReservationFormData) => {
    const serviceId = Number(acc.id);
    if (!Number.isFinite(serviceId)) {
      toast.error(lang === 'es' ? 'Reserva no disponible para este elemento' : lang === 'en' ? 'Reservation unavailable for this item' : lang === 'pt' ? 'Reserva indisponível para este item' : '该项目暂不可预订');
      return;
    }

    try {
      await createPreReservation({
        service_id: serviceId,
        full_name: values.full_name,
        email: values.email,
        phone: values.phone,
        guests: values.guests,
        check_in: values.check_in,
        check_out: values.check_out,
        notes: values.notes,
        lang,
      });

      toast.success(
        lang === 'es'
          ? 'Pre-reserva enviada. Revisa tu email para completar la reserva.'
          : lang === 'en'
          ? 'Pre-reservation sent. Check your email to complete your booking.'
          : lang === 'pt'
          ? 'Pré-reserva enviada. Verifique seu e-mail para concluir a reserva.'
          : '预订申请已发送，请检查邮箱完成预订。'
      );
      reset();
      setBookingOpen(false);
    } catch {
      toast.error(t('error', lang));
    }
  };

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
        whileHover={{ y: -8 }}
        className="group bg-base-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-base-200"
        onClick={() => {
          setModalOpen(true);
          setModalImageIndex(0);
        }}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={acc.images[imageIndex]}
              alt={acc.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </AnimatePresence>

          {/* Image Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-none shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-none shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-gray-800" />
            </button>
          </div>

          {/* Image Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {acc.images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === imageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 btn btn-circle btn-sm bg-white/80 hover:bg-white border-none shadow-md"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                liked ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`}
            />
          </motion.button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {acc.promo && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="badge badge-error text-white gap-1 font-semibold shadow-lg"
              >
                <Tag className="w-3 h-3" />
                -{discount}%
              </motion.div>
            )}
            <div className="badge bg-base-100/90 backdrop-blur-sm border-none text-xs font-medium shadow">
              {typeLabels[acc.type]}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-base-content/50 text-xs">
              <MapPin className="w-3 h-3" />
              Lavalleja
            </div>
          </div>

          {/* Name */}
          <h3 className="font-bold text-lg text-base-content mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {acc.name}
          </h3>

          {/* Capacity & Availability */}
          <div className="flex items-center gap-3 text-sm text-base-content/60 mb-3">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {acc.capacity} {t('acc_persons', lang)}
            </span>
            <span className="text-emerald-500 font-medium">
              {acc.available} {t('acc_available', lang)}
            </span>
          </div>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {acc.amenities.slice(0, 4).map((amenity) => {
              return (
                <div
                  key={amenity.id}
                  className="tooltip tooltip-top"
                  data-tip={amenity.name}
                >
                  <div className="flex items-center gap-1 bg-base-200 rounded-lg px-2 py-1 text-xs text-base-content/70">
                    <span className="text-sm leading-none">{amenity.icon}</span>
                  </div>
                </div>
              );
            })}
            {acc.amenities.length > 4 && (
              <div className="flex items-center bg-base-200 rounded-lg px-2 py-1 text-xs text-base-content/50">
                +{acc.amenities.length - 4}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-end justify-between pt-3 border-t border-base-200">
            <div>
              <span className="text-xs text-base-content/50">{t('acc_from', lang)}</span>
              <div className="flex items-baseline gap-2">
                {acc.originalPrice && (
                  <span className="text-sm text-base-content/40 line-through">
                    ${acc.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">
                  ${acc.price.toLocaleString()}
                </span>
                <span className="text-sm text-base-content/50">{t('acc_per_night', lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal (Agoda-style) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-base-100 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header Actions */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-none shadow-lg"
                  title="Ver imagen completa"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-none shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-t-3xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modalImageIndex}
                    src={acc.images[modalImageIndex]}
                    alt={acc.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Gallery Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={() =>
                      setModalImageIndex((prev) => (prev - 1 + acc.images.length) % acc.images.length)
                    }
                    className="btn btn-circle bg-white/90 hover:bg-white border-none shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setModalImageIndex((prev) => (prev + 1) % acc.images.length)
                    }
                    className="btn btn-circle bg-white/90 hover:bg-white border-none shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {acc.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setModalImageIndex(i)}
                      className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                        i === modalImageIndex
                          ? 'border-white shadow-lg scale-110'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Promo Badge */}
                {acc.promo && (
                  <div className="absolute top-4 left-4 badge badge-lg badge-error text-white gap-1 font-bold shadow-xl">
                    <Tag className="w-4 h-4" />
                    {t('acc_promo', lang)} -{discount}%
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10">
                <div className="max-w-4xl mx-auto space-y-10">
                  {/* Info Section */}
                  <div className="space-y-8">
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="badge badge-primary badge-outline font-bold">
                          {typeLabels[acc.type]}
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                          <Check className="w-4 h-4" />
                          <span>{acc.available} / {acc.total} {t('acc_available', lang)}</span>
                        </div>
                      </div>
                      <h2 className="text-4xl font-extrabold text-base-content tracking-tight mb-2">
                        {acc.name}
                      </h2>
                      <div className="flex items-center gap-1 text-base-content/40">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Camping Arequita, Minas, Lavalleja</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        {t('acc_description', lang)}
                      </h3>
                      <p className="text-base-content/70 leading-relaxed text-lg italic">
                        "{acc.description}"
                      </p>
                    </div>

                    {/* Amenities Grid */}
                    <div>
                      <h3 className="font-bold text-xl mb-4">{t('acc_amenities', lang)}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {acc.amenities.map((amenity) => {
                          return (
                            <div
                              key={amenity.id}
                              className="flex items-center gap-3 p-4 bg-base-100 rounded-2xl border border-base-200 hover:border-primary/30 transition-colors shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {amenity.icon}
                              </div>
                              <span className="text-sm font-bold text-base-content/80">{amenity.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Booking Form (Conditional) */}
                    <AnimatePresence>
                      {bookingOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-primary/5 rounded-3xl p-8 border-2 border-primary/20 overflow-hidden"
                        >
                          <div className="max-w-2xl mx-auto">
                            <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                              <Sparkles className="w-6 h-6" />
                              {t('acc_book_now', lang)}
                            </h3>
                          <form onSubmit={handleSubmit(onReserve)} className="space-y-6">
                            {/* Row 1: Name & Phone */}
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_full_name', lang)}</label>
                                <input
                                  type="text"
                                  placeholder="Ej: Juan Pérez"
                                  className="input input-bordered w-full rounded-xl"
                                  {...register('full_name')}
                                />
                                {errors.full_name && <p className="text-xs text-error mt-1">{t('error', lang)}</p>}
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_phone', lang)}</label>
                                <input
                                  type="text"
                                  placeholder="09..."
                                  className="input input-bordered w-full rounded-xl"
                                  {...register('phone')}
                                />
                              </div>
                            </div>

                            {/* Row 2: Email & Confirm Email */}
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_email', lang)}</label>
                                <input
                                  type="email"
                                  placeholder="tu@email.com"
                                  className="input input-bordered w-full rounded-xl"
                                  {...register('email')}
                                />
                                {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_confirm_email', lang)}</label>
                                <input
                                  type="email"
                                  placeholder="Repite tu email"
                                  className={`input input-bordered w-full rounded-xl ${errors.confirm_email ? 'input-error' : ''}`}
                                  {...register('confirm_email')}
                                />
                                {errors.confirm_email && (
                                  <p className="text-xs text-error mt-1">
                                    {lang === 'es' ? 'Los correos no coinciden' : lang === 'en' ? "Emails don't match" : lang === 'pt' ? 'Os e-mails não coincidem' : '邮箱地址不一致'}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Row 3: Dates (Stacked) */}
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_from', lang)}</label>
                                <input type="date" className="input input-bordered w-full rounded-xl font-mono" {...register('check_in')} />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_to', lang)}</label>
                                <input type="date" className="input input-bordered w-full rounded-xl font-mono" {...register('check_out')} />
                              </div>
                            </div>

                            {/* Row 4: Guests */}
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_guests', lang)}</label>
                              <input
                                type="number"
                                min={1}
                                max={acc.capacity}
                                className="input input-bordered w-full rounded-xl"
                                placeholder="1"
                                {...register('guests', { valueAsNumber: true })}
                              />
                            </div>

                            {/* Row 5: Notes */}
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-primary uppercase ml-1">{t('res_notes', lang)}</label>
                              <textarea
                                rows={3}
                                className="textarea textarea-bordered w-full rounded-xl"
                                placeholder={t('res_notes_placeholder', lang)}
                                {...register('notes')}
                              />
                            </div>

                            {/* Row 6: Submit */}
                            <div className="pt-4">
                              <button type="submit" className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/30" disabled={isSubmitting}>
                                {isSubmitting ? t('loading', lang) : t('res_submit', lang)}
                              </button>
                              <p className="text-center text-xs text-primary/50 font-bold mt-4 uppercase tracking-tighter">
                                {t('res_pay_arrival', lang)}
                              </p>
                            </div>
                          </form>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Price & Primary Action */}
                    <div className="flex flex-wrap items-center justify-between gap-6 p-6 bg-base-200/50 rounded-3xl border border-base-200">
                      <div>
                        <div className="text-base-content/40 text-sm">{t('acc_from', lang)}</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-primary">
                            ${acc.price.toLocaleString()}
                          </span>
                          <span className="text-base-content/50 font-medium">
                            UYU {t('acc_per_night', lang)}
                          </span>
                        </div>
                        <div className="text-xs text-base-content/30 mt-1 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {acc.capacity} {t('acc_persons', lang)} máx.
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setBookingOpen((prev) => !prev)}
                        className={`btn ${bookingOpen ? 'btn-ghost border-base-300' : 'btn-primary'} rounded-2xl px-8 h-14 text-lg font-bold shadow-xl`}
                      >
                        {bookingOpen ? t('acc_close', lang) : t('acc_book_now', lang)}
                      </motion.button>
                    </div>
                    {/* Testimonials List */}
                    <div className="pt-10 border-t border-base-200">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="font-black text-2xl">{t('rev_title', lang)}</h3>
                          <p className="text-sm text-base-content/40 mt-1">Lo que opinan otros campistas</p>
                        </div>
                        <div className="bg-base-200 px-4 py-2 rounded-2xl font-bold text-base-content/60">
                          {testimonials.length} {t('rev_total', lang)}
                        </div>
                      </div>

                      {loadingReviews ? (
                        <div className="flex justify-center py-12">
                          <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                      ) : testimonials.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-base-200/50 rounded-3xl p-6 border border-base-200 transition-all hover:bg-white hover:shadow-xl group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  {testimonial.avatar && !testimonial.avatar.includes('pravatar.cc') ? (
                                    <img
                                      src={testimonial.avatar}
                                      alt={testimonial.author}
                                      className="w-12 h-12 rounded-2xl object-cover ring-4 ring-primary/10 shadow-lg"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white text-xl shadow-lg">
                                      {testimonial.author?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-bold text-lg text-base-content leading-tight">{testimonial.author}</div>
                                    <div className="text-xs text-base-content/30 font-semibold">{testimonial.date}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative">
                                <div className="absolute -left-2 -top-1 text-primary/20 text-4xl font-serif">“</div>
                                <p className="text-base-content/70 italic leading-relaxed pl-4">
                                  {testimonial.message}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-base-200/20 rounded-3xl border-2 border-dashed border-base-200">
                          <p className="text-base-content/40 font-medium">
                            {testimonialsLang === 'es' ? 'Aún no hay testimonios para este producto.' : testimonialsLang === 'en' ? 'No testimonials for this product yet.' : 'Ainda não há depoimentos para este produto.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-[210] btn btn-circle btn-ghost text-white hover:bg-white/10"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={acc.images[modalImageIndex]}
              alt={acc.name}
              className="max-w-full max-h-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
