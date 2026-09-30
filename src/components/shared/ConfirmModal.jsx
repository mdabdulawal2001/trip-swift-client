"use client";

import { Button, Modal } from "@heroui/react";
import { motion } from "framer-motion";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  LogOut,
  Trash2,
} from "lucide-react";

const ICONS = {
  danger: Trash2,
  warning: AlertTriangle,
  success: CheckCircle2,
  primary: Info,
  info: Info,
  black: LogOut,
  neutral: AlertTriangle,
};

const COLOR_STYLES = {
  danger: {
    icon: "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400",
    button:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600",
  },

  warning: {
    icon:
      "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
    button:
      "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600",
  },

  success: {
    icon:
      "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
    button:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-600",
  },

  primary: {
    icon:
      "bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400",
    button:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600",
  },

  info: {
    icon:
      "bg-sky-50 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400",
    button:
      "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-600",
  },

  black: {
    icon:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    button:
      "bg-slate-900 text-white hover:bg-black active:bg-slate-950 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
  },

  neutral: {
    icon:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    button:
      "bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500",
  },
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  loading = false,
  icon: CustomIcon,
  size = "sm",
}) {
  const safeColor = COLOR_STYLES[confirmColor]
    ? confirmColor
    : "danger";

  const styles = COLOR_STYLES[safeColor];

  const Icon =
    CustomIcon || ICONS[safeColor] || AlertTriangle;

  const handleClose = () => {
    if (loading) return;

    onClose?.();
  };

  const handleConfirm = async () => {
    if (loading) return;

    await onConfirm?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open && !loading) {
          onClose?.();
        }
      }}
      size={size}
      placement="center"
      className="z-[100]"
    >
      <Modal.Backdrop
        className="
          fixed
          inset-0
          z-[100]

          flex
          items-center
          justify-center

          bg-slate-950/50
          backdrop-blur-sm

          dark:bg-black/70
        "
      >
        <Modal.Container
          className="
            relative
            flex
            mx-5
            md:mx-0
            md:w-[calc(100vw-24px)]
            md:max-w-[420px]
            max-h-[calc(100dvh-24px)]

            items-center
            justify-center

            p-0

            sm:w-[420px]
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 8,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <Modal.Dialog
              className="
                w-full
                overflow-hidden
                rounded-2xl

                border
                border-slate-200

                bg-white

                shadow-[0_25px_80px_rgba(15,23,42,0.20)]

                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/50
              "
            >
              {!loading && (
                <Modal.CloseTrigger
                  onClick={handleClose}
                  className="
                    text-slate-400

                    hover:bg-slate-100
                    hover:text-slate-700

                    dark:hover:bg-slate-800
                    dark:hover:text-slate-200
                  "
                />
              )}

              {/* HEADER */}

              <Modal.Header
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  pt-5
                  pb-3

                  sm:px-6
                  sm:pt-6
                "
              >
                <Modal.Icon
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl

                    ${styles.icon}
                  `}
                >
                  <Icon className="h-5 w-5" />
                </Modal.Icon>

                <Modal.Heading
                  className="
                    min-w-0
                    pr-6

                    text-base
                    font-bold
                    leading-6
                    text-slate-900

                    sm:text-lg

                    dark:text-white
                  "
                >
                  {title}
                </Modal.Heading>
              </Modal.Header>

              {/* BODY */}

              <Modal.Body
                className="
                  px-5
                  py-3

                  sm:px-6
                "
              >
                <p
                  className="
                    text-sm
                    leading-6
                    text-slate-500

                    dark:text-slate-400
                  "
                >
                  {message}
                </p>
              </Modal.Body>

              {/* FOOTER */}

              <Modal.Footer
                className="
                  flex
                  flex-col-reverse
                  gap-2

                  px-5
                  pb-5
                  pt-4

                  sm:flex-row
                  sm:px-6
                  sm:pb-6
                "
              >
                <Button
                  variant="secondary"
                  onPress={handleClose}
                  isDisabled={loading}
                  className="
                    min-h-10
                    w-full
                    rounded-xl
                    font-semibold

                    sm:flex-1
                  "
                >
                  {cancelText}
                </Button>

                <Button
                  onPress={handleConfirm}
                  isLoading={loading}
                  isDisabled={loading}
                  className={`
                    min-h-10
                    w-full
                    rounded-xl
                    font-semibold
                    transition-colors

                    sm:flex-1

                    ${styles.button}
                  `}
                >
                  {confirmText}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </motion.div>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}