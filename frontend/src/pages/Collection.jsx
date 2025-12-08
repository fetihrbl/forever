import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // For debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms gecikme

    return () => clearTimeout(handler);
  }, [search]);

  // Toggle category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle subcategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Apply filters
  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && debouncedSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  // Sort products
  const sortProduct = () => {
    let sorted = [...filterProducts];

    switch (sortType) {
      case "low-high":
        sorted.sort((a, b) => a.price - b.price);
        setFilterProducts(sorted);
        break;

      case "high-low":
        sorted.sort((a, b) => b.price - a.price);
        setFilterProducts(sorted);
        break;

      default:
        applyFilter(); // relevant
        break;
    }
  };

  // Apply filters when category, subCategory, products, or debouncedSearch change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, debouncedSearch, showSearch]);

  // Sort when sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown_icon"
            className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Men" className="w-3" onChange={toggleCategory} />
              Men
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Women" className="w-3" onChange={toggleCategory} />
              Women
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Kids" className="w-3" onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* Subcategory */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Topwear" className="w-3" onChange={toggleSubCategory} />
              Topwear
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Bottomwear" className="w-3" onChange={toggleSubCategory} />
              Bottomwear
            </label>
            <label className="flex gap-2">
              <input type="checkbox" value="Winterwear" className="w-3" onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2 outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
