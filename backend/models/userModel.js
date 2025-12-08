import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator"

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Baş ve sondaki boşlukları temizler
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  cartData: {
    type: Object,
    default: {},
  },
  orders: {
    type: Array,
    default: [],
  },
  isAdmin: {
     type: Boolean, 
     default: false 
  }
}, { minimize: false, timestamps: true });

// Şifreyi kaydetmeden önce hashleme
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Şifre kontrol fonksiyonu
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
