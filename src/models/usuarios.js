import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre:String,
  contrasena: String,
  correo: String,
 
});

export default mongoose.model("usuarios", usuarioSchema);
