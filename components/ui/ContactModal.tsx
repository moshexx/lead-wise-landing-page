'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { X, Phone, Mail, User, Loader2, CheckCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';
import { WEBHOOK_URL } from '@/lib/constants';
import { logger } from '@/lib/logger';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations('contactForm');
  const tBooking = useTranslations('bookingSuccess');
  const router = useRouter();
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [savedLeadId, setSavedLeadId] = useState<string | null>(null);
  const totalSteps = 3;

  // Set up Cal.com event listener for booking success
  useEffect(() => {
    const setupCalListener = async () => {
      const cal = await getCalApi();
      cal('on', {
        action: 'bookingSuccessfulV2',
        callback: () => {
          setBookingComplete(true);
        }
      });
    };

    setupCalListener();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ContactFormData>();

  const handleNextStep = async () => {
    let isValid = false;

    // Validate current step field
    if (currentStep === 1) {
      isValid = await trigger('name');
    } else if (currentStep === 2) {
      isValid = await trigger('email');
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Send to webhook with timeout and retry
      const webhookResponse = await fetchWithTimeout(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          timestamp: new Date().toISOString(),
          source: 'leadwise_landing_page',
        }),
        timeoutMs: 10000, // 10 seconds timeout
        retries: 2, // Retry up to 2 times on failure
        retryDelay: 1000, // 1 second delay between retries
      });

      if (!webhookResponse.ok) {
        throw new Error('Failed to send data to webhook');
      }

      // Get lead_id and product_id from webhook response
      const responseData = await webhookResponse.json();
      const leadId = responseData.lead_id || responseData.fields?.rec_id || responseData.id;
      const productId = responseData.product_id || responseData.fields?.['Product Record Id']?.[0];

      // Save lead_id for later redirect
      setSavedLeadId(leadId);

      // Open Cal.com booking modal with pre-filled data
      const cal = await getCalApi();
      cal('modal', {
        calLink: 'simpliflow-office-e6a9co/leadflow',
        config: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          utm_source: 'landing_page',
          utm_medium: 'contact_form',
          lead_id: leadId,
          product_id: productId,
        }
      });

      // Reset form (but don't close modal yet - wait for booking success)
      reset();
      setCurrentStep(1);
    } catch (err) {
      logger.error('Error submitting form:', err);
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    reset();
    setCurrentStep(1);
    setError(null);
    setBookingComplete(false);
    setSavedLeadId(null);
    onClose();
  };

  const handleContinueToForm = () => {
    if (savedLeadId) {
      router.push(`/${locale}/thank-you?lead_id=${savedLeadId}`);
    }
    handleModalClose();
  };

  // Animation variants for step transitions
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleModalClose}
                className="absolute top-3 start-3 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label={t('close')}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Booking Success View */}
              {bookingComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {tBooking('title')}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                    <Calendar className="w-5 h-5" />
                    <p>{tBooking('reminder')}</p>
                  </div>
                  <button
                    onClick={handleContinueToForm}
                    className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-dark transition-all transform hover:scale-[1.02]"
                  >
                    {tBooking('continueButton')}
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="mb-6 mt-8">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {t('title')}
                      </h2>
                      <span className="text-sm text-gray-500">
                        {t('stepProgress', { current: currentStep, total: totalSteps })}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: '33.33%' }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="relative min-h-[280px]">
                <AnimatePresence mode="wait" custom={currentStep}>
                  {/* Step 1: Name */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      custom={1}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-lg font-semibold text-gray-900 mb-4"
                        >
                          {t('steps.nameQuestion')}
                        </label>
                        <div className="relative">
                          <User className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                          <input
                            id="name"
                            type="text"
                            autoFocus
                            {...register('name', {
                              required: t('validation.nameRequired'),
                              minLength: {
                                value: 2,
                                message: t('validation.nameMinLength'),
                              },
                            })}
                            className={`w-full ps-10 pe-4 py-4 text-lg text-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('placeholders.name')}
                            disabled={isSubmitting}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleNextStep();
                              }
                            }}
                          />
                        </div>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-600"
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-dark transition-all transform hover:scale-[1.02]"
                      >
                        {t('next')}
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Email */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      custom={2}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-lg font-semibold text-gray-900 mb-4"
                        >
                          {t('steps.emailQuestion')}
                        </label>
                        <div className="relative">
                          <Mail className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                          <input
                            id="email"
                            type="email"
                            autoFocus
                            {...register('email', {
                              required: t('validation.emailRequired'),
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('validation.emailInvalid'),
                              },
                            })}
                            className={`w-full ps-10 pe-4 py-4 text-lg text-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('placeholders.email')}
                            disabled={isSubmitting}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleNextStep();
                              }
                            }}
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-600"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all"
                        >
                          {t('back')}
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex-1 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-dark transition-all transform hover:scale-[1.02]"
                        >
                          {t('next')}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Phone */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      custom={3}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-lg font-semibold text-gray-900 mb-4"
                        >
                          {t('steps.phoneQuestion')}
                        </label>
                        <div className="relative">
                          <Phone className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-gray-400" />
                          <input
                            id="phone"
                            type="tel"
                            autoFocus
                            {...register('phone', {
                              required: t('validation.phoneRequired'),
                              pattern: {
                                value: /^[0-9+\-\s()]+$/,
                                message: t('validation.phoneInvalid'),
                              },
                            })}
                            className={`w-full ps-10 pe-4 py-4 text-lg text-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={t('placeholders.phone')}
                            disabled={isSubmitting}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !isSubmitting) {
                                e.preventDefault();
                                handleSubmit(onSubmit)();
                              }
                            }}
                          />
                        </div>
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-600"
                          >
                            {errors.phone.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <p className="text-sm text-red-600">{error}</p>
                        </motion.div>
                      )}

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          disabled={isSubmitting}
                          className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('back')}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-dark transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {t('submitting')}
                            </>
                          ) : (
                            t('submit')
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Privacy Notice */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-500 text-center mt-6"
                >
                  {t('privacyNotice')}
                </motion.p>
              </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
