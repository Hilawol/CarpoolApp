const driveModel = require('../models/drive.model');


const addDrive = async (req, res) => {
  try {
    console.log("addDrive")
    const drive = new driveModel({
      ...req.body,
    })
    await drive.save();
    return res.send(drive);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

module.exports = {
  addDrive
}