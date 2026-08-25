import { Check, CreditCard, MapPin, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "اطلاعات ارسال",
    icon: <MapPin />,
  },
  {
    id: 2,
    title: "تأیید سفارش",
    icon: <CheckCheck />,
  },
  {
    id: 3,
    title: "پرداخت",
    icon: <CreditCard />,
  },
  
];

export default function CheckoutTimeline({ currentStep }) {
  return (
    <div dir="rtl" className="mx-auto w-full max-w-[760px] px-4 sm:px-6">
      <div className="relative">
        {/* ===============================================
            CONNECTING LINE
        ================================================ */}

        <div className="absolute left-[16.666%] right-[16.666%] top-[17px] h-px bg-white/10">
          <motion.div
            initial={false}
            animate={{
              width:
                currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full bg-somak-gold"
          />
        </div>

        {/* ===============================================
            STEPS
        ================================================ */}

        <div className="relative flex items-start justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;

            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex w-1/3 flex-col items-center">
                {/* =========================================
                    CIRCLE
                ========================================== */}

                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 0.96,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={`relative z-10 flex h-[35px] w-[35px] items-center justify-center rounded-full border ${
                    isCompleted || isCurrent
                      ? "border-somak-gold bg-somak-gold text-somak-950"
                      : "border-white/15 bg-somak-900 text-white/35"
                  } `}
                >
                  {isCompleted ? (
                    <Check size={17} strokeWidth={2} />
                  ) : (
                    <span className="text-[12px] font-medium">{step.icon}</span>
                  )}
                </motion.div>

                {/* =========================================
                    TITLE
                ========================================== */}

                <motion.span
                  initial={false}
                  animate={{
                    color:
                      isCurrent || isCompleted
                        ? "#f2c55d"
                        : "rgba(255,255,255,0.38)",
                  }}
                  className="mt-3 whitespace-nowrap text-[11px] font-medium sm:text-xs"
                >
                  {step.title}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
