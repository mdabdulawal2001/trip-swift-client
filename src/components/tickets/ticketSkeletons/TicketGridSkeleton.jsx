import TicketCardSkeleton from "./TicketCardSkeleton";

export default function TicketGridSkeleton({ count = 6 }) {
  return (
    <div
      className="
        grid grid-cols-1 gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({ length: count }).map((_, index) => (
        <TicketCardSkeleton key={index} />
      ))}
    </div>
  );
}