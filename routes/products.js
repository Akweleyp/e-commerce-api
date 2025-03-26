import { Router } from "express";
import {
  addProduct,
  countProducts,
  deleteProduct,
  getProducts,
  replaceProduct,
  updateProduct,
} from "../controllers/products.js";
import {
  localUpload,
  productImageUpload,
  productPicturesUpload,
  remoteUpload,
} from "../middlewares/upload.js";
import { authentication } from "../middlewares/authentication.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

//Create product router
const productsRouter = Router();

//Define routes
productsRouter.post(
  "/products", 
  
  isAuthenticated,
  isAuthorized(['superadmin','admin']),
  // authentication,
  //   productImageUpload.single("image"),
  productPicturesUpload.array("pictures", 3),
  addProduct
);

productsRouter.get("/products", getProducts);

productsRouter.get("/products/count", countProducts);

productsRouter.patch("/products/:id", isAuthenticated, updateProduct);

productsRouter.put(
  "/products/:id",
  isAuthenticated,
  productPicturesUpload.array("pictures", 3),
  replaceProduct
);
productsRouter.delete("/products/id", isAuthenticated, deleteProduct);

//Export router
export default productsRouter;
