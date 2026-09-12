"use client";

import { Button, Modal } from "@heroui/react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[400px]">
            <Modal.CloseTrigger onClick={onClose} />

            <Modal.Header>
              <Modal.Heading>{title}</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-default-500">{message}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="flat"
                onPress={onClose}
                isDisabled={loading}
              >
                Cancel
              </Button>

              <Button
                color="danger"
                onPress={onConfirm}
                isLoading={loading}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}