import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";


// ------------------------
// GET ALL PRODUCTS
// ------------------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------
// GET SINGLE PRODUCT
// ------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------
// CREATE PRODUCT (MULTIPLE IMAGES)
// ------------------------
export const createProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      category,
      subCategory,
      sizes, // string olarak geliyor
      bestseller,
    } = req.body;

    // ------------------------
    // sizes string → array
    // ------------------------
    if (!sizes) sizes = [];
    else if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes); // "[\"S\",\"M\",\"L\"]" → ["S","M","L"]
      } catch {
        sizes = sizes.split(",").map((s) => s.trim()); // "S,M,L" → ["S","M","L"]
      }
    }

    // ------------------------
    // Görselleri yükle
    // ------------------------
    let imageData = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageData.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // ------------------------
    // Ürünü oluştur
    // ------------------------
    const product = await Product.create({
      name,
      description,
      price,
      images: imageData,
      category,
      subCategory,
      sizes, // artık array
      bestseller: bestseller || false,
      date: Date.now(),
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CreateProduct error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ------------------------
// UPDATE PRODUCT (MULTIPLE IMAGES)
// ------------------------
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.sizes = sizes || product.sizes;
    product.bestseller = bestseller ?? product.bestseller;

    // Yeni resimler yüklendiyse (public_id + url)
    if (req.files && req.files.length > 0) {
      let newImageData = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        newImageData.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      product.images = [...product.images, ...newImageData];
    }

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------
// DELETE PRODUCT
// ------------------------
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Cloudinary görsellerini sil
    for (const img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // DB’den sil
    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
