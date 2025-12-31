import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ConnectionErrorPopupProps {
  onRetry: () => void;
  onClose: () => void;
}

const ConnectionErrorPopup = ({ onRetry, onClose }: ConnectionErrorPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-red-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Connection Failed
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-8">
          Unable to connect to the game server. Please check your internet connection and try again.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-br from-[#6B0D00] to-[#8B1000] hover:from-red-900 hover:to-red-800 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Connection
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Additional Help Text */}
        <p className="text-xs text-gray-500 text-center mt-6">
          If the problem persists, please try refreshing the page or contact support.
        </p>
      </div>
    </div>
  );
};

export default ConnectionErrorPopup;