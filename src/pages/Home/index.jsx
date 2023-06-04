import { Button, Paper, Stack } from "@mui/material";
import BasicTable from "component/table/Table";
import { useEffect, useState } from "react";
import axios from "utils/Api";
import { useNavigate } from "react-router-dom";
import DataGrid from "component/table/DataTable";
import CompareIcon from '@mui/icons-material/Compare';
import MonitorIcon from '@mui/icons-material/Monitor';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllJGroup = async () => {
    const res = await axios.get("group");
  
    setGroups(res);
  }

  const navigate = useNavigate();
  const handleDlete = async (row) => {}
  const handleOpenDetails = (row) => navigate(`/details/${row.id}`)   ; 
  const columns = [
    {
      id: 0,
      label: "Id",
      field: "id",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 1,
      label: "Name",
      field: "name",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 2,
      label: "Description",
      field: "description",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 3,
      label: "Flower Count",
      field: "flowerCount",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 4,
      label: "Start Date",
      field: "startDate",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 6,
      label: "Last Process Date",
      field: "lastProcessDate",
      numeric: false,
      disablePadding: true,
    },
    {
      id: 5,
      label: "Actions",
      accesor: (row) => (
        <Stack direction="row" spacing={1} >
          <Button onClick={() => handleOpenDetails(row)} color="warning" variant="contained"><MonitorIcon /></Button>
          <Button color="info" variant="contained"><EditIcon /></Button>
          <Button onClick={() => handleDlete(row)} color="error" variant="contained"><DeleteIcon /></Button>
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
    <Stack direction="row" justifyContent="center">
      <Stack direction="column" sx={{ width: "70%", marginTop: "4rem" }} justifyContent="center" alignContent="center" alignItems="center">
        <Stack  sx={{ width: "100%" }} direction="row"  justifyContent="flex-end">
          <Button onClick={handleOpen} variant="contained">
            Create New
          </Button>
        </Stack>
        <Stack sx={{ width: "100%", paddingTop: "1rem" }}>
          <Paper sx={{padding: 2}} elevation={5}>
              {
                /* <BasicTable rows={groups} columns={columns} /> */
              }
              <DataGrid toolbar={{
                  icon: <CompareIcon />,
                  onClick: (selected) => { 
                    navigate(`/comparison/${selected[0]}/${selected[1]}`)
                    console.log(selected);
                  }
              }} rows={groups} columns={columns} />
            </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;