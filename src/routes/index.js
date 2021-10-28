const { Router } = require("express");
const Info = require("../model/info.js");

const router = Router();

// Render all tasks
router.get("/", async (req, res) => {
  try {
    const infos = await Info.find().lean();
    res.render("index", {
      infos,
    });
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
});

router.post("/info/add", async (req, res, next) => {
  try {
    const info = new Info(req.body);
    await info.save();
    res.redirect("/");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
});

router.get("/info/:id/", async (req, res, next) => {
  let { id } = req.params;
  const info = await Info.findById(id);
  await info.save();
  res.redirect("/");
});

router.get("/info/:id/edit", async (req, res, next) => {
  const info = await Info.findById(req.params.id).lean();
  res.render("edit", { info });
});

router.post("/info/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  await Info.updateOne({ _id: id }, req.body);
  res.redirect("/");
});

router.get("/info/:id/delete", async (req, res, next) => {
  let { id } = req.params;
  await Info.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
