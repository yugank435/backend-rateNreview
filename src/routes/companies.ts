import { Router } from "express";
import { z } from "zod";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { Company } from "../models/Company";
import { Review } from "../models/Review";
import { isKnownLocation } from "../data/locations";

const router = Router();

const companySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  logoText: z.string().min(1).max(4),
  logoColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  foundedOn: z.string().date(),
  location: z.object({
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    address: z.string().min(4)
  })
});

const serializeCompany = async (company: any) => {
  const reviews = await Review.find({ company: company._id });
  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1))
    : 0;

  return {
    id: company._id,
    name: company.name,
    description: company.description,
    logoText: company.logoText,
    logoColor: company.logoColor,
    foundedOn: company.foundedOn,
    location: company.location,
    reviewCount,
    averageRating
  };
};

router.get("/", async (req, res, next) => {
  try {
    const search = String(req.query.search ?? "").trim();
    const city = String(req.query.city ?? "").trim();
    const state = String(req.query.state ?? "").trim();
    const country = String(req.query.country ?? "").trim();
    const sort = String(req.query.sort ?? "name");
    const filter: Record<string, unknown> = {};

    if (search) filter.$or = [{ name: new RegExp(search, "i") }, { description: new RegExp(search, "i") }];
    if (city) filter["location.city"] = city;
    if (state) filter["location.state"] = state;
    if (country) filter["location.country"] = country;

    const companies = await Company.find(filter).sort(sort === "date" ? { foundedOn: -1 } : { name: 1 });
    const payload = await Promise.all(companies.map(serializeCompany));
    return res.json(payload);
  } catch (error) {
    return next(error);
  }
});

router.post("/", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const input = companySchema.parse(req.body);
    if (!isKnownLocation(input.location.city, input.location.state, input.location.country)) {
      return res.status(422).json({ message: "Please select a verified city, state, and country." });
    }

    const company = await Company.create({ ...input, foundedOn: new Date(input.foundedOn), createdBy: req.user?.id });
    return res.status(201).json(await serializeCompany(company));
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found." });
    return res.json(await serializeCompany(company));
  } catch (error) {
    return next(error);
  }
});

export default router;
