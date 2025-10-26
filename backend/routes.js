import express from "express";
import { getConnections } from "./service.js";
const router = express.Router();

router.get("/connections", async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: "Missing start or end time" });
    }
    const data = await getConnections(start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
