import { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await axios.get(`http://localhost:5000/api/dashboard?month=${month}`);
    setData(res.data);
  };

  const Stat = ({ label, value }) => (
    <Grid item xs={12} sm={6}>
      <Card elevation={3}>
        <CardContent>
          <Typography color="text.secondary">{label}</Typography>
          <Typography variant="h5">{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5">Monthly NGO Dashboard</Typography>

      <TextField
        label="Month (YYYY-MM)"
        sx={{ mt: 2 }}
        onChange={(e) => setMonth(e.target.value)}
      />
      <Button variant="contained" sx={{ ml: 2, mt: 2 }} onClick={load}>
        View
      </Button>

      {data && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Stat label="Total NGOs" value={data.totalNGOs} />
          <Stat label="People Helped" value={data.peopleHelped} />
          <Stat label="Events Conducted" value={data.eventsConducted} />
          <Stat label="Funds Utilized" value={data.fundsUtilized} />
        </Grid>
      )}
    </Container>
  );
}
