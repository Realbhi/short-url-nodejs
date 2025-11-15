const { getUser } = require("../service/auth");

// earlier we were using cookies to store the token, now we are using headers to store the token
// restrictToLoggedinUserOnly and CheckAuth have same repetative code so merge them into a single function

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookis?.uid;
//   const userUid = req.headers["authorization"];
//   if (!userUid) return res.redirect("/login");

//   // get the token with split:
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];
//   if (!userUid) {
//     req.user = null;
//     return next();
//   }
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   req.user = user;
//   next();
// }

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// NOTE : Authentication ::
function checkforAuthentication(req, res, next) {
  // if header were used to send/receive token :::

  // req.user = null;
  // const authorizationHeaderValue = req.headers["authorization"];
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // ) {
  //   return next();
  // }
  // //  fetch token to get user:
  // const token = req.headers["authorization"].split("Bearer ")[1];
  // // getuser
  // const user = getUser(token);
  // req.user = user;
  // return next();

  //Token based but using cookie
  req.user = null;
  const tokenCookie = req.cookies?.token;
  if (!tokenCookie) {
    console.log("User not register yet");
    return next();
  }
  // getuser
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
}

// NOTE : Authorization ::
function restricTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    console.log(`Email: ${req.user.email} , Role : ${req.user.role}`);
    console.log("Roles array", roles);

    if (!roles.includes(req.user.role)) {
      return res.end("Your are not authorized....IMPOSTER 🐐");
    }

    return next();
  };
}

module.exports = {
  checkforAuthentication,
  restricTo,
};
