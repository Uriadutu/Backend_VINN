import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"; // Model pengguna Anda

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });

    // Ambil informasi pengguna dari database berdasarkan ID dalam token
    const foundUser = await User.findByPk(user.id);
    if (!foundUser) return res.status(404).json({ msg: "User not found" });

    req.user = foundUser; // Tambahkan informasi pengguna ke request
    next(); // Lanjutkan ke middleware berikutnya
  });
};

export const verifyRole = (roles) => {
  return (req, res, next) => {
    // Pastikan Anda memiliki mekanisme untuk mengambil user dari token
    const userRole = req.user?.role; // Misalnya, Anda menyimpan role di req.user setelah login

    if (!userRole) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // Periksa apakah role pengguna ada dalam daftar roles yang diizinkan
    if (!roles.includes(userRole)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    next(); // Jika role cocok, lanjutkan ke middleware berikutnya atau route handler
  };
};

export const authorizeAdmin = (req, res, next) => {
  console.log("User Role:", req.user.role); // Check the role of the authenticated user
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};
