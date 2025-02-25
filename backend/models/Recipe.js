const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema({
  title: String,
  Shooting: Boolean,
  VoiceOver: Boolean,
  Editing: Boolean,
  Scheduled: Boolean,
  Uploaded: Boolean,
  ShortMade: Boolean,
  ShortUploaded: Boolean,
  CommunityPostUploaded: Boolean,
  playlist: String,
});
module.exports = mongoose.model("Recipe", RecipeSchema);
