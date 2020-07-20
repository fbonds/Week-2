const { Router } = require("express");
const router = Router();

const EventDAO = require('../daos/events');

router.post("/", async (req, res, next) => {
  const { name, date } = req.body;
  console.log(name, date)
  if (!name) {
    res.status(400).send('body parameter "entry" is required"');
  } else {
    const event = await EventDAO.create(name,date);
    res.json(event);
  }
});

router.get("/", async (req, res, next) => {
  const event = await EventDAO.getAll();
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", async (req, res, next) => {
  const event = await EventDAO.getById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res, next) => {
  const event = await EventDAO.updateName(req.params.id,req.body);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res, next) => {
  const event = await EventDAO.delete(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;