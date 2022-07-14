import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../models/usuarios.js";

const localStrategy = Strategy;

passport.use(
  "registro",
  new localStrategy(
    {
      usernameField: "correo",
      passwordField: "password",
      passReqToCallBack: true,
    },
    async (req, correo, password, done) => {
      const userBD = await Usuarios.findOne({ correo });
      if (userBD) {
        return done(null, false);
      }
      const userNew = new Usuarios();
      userNew.correo = correo;
      userNew.contrasena = password;
      await userNew.save();
      done(null, userNew);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "correo",
      passwordField: "password",
      passReqToCallBack: true,
    },
    async (req, correo, password, done) => {
      const userBD = await Usuarios.findOne({ correo });
      if (!userBD) {
        return done(null, false);
      }

      done(null, userNew);
    }
  )
);
passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.findById(id);
  done(null, usuario);
});
