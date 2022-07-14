import { Router } from 'express';
import passport from 'passport';

const router = Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login");
  }
}

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    successRedirect: "/datos",
  })
);

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/errorLogin",
    successRedirect: "/info",
  })
);

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/datos", isAuth, (req, res) => {
  res.render("info", { correo: req.user.correo });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

router.get("/", (req, res) => {
  res.render("login");
});


export default router;
