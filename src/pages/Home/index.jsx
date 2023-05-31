import { Button, Paper, Stack } from "@mui/material";
import BasicTable from "component/table/Table";
import { useEffect, useState } from "react";
import axios from "utils/Api";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllJGroup = async () => {
    const res = await axios.get("group");
    
    console.log({ res });

    setGroups(res);
  }

  const handleDlete = async (row) => {
  }

  const columns = [
    {
      id: 0,
      name: "Id",
      accesor: "id"
    },
    {
      id: 1,
      name: "Name",
      accesor: "name"
    },
    {
      id: 2,
      name: "Description",
      accesor: "description"
    },
    {
      id: 3,
      name: "FlowerCount",
      accesor: "flowerCount",
    },
    {
      id: 4,
      name: "Start Date",
      accesor: "startDate",
    },
    {
      id: 6,
      name: "Last Process Date",
      accesor: "lastProcessDate"
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
      <Stack direction="column" sx={{ marginLeft: "8%", marginRight: "8%", marginTop: "4rem" }} alignItems="center">
        <Stack  sx={{ width: "70%" }} direction="row"  justifyContent="flex-end">
          <Button onClick={handleOpen} variant="contained">
            Create New
          </Button>
        </Stack>
        <Stack sx={{ width: "70%", paddingTop: "1rem" }}>
          <Paper sx={{padding: 2}} elevation={5}>
              <BasicTable rows={groups} columns={columns} />
            </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;