import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // ---- Handle Image Upload ---- //
  const handleImageUpload = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // ---- Handle Size Selection ---- //
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // ---- Handle Submit ---- //
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price || sizes.length === 0) {
      return toast.error("Lütfen tüm zorunlu alanları doldurun!");
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller);

    images.forEach((img) => {
      if (img) formData.append("images", img);
    });
// "Content-Type": "multipart/form-data"
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Ürün başarıyla eklendi!");

      // Form resetleme
      setImages([null, null, null, null]);
      setProductName("");
      setDescription("");
      setCategory("Men");
      setSubCategory("Topwear");
      setPrice("");
      setSizes([]);
      setBestseller(false);
    } catch (err) {
      toast.error("Ürün eklenirken hata oluştu!");
      console.log(err);
    }
  };

  const sizeList = ["S", "M", "L", "XL", "XXL"];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-4"
    >
      {/* UPLOAD IMAGES */}
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex gap-3">
          {images.map((img, index) => (
            <label key={index}>
              <img
                className="w-15 h-15 sm:w-20 sm:h-20 object-cover cursor-pointer rounded-sm"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt="upload"
              />
              <input
                type="file"
                hidden
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>
      {/* PRODUCT NAME */}
      <div className="w-full">
        <p className="mb-1 font-semibold">Product Name</p>
        <input
          type="text"
          placeholder="Product name"
          required
          className="w-full max-w-[400px] sm:max-w-[500px] px-3 py-2 border rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      {/* DESCRIPTION */}
      <div className="w-full">
        <p className="mb-1 font-semibold">Description</p>
        <textarea
          placeholder="Product description"
          required
          className="w-full max-w-[400px] sm:max-w-[500px] px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* CATEGORY ROW */}
      <div className="flex flex-col sm:flex-row gap-5">
        <div>
          <p className="mb-1 font-semibold">Category</p>
          <select
            className="border px-3 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-semibold">Sub Category</p>
          <select
            className="border px-3 py-2 rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-1 font-semibold">Price</p>
          <input
            type="number"
            placeholder="25"
            className="border px-3 py-2 w-[100px] sm:w-[120px] rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      {/* SIZE SELECTOR */}
      <div>
        <p className="mb-1 font-semibold">Sizes</p>
        <div className="flex gap-2">
          {sizeList.map((size) => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded cursor-pointer 
          ${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"}
        `}
            >
              {size}
            </p>
          ))}
        </div>
      </div>
      {/* BESTSELLER */}
      <div className="flex items-center gap-2 mt-1">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-28 py-3 mt-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
