import { Router } from "express";
import { getCities, getCountries, getStates } from "../data/locations";

const router = Router();

router.get("/countries", (_req, res) => {
  res.json(getCountries());
});

router.get("/states", (req, res) => {
  const countryCode = String(req.query.countryCode ?? "");
  if (!countryCode) return res.status(400).json({ message: "countryCode is required." });
  return res.json(getStates(countryCode));
});

router.get("/cities", (req, res) => {
  const countryCode = String(req.query.countryCode ?? "");
  const stateCode = String(req.query.stateCode ?? "");
  if (!countryCode || !stateCode) {
    return res.status(400).json({ message: "countryCode and stateCode are required." });
  }
  return res.json(getCities(countryCode, stateCode));
});

export default router;
