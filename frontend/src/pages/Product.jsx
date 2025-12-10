import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setMainImage(product.images?.[0]?.url);
    }
  }, [productId, products]);

  if (!productData) return null; // if you don't habe data

  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 border-gray-300">
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Smale pictures */}
        <div className="flex flex-col-reverse sm:flex-row flex-1 gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%] gap-2">
            {productData.images?.map((item, index) => (
              <img
                key={index}
                src={item?.url}
                alt={`product-${index}`}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
                onClick={() => setMainImage(item?.url)}
              />
            ))}
          </div>

          {/* Main picture */}
          <div className="w-full sm:w-[80%]">
            <img src={mainImage} alt="main-product" className="w-full h-auto" />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5 " />
            <img src={assets.star_icon} alt="" className="w-3.5 " />
            <img src={assets.star_icon} alt="" className="w-3.5 " />
            <img src={assets.star_icon} alt="" className="w-3.5 " />
            <img src={assets.star_dull_icon} alt="" className="w-3.5 " />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
  onClick={() => {
    addToCart(productData._id, size);
  }}
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
>
  ADD TO CART
</button>
          <hr className="mt-8 sm:w-4/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original poduct.</p>
            <p>Cash on delivery is avaible on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm"> Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae
            neque harum at accusantium illo reiciendis rem facilis minus dolor
            adipisci velit aperiam totam libero, laboriosam saepe quos. Beatae,
            veritatis. Similique qui laborum animi magnam quo velit id
            reprehenderit tenetur autem aspernatur repellendus accusantium ipsum
            harum at, odio beatae, officiis, labore officia delectus{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus eligendi non mollitia aperiam sunt repellendus
            deserunt officia ipsa dolorum ab et accusantium dolorem at officiis
            voluptatem, sint quasi a omnis. Autem, voluptates. Officia
            distinctio eum sit ad atque tempore exercitationem quae incidunt
            alias aspernatur! A facere id optio provident tempora perspiciatis
            error temporibus saepe! Obcaecati, culpa dolorum. Voluptatem, et.
            Rerum.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProduct
        category={productData.category}
        subcategory={productData.subcategory}
        currentId={productData._id}
      />
    </div>
  );
};

export default Product;
