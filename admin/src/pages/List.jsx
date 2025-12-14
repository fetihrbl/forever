import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  // Ürünleri getir
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products);
    } catch (error) {
      toast.error("Ürünler alınırken hata oluştu");
    }
  };

  // Ürün silme
  const deleteProduct = async (id) => {
    if (!confirm("Bu ürünü silmek istediğine emin misin?")) return;

    try {
      await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Ürün Başarıyla silindi");

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Ürün silinirken bir hata oluştu");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className="mb-2 text-xl font-semibold">All Products</p>

      <div className="flex flex-col gap-2">
        {/* Desktop Table Header */}
        <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {products.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] 
                 items-center gap-2 py-2 px-3 border text-sm"
          >
            {/* Image */}
            <div className="flex justify-center md:justify-start">
              <img
                src={item.images?.[0]?.url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-sm"
              />
            </div>

            {/* Name */}
            <span className="font-medium">{item.name}</span>

            {/* Category (mobile’da gizlenmez) */}
            <span className="text-gray-600 hidden md:block">
              {item.category}
            </span>

            {/* Price — mobile’da small screen için gizli */}
            <span className="hidden md:block font-semibold">
              {currency}
              {item.price}
            </span>

            {/* Delete Button */}
            <div className="flex justify-end md:justify-center">
              <button
                onClick={() => deleteProduct(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </>
  );
};

export default List;
