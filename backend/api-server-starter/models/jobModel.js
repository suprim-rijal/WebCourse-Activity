const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      contactEmail: { type: String, required: true },
      contactPhone: { type: String, required: true },
    },
  },
  // timestamps adds createdAt/updatedAt, used to sort newest jobs first
  { timestamps: true },
);

// Send "id" instead of "_id" to the frontend and hide "__v"
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
