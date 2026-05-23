import { InferSchemaType, Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    logoText: { type: String, required: true, trim: true, maxlength: 4 },
    logoColor: { type: String, required: true, default: "#09123a" },
    foundedOn: { type: Date, required: true },
    location: { type: locationSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

companySchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "company"
});

export type CompanyDocument = InferSchemaType<typeof companySchema> & { _id: unknown };
export const Company = model("Company", companySchema);
