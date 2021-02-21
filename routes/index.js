const { Router } = require("express");

const router = new Router();
const indexRouter = new Router();

router.use("/", indexRouter);

indexRouter.get("/", (req, res) => {
  // authConroller
  //   .logout()
  //   .then((result) => {
  //     res.json({
  //       success: result.success,
  //       message: result.message
  //     });
  //   })
  //   .catch((error) => {
  //     res.json({
  //       success: false,
  //       message: error.message
  //     });
  //     next(error);
  //   });
  res.send("INDEX PAGE NOT IMPLEMENTED");
});

module.exports = router;
