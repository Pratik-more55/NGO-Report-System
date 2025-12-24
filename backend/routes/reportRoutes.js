import express from "express";
import Report from "../models/Report.js";
import multer from "multer";
import { v4 as uuid } from "uuid";
import jobQueue from "../queue/jobQueue.js";
import { processCSV } from "../workers/csvWorker.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/report", async (req, res) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } =
      req.body;

    await Report.updateOne(
      { ngoId, month },
      {
        $setOnInsert: {
          ngoId,
          month,
          peopleHelped,
          eventsConducted,
          fundsUtilized
        }
      },
      { upsert: true }
    );

    res.json({ message: "Report submitted" });
  } catch {
    res.status(400).json({ error: "Duplicate or invalid data" });
  }
});

router.post("/reports/upload", upload.single("file"), async (req, res) => {
  const jobId = uuid();

  jobQueue[jobId] = { processed: 0, total: 0, failed: 0 };

  setImmediate(() => {
    processCSV({ jobId, filePath: req.file.path });
  });

  res.json({ jobId });
});

router.get("/job-status/:id", (req, res) => {
  const job = jobQueue[req.params.id];
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

router.get("/dashboard", async (req, res) => {
  const { month } = req.query;
  const reports = await Report.find({ month });
  const totalNGOs = new Set(reports.map((r) => r.ngoId)).size;

  res.json({
    totalNGOs,
    peopleHelped: reports.reduce((a, b) => a + b.peopleHelped, 0),
    eventsConducted: reports.reduce((a, b) => a + b.eventsConducted, 0),
    fundsUtilized: reports.reduce((a, b) => a + b.fundsUtilized, 0)
  });
});

export default router;
