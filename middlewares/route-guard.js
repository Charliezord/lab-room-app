const requireLogin = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/login");
    return;
  }

  next();
};

const objectWeWantToExport = {
    requireLogin,
  };
  
  module.exports = objectWeWantToExport;