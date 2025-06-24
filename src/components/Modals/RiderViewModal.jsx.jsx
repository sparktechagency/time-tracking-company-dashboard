import { Modal } from "@mui/material";

export default function RiderViewModal({ open, onClose, rider }) {
  if (!rider) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        flex flex-col gap-3 w-[500px] bg-[#fff9e3] shadow-2xl
         px-6 py-12 rounded-lg outline-none"
      >
        <p>
          Total Rides:{" "}
          <span className="font-semibold text-lg">{rider?.totalRides}</span>
        </p>
        <p>
          Ongoing Rides:{" "}
          <span className="font-semibold text-lg">{rider?.ongoingRides}</span>
        </p>
        <p>
          Completed Rides:{" "}
          <span className="font-semibold text-lg">{rider?.completedRides}</span>
        </p>
      </div>
    </Modal>
  );
}
