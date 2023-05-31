import { Grid, Paper, Stack } from "@mui/material";
import Card from "component/Card";
import TimeChart from "component/chart/TimeChart";
import BasicTable from "component/table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "utils/Api";

const data = [
    { x: new Date("2023-05-01"), y: 10 },
    { x: new Date("2023-05-02"), y: 20 },
    { x: new Date("2023-05-03"), y: 15 },
];

const columns = [
    {
        id: 1,
        name: "id",
        accesor: "id"
    },
    {
        id: 2,
        name: "Group Index",
        accesor: "groupIndex"
    },
]

const Details = () => {
    const params = useParams();
    const [group, setGroup] = useState({ flowers: [] });

    const getGroupDetails = async () => {
        if (params.id == null) return;

        const group = await axios.get(`group/${params.id}`);

        setGroup(group);
    } 

    useEffect(() => {
        getGroupDetails();
    }, []);

    // justifyContent="space-between" alignItems="flex-start" 
    return (
        <Stack sx={{ marginTop: "4rem" }} alignItems="center" justifyContent="center" >
            <Grid sx={{ width: "70%" }} container>
                <Grid item md={9}>
                    <Paper sx={{ width: "100%", height: "100%" }}>
                        <TimeChart />
                    </Paper>
                </Grid>
                <Grid item md={3}>
                    <Stack>
                        <Paper>
                            <BasicTable 
                                columns={columns}
                                rows={group.flowers}
                            />
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Details;