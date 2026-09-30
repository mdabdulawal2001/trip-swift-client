"use client";

import { Button, Modal } from "@heroui/react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, LogOut, Trash2 } from "lucide-react";

const ICONS = {
  danger: Trash2,
  warning: AlertTriangle,
  success: CheckCircle2,
  logout: LogOut,
};

const COLOR_CLASSES = {
  danger: {
    icon: "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400",
    button: "danger",
  },

  warning: {
    icon: "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
    button: "warning",
  },

  success: {
    icon: "bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
    button: "success",
  },

  primary: {
    icon: "bg-sky-50 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400",
    button: "primary",
  },

  logout: {
    icon: "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400",
    button: "danger",
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

  icon,
}) {
  const safeColor = COLOR_CLASSES[confirmColor]
    ? confirmColor
    : "danger";

  const Icon =
    icon || ICONS[safeColor] || AlertTriangle;

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
    >
      <Modal.Backdrop
        className="
          bg-slate-950/50
          backdrop-blur-sm
          dark:bg-black/60
        "
      >
        <Modal.Container>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
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
                sm:max-w-[420px]

                overflow-hidden

                rounded-2xl

                border
                border-slate-200

                bg-white

                shadow-[0_25px_70px_rgba(15,23,42,0.18)]

                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-black/40
              "
            >
              {/* CLOSE BUTTON */}

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
                  items-start
                  gap-4
                  px-6
                  pt-6
                  pb-3
                "
              >
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl

                    ${COLOR_CLASSES[safeColor].icon}
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 pr-6">
                  <Modal.Heading
                    className="
                      text-lg
                      font-bold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    {title}
                  </Modal.Heading>
                </div>
              </Modal.Header>

              {/* BODY */}

              <Modal.Body className="px-6 py-3">
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
                  gap-2
                  px-6
                  pb-6
                  pt-4
                "
              >
                <Button
                  variant="flat"
                  onPress={handleClose}
                  isDisabled={loading}
                  className="
                    min-h-10
                    flex-1
                    rounded-xl

                    bg-slate-100
                    font-semibold
                    text-slate-700

                    hover:bg-slate-200

                    dark:bg-slate-800
                    dark:text-slate-200
                    dark:hover:bg-slate-700
                  "
                >
                  {cancelText}
                </Button>

                <Button
                  color={COLOR_CLASSES[safeColor].button}
                  onPress={handleConfirm}
                  isLoading={loading}
                  isDisabled={loading}
                  className="
                    min-h-10
                    flex-1
                    rounded-xl
                    font-semibold
                  "
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