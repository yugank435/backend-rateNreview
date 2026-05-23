import { InferSchemaType, Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewerName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    likes: { type: Number, required: true, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export type ReviewDocument = InferSchemaType<typeof reviewSchema> & { _id: unknown };
export const Review = model("Review", reviewSchema);
