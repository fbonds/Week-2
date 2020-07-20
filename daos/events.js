const Events = require('../models/events');

module.exports = {};
  
module.exports.create = async (name,date) => {
  return await Events.create({ name,date });
};

module.exports.getById = async (id) => {
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.getAll = async () => {
  try {
    const event = await Events.find().lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.updateName = async (id,reqbody) => {
  try {
    const event = await Events.update({ _id: id},{$set:reqbody})
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.delete = async (id) => {
  try {
    const event = await Events.deleteOne({ _id: id })
    return event;
  } catch (e) {
    return null;
  }
};
