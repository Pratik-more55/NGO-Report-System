import { parseCSV } from "../utils/csvParser.js";
import Report from "../models/Report.js";
import jobQueue from "../queue/jobQueue.js";
import fs from "fs";

export async function processCSV(job) {
  const { jobId, filePath } = job;

  try {
    const rows = await parseCSV(filePath);
    jobQueue[jobId].total = rows.length;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      jobQueue[jobId].processed++;

      try {
        await Report.updateOne(
          { ngoId: row.ngoId, month: row.month },
          {
            $setOnInsert: {
              ngoId: row.ngoId,
              month: row.month,
              peopleHelped: Number(row.peopleHelped),
              eventsConducted: Number(row.eventsConducted),
              fundsUtilized: Number(row.fundsUtilized)
            }
          },
          { upsert: true }
        );
      } catch (err) {
        jobQueue[jobId].failed++;
      }
    }
  } catch (err) {
    jobQueue[jobId].failed = jobQueue[jobId].total;
  } finally {
    fs.unlinkSync(filePath);
  }
}
