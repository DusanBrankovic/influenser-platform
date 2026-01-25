import { ToastContainer } from "react-toastify";

export type AreYouSureModalProps = {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function AreYouSureModal({
  text,
  isOpen,
  onClose,
  onConfirm,
}: AreYouSureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 w-screen h-screen">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg mb-4">{text}</h2>
        <div className="flex justify-end gap-3">
          <button className="bg-gray-300 text-black px-4 py-2 rounded-lg cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={onConfirm}>
            Delete
          </button>
           <ToastContainer />
        </div>
      </div>
    </div>
  );
}
