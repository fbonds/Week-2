const { Router } = require("express");
const router = Router();

const CalendarDAO = require('../daos/calendars');

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  if (!name) {
    res.status(400).send('body parameter "name" is required"');
  } else {
    const calendar = await CalendarDAO.create(name);
    res.json(calendar);
  }
});

router.get("/", async (req, res, next) => {
  const calendar = await CalendarDAO.getAll();
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.getById(req.params.id);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.updateName(req.params.id,req.body);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res, next) => {
  const calendar = await CalendarDAO.delete(req.params.id);
  if (calendar) {
    res.json(calendar);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;