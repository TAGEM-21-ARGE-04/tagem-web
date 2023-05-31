import { Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "utils/Api";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllJGroup = async () => {}

  const handleDlete = async (row) => {
  }

  const columns = [
    {
      id: 1,
      name: "Name",
      accesor: "name"
    },
    {
      id: 2,
      name: "Group",
      accesor: "group"
    },
    {
      id: 3,
      name: "Application",
      customAccesor: () => "taima",
    },
    {
      id: 4, 
      name: "cron",
      accesor: "cron"
    },
    {
      id: 4, 
      name: "url",
      customAccesor: (row) => `${row.processes[0]?.processType} : ${row.processes[0]?.url}`
    },
    {
      id: 5,
      name: "Actions",
      customAccesor: (row) => (
        <Stack direction="row" spacing={1} >
          <Button color="info" variant="contained">Edit</Button>
          <Button onClick={() => handleDlete(row)} color="error" variant="contained">Delete</Button>
        </Stack>
      ),
    }
  ]

  const handleSave = async (data) => {
    try {
        const res = await axios.post("scheduler", data);
        getAllJGroup();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllJGroup();
  }, []);

  return (
    <>
      <h1>ASD</h1>
    </>
  );
};

export default Home;