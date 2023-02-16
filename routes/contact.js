const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Hello world");
});

router.post("/add", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(200).send({ msg: "Contact add successfully...", newContact });
  } catch (error) {
    res.status(400).send({ msg: "Can not add contact", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const listContacts = await Contact.find();
    res
      .status(200)
      .send({ msg: "This is a list of all contacts", listContacts });
  } catch (error) {
    res.status(400).send({ msg: "Can not get all contacts", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contactToGet = await Contact.findOne({ _id: req.params.id });
    res.status(200).send({ msg: "This one of all contacts", contactToGet });
  } catch (error) {
    res.status(400).send({ msg: "Can not get one contact", error });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await Contact.findOneAndDelete({ _id });
    res.status(200).send({ msg: "Contact deleted " });
  } catch (error) {
    res.status(400).send({ msg: "Can not delete", error });
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Contact.updateOne({_id}, { $set: { ...req.body } });
    res.status(200).send({ msg: "Contact updated " });
  } catch (error) {
    res.status(400).send({ msg: "Can not update", error });
  }
});

module.exports = router;
