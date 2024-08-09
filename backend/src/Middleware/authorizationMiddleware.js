  // const User = require("../Models/User");

  // function authorizeRole(role) {
  //   return async (req, res, next) => {
  //     try {
  //       const user = await User.findById(req.user.id);
        
  //       if (!user) {
  //         return res.sendStatus(404); // User not found
  //       }

  //       const userRole = String(user.role).trim();
  //       const requiredRole = String(role).trim();

  //       // console.log('User role from DB:', user.role, 'Length:', user.role.length);
  //       // console.log('Required role:', role, 'Length:', role.length);
  //       // console.log('Trimmed User role:', userRole, 'Length:', userRole.length);
  //       // console.log('Trimmed Required role:', requiredRole, 'Length:', requiredRole.length);
  //       // console.log('Comparison result:', userRole !== requiredRole);


  //       if (userRole !== requiredRole) {
  //         return res.sendStatus(403); // Forbidden if user does not have the required role
  //       }

  //       next();
  //     } catch (error) {
  //       // console.log(error);
  //       res.status(500).json({ msg: error.message });
  //     }
  //   };
  // }

  // module.exports = { authorizeRole };

  const User = require("../Models/User");

function authorizeRole(role) {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.sendStatus(401); // Unauthorized if user ID is not present
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.sendStatus(404); // User not found
      }

      const userRole = String(user.role).trim().toLowerCase();
      const requiredRole = String(role).trim().toLowerCase();

      if (userRole !== requiredRole) {
        return res.sendStatus(403); // Forbidden if user does not have the required role
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error. Please try again later." });
    }
  };
}

module.exports = { authorizeRole };
