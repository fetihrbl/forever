import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        
        {/* Emoji icon */}
        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-2xl font-bold text-red-600">
          Ödeme Başarısız
        </h1>

        <p className="text-gray-600 mt-3">
          Ödeme işlemi tamamlanamadı.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Lütfen tekrar deneyin veya farklı bir ödeme yöntemi seçin.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Ana Sayfa
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentFailed;
