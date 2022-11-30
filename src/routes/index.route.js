import express from "express";

import userRoute from "../routes/user.route.js"
import blogRoute from "../routes/blog.route.js"
import uploadRoute from "../routes/upload.route.js"

const apiRoute = express();

apiRoute.use("/uploads", uploadRoute)
apiRoute.use("/users", userRoute);
apiRoute.use("/blogs", blogRoute)

export default apiRoute;