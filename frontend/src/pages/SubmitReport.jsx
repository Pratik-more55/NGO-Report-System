import { useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

export default function SubmitReport() {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await axios.post("https://ngo-report-system.onrender.com/api/report", form);
      alert("Report submitted successfully");
    } catch {
      alert("Duplicate or invalid report");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Submit Monthly NGO Report
          </Typography>

          <Grid container spacing={2}>
            {["ngoId","month","peopleHelped","eventsConducted","fundsUtilized"].map((f) => (
              <Grid item xs={12} sm={6} key={f}>
                <TextField
                  fullWidth
                  label={f.replace(/([A-Z])/g," $1")}
                  name={f}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={submit}
          >
            Submit Report
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

