import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subcategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;

    const filtered = products
      .filter(
        (item) =>
          item._id !== currentId &&      // asıl ürünü hariç tut
          item.category === category &&
          item.subcategory === subcategory
      )
      .slice(0, 5);

    setRelated(filtered);
  }, [products, category, subcategory, currentId]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {related.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          No related products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
