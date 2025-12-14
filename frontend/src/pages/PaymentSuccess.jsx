import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders"); // Siparişlerim
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        
        {/* Icon yerine emoji */}
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-2xl font-semibold">
          Ödeme Başarılı 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Siparişiniz başarıyla alındı.
        </p>

        <p className="text-sm text-gray-400 mt-4">
          Siparişlerim sayfasına yönlendiriliyorsunuz...
        </p>

      </div>
    </div>
  );
};

export default PaymentSuccess;
