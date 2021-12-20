const { Router } = require("express");
const { validationResult } = require("express-validator/check");
const Event = require("../models/event");
const auth = require("../middleware/auth");
const { eventValidators } = require("../utils/validators");
const router = Router();

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Добавить событие",
    isAdd: true
  });
});

router.post("/", auth, eventValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Добавить событие",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        price: req.body.price,
        paidEntry: req.body.paidEntry,
        img: req.body.img,
        date: req.body.date,
        time: req.body.time
      }
    });
  }

  const event = new Event({
    title: req.body.title,
    price: req.body.price,
    paidEntry: req.body.paidEntry,
    date: req.body.date,
    time: req.body.time,
    img: req.body.img,
    userId: req.user
  });

  try {
    await event.save();
    res.redirect("/events");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
