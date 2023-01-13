const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    "b0694c0cbf4e7766731193f7ba75b727c79404946ca21ef491c72abd97a688c3c2cee953b9ead6c2ad8883dd28eae57c37b08d2593df5f57bda612ea6cda064a",
    (err, decoded) => {
      if (err) return res.status(403).json({ message: "Restringido" });
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      req.id = decoded.UserInfo.id;
      next();
    }
  );
};

module.exports = verifyJWT;
