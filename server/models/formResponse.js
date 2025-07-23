const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  formId: { type: String, required: true },
  schema: { type: mongoose.Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FormResponse", FormResponseSchema);