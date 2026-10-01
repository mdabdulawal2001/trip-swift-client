import PaymentSuccessClient from "./PaymentSuccessClient";


export const metadata = {
  title: "Payment Successful",
  description:
    "Your TripSwift payment has been processed successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentSuccessPage() {
  return <PaymentSuccessClient />;
}