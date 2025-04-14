'use client';

import { useState, useId } from 'react';
import Modal from '@/components/ui/Modal';
import { ArrowLeft, ArrowRight, Upload, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium?: boolean;
}

type StepProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center space-x-3 mb-10">
      {steps.map((step) => (
        <div key={`step-${step}`} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
              step <= currentStep
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {step <= currentStep ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <span className="text-sm font-medium">{step}</span>
            )}
          </div>
          {step < totalSteps && (
            <div
              className={`w-16 h-1 mx-2 rounded transition-all duration-500 ${
                step < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const StepNavigation = ({ currentStep, totalSteps, onNext, onBack }: StepProps) => {
  return (
    <div className="flex justify-between mt-10">
      <div>
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onNext}
        className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100"
      >
        <span>{currentStep === totalSteps ? 'Submit Tool' : 'Continue'}</span>
        {currentStep !== totalSteps && <ArrowRight className="w-5 h-5" />}
      </button>
    </div>
  );
};

const SubmitToolModal = ({ isOpen, onClose, isPremium = false }: SubmitToolModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const formId = useId();
  
  const [formData, setFormData] = useState({
    toolName: '',
    toolUrl: '',
    email: '',
    logo: null as File | null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'logo' && files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Show success state
    setIsSubmitted(true);

    // Close modal after 3 seconds
    setTimeout(() => {
      onClose();
      // Reset state after modal is closed
      setTimeout(() => setIsSubmitted(false), 500);
    }, 3000);
  };

  const renderStep = () => {
    const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    const steps = {
      1: (
        <motion.div
          key="step-1"
          className="space-y-6 w-full"
          {...fadeIn}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">What&apos;s your tool called?</h2>
            <p className="text-gray-500">Enter the name of your tool</p>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              name="toolName"
              value={formData.toolName}
              onChange={handleChange}
              placeholder="e.g. Notion, Slack"
              className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              required
            />
            <p className="mt-2 text-sm text-gray-500">This will be the main title of your tool listing</p>
          </div>
        </motion.div>
      ),
      2: (
        <motion.div
          key="step-2"
          className="space-y-6 w-full"
          {...fadeIn}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">What's your tool's website?</h2>
            <p className="text-gray-500">Enter the URL where users can find your tool</p>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="url"
              name="toolUrl"
              value={formData.toolUrl}
              onChange={handleChange}
              placeholder="https://www.example.com"
              className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              required
            />
            <p className="mt-2 text-sm text-gray-500">Make sure this is the main landing page for your tool</p>
          </div>
        </motion.div>
      ),
      3: (
        <motion.div
          key="step-3"
          className="space-y-6 w-full"
          {...fadeIn}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">What's your email?</h2>
            <p className="text-gray-500">We'll notify you when your tool is published</p>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              required
            />
            <p className="mt-2 text-sm text-gray-500">We'll also use this for any important updates about your listing</p>
          </div>
        </motion.div>
      ),
      4: (
        <motion.div
          key="step-4"
          className="space-y-6 w-full"
          {...fadeIn}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Upload your tool's logo</h2>
            <p className="text-gray-500">Upload a high-quality logo (min 200x200px)</p>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
              id={`${formId}-logo-upload`}
              required
            />
            <label
              htmlFor={`${formId}-logo-upload`}
              className="relative group flex flex-col items-center justify-center w-full h-64 rounded-2xl border-3 border-dashed border-gray-300 hover:border-emerald-500 cursor-pointer transition-all bg-gray-50 hover:bg-emerald-50/50"
            >
              {formData.logo ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <p className="text-emerald-600 font-medium text-lg">{formData.logo.name}</p>
                  <p className="text-sm text-gray-500 mt-2">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">Click to upload your logo</p>
                  <p className="text-sm text-gray-500 mt-2">SVG, PNG, JPG (max 2MB)</p>
                </div>
              )}
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-emerald-100/20 to-transparent transform rotate-45 translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-emerald-100/20 to-transparent transform rotate-45 -translate-x-16 translate-y-16 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
              </div>
            </label>
            <p className="mt-3 text-sm text-gray-500 text-center">
              For best results, use a square logo with a transparent background
            </p>
          </div>
        </motion.div>
      ),
    };

    return steps[currentStep as keyof typeof steps];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isPremium ? "Premium Tool Submission" : "Submit Your Tool"}
    >
      <div className="mt-8 pb-4">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success State
              <div className="text-center py-12">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mb-8">
                  <svg className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Submission Received!</h2>
                <p className="text-gray-600 mb-8">
                  {isPremium 
                    ? "We'll review your tool and get back to you within 72 hours."
                    : "Thank you for your submission. We'll review your tool and get back to you soon."}
                </p>
                <div className="animate-bounce">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-0.5 text-sm font-medium text-emerald-800">
                    Redirecting...
                  </span>
                </div>
              </div>
            ) : (
              renderStep()
            )}
          </AnimatePresence>
        </div>
        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onBack={handleBack}
        />
        {isPremium && currentStep === totalSteps && (
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-800">Premium Submission</h3>
                <p className="text-emerald-700 mt-1">
                  Your tool will be reviewed within 72 hours and featured prominently in our directory
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SubmitToolModal; 