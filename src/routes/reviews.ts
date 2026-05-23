import { Router } from "express";
import { z } from "zod";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { Company } from "../models/Company";
import { Review } from "../models/Review";

const router = Router();

const reviewSchema = z.object({
  reviewerName: z.string().min(2),
  subject: z.string().min(3),
  text: z.string().min(10),
  rating: z.number().min(1).max(5)
});

const sortMap: Record<string, Record<string, 1 | -1>> = {
  date: { createdAt: -1 },
  rating: { rating: -1, createdAt: -1 },
  relevance: { likes: -1, rating: -1, createdAt: -1 }
};

const serializeReview = (review: any) => ({
  id: review._id,
  reviewerName: review.reviewerName,
  subject: review.subject,
  text: review.text,
  rating: review.rating,
  likes: review.likes,
  createdAt: review.createdAt
});

router.get("/company/:companyId", async (req, res, next) => {
  try {
    const sort = sortMap[String(req.query.sort ?? "relevance")] ?? sortMap.relevance;
    const reviews = await Review.find({ company: req.params.companyId }).sort(sort);
    const count = reviews.length;
    const averageRating = count ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / count).toFixed(1)) : 0;

    return res.json({ averageRating, count, reviews: reviews.map(serializeReview) });
  } catch (error) {
    return next(error);
  }
});

router.post("/company/:companyId", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ message: "Company not found." });

    const input = reviewSchema.parse(req.body);
    const review = await Review.create({ ...input, company: company._id, user: req.user?.id });
    return res.status(201).json(serializeReview(review));
  } catch (error) {
    return next(error);
  }
});

router.post("/:reviewId/like", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    const userId = req.user?.id;
    const alreadyLiked = review.likedBy.some((id) => String(id) === userId);
    if (alreadyLiked) {
      review.likedBy = review.likedBy.filter((id) => String(id) !== userId);
      review.likes = Math.max(0, review.likes - 1);
    } else {
      review.likedBy.push(userId as any);
      review.likes += 1;
    }

    await review.save();
    return res.json(serializeReview(review));
  } catch (error) {
    return next(error);
  }
});

export default router;
