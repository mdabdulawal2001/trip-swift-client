"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";

export default function BookingModal({
  isOpen,
  onClose,
  ticket,
}) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) =>
      Math.min(prev + 1, ticket?.quantity || 1)
    );
  };

  const decrease = () => {
    setQuantity((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const totalPrice =
    Number(ticket?.price || 0) * quantity;

  const handleBooking = () => {
    console.log({
      ticketId: ticket?._id,
      quantity,
      totalPrice,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[500px]">
            <Modal.CloseTrigger onClick={onClose} />

            <Modal.Header>
              <Modal.Heading>Book Your Ticket</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-5">
                <div>
                  <p className="text-lg font-bold">
                    {ticket?.title}
                  </p>

                  <p className="text-sm text-default-500">
                    {ticket?.from} → {ticket?.to}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-default-500">
                    Price per ticket
                  </p>

                  <p className="text-xl font-bold">
                    ৳{ticket?.price}
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Number of Tickets
                  </p>

                  <div className="flex items-center justify-between rounded-xl border p-2">
                    <button
                      type="button"
                      onClick={decrease}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-lg border font-bold disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="text-lg font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increase}
                      disabled={
                        quantity >= (ticket?.quantity || 1)
                      }
                      className="h-10 w-10 rounded-lg border font-bold disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-default-500">
                    Maximum {ticket?.quantity} tickets
                    available.
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-xl border p-4">
                  <span className="font-medium">
                    Total
                  </span>

                  <span className="text-xl font-bold">
                    ৳{totalPrice}
                  </span>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="flat"
                onPress={onClose}
              >
                Cancel
              </Button>

              <Button
                color="primary"
                onPress={handleBooking}
              >
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}