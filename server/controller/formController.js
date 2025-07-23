
const FormResponse = require('../models/formResponse.js');


const addFormResponse = async (req, res) => {
  try {
    const { formId, schema } = req.body;

    if (!formId || !schema) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    const newResponse = new FormResponse({ formId, schema });
    await newResponse.save();

    // Convert to plain object and fallback if createdAt missing
    const responseObj = newResponse.toObject();

    const createdAt = newResponse.createdAt || newResponse._doc?.createdAt || new Date();

    responseObj.createdAt = new Date(createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // You can also add a "submittedAt" field if needed
    responseObj.submittedAt = new Date(newResponse.submittedAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    res.status(201).json({
      message: "Response saved",
      response: responseObj,
    });
  } catch (err) {
    console.error("Error saving response:", err);
    res.status(500).json({ error: "Failed to save response" });
  }
};







 const getFormResponses = async (req, res) => {
  try {
    const { formId } = req.query;
    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const responses = await  FormResponse.find({ formId });
    res.json(responses);
  } catch (err) {
    console.error("Error fetching responses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addFormResponse,
  getFormResponses
};