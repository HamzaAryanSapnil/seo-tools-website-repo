// models/Tool.js
import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  label: {
    type: String,
    required: true,
    minlength: 2,
  },
  type: {
    type: String,
    required: true,
    enum: ["text", "number", "boolean", "select"],
  },
  description: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  options: {
    type: [
      {
        value: {
          type: String,
          required: true,
          minlength: 1,
        },
        label: {
          type: String,
          required: true,
          minlength: 1,
        },
        
      },
    ],
    validate: {
      validator: function (options) {
        // Validation matches Zod rules
        if (this.type === "select") {
          return options && options.length > 0;
        }
        return true;
      },
      message: "Select fields require at least one option",
    },
  },
});

const toolSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9-]+$/,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  fields: {
    type: [fieldSchema],
    required: true,
    validate: {
      validator: (fields) => fields.length > 0,
      message: "At least one configuration field is required",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for slug uniqueness
// toolSchema.index({ slug: 1 }, { unique: true });

// Add compound index for common queries
toolSchema.index({ category: 1, createdAt: -1 });

const ToolModel = mongoose.models.Tool ?? mongoose.model("Tool", toolSchema);

export default ToolModel;
