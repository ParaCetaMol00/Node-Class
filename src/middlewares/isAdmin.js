const isAdmin = (req, res, next) => {
  console.log("req.user:", req.user);

  if (!req.user) {
    return res.status(401).json({ status: false, message: "Unauthorized: No user found" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ status: false, message: "Access Denied: Admins only" });
  }

  next();
};

module.exports = isAdmin;