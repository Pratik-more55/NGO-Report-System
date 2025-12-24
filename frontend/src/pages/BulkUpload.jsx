import { useState } from "react";
import { Container, Card, CardContent, Typography, Button, LinearProgress, Box } from "@mui/material";
import axios from "axios";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await axios.post("http://localhost:5000/api/reports/upload", form);
    const jobId = res.data.jobId;

    const interval = setInterval(async () => {
      const status = await axios.get(`http://localhost:5000/api/job-status/${jobId}`);
      setProgress(status.data);
      if (status.data.processed === status.data.total) clearInterval(interval);
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">Bulk CSV Upload</Typography>

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <Button variant="contained" sx={{ mt: 2 }} onClick={upload}>
            Upload CSV
          </Button>

          {progress && (
            <Box sx={{ mt: 3 }}>
              <Typography>Processed: {progress.processed}/{progress.total}</Typography>
              <Typography color="error">Failed: {progress.failed}</Typography>
              <LinearProgress
                variant="determinate"
                value={(progress.processed / progress.total) * 100}
                sx={{ mt: 1 }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
