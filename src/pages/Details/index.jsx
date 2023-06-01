import { Button, ButtonGroup, CircularProgress, Divider, Grid, Paper, Stack } from "@mui/material";
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

const STATISTIC_TYPE = [
    "week",
    "mount",
    "year",
]

const QUERY_TYPE = [
    "AVARAGE",
    "SUM"
]

const QUERY_VARIABLE = [
    "LEAF COUNT",
    "LEAF VOLUME"
]

const Details = () => {
    const params = useParams();
    const [statistic, setStatistic] = useState();
    const [group, setGroup] = useState({ flowers: [] });
    const [statisticType, setStatisticType] = useState(2);
    const [queryType, setQueryType] = useState(0);
    const [queryVariable, setQueryVariable] = useState(0);

    const getStatistic = async () => {
        try {
            const res = await axios.get("statistic");
            setStatistic(res);
        } catch (e) {
            console.log({ e });
        }
    }

    const getGroupDetails = async () => {
        if (params.id == null) return;

        const group = await axios.get(`group/${params.id}`);

        setGroup(group);
    } 

    useEffect(() => {
        getGroupDetails();
        getStatistic();
    }, []);

    useEffect(() => {
        console.log({ queryType, queryVariable });
    }, [queryType, queryVariable]);

    const handleChangeQueryType = (i) => {
        console.log({i});
        setQueryType(i)
    };
    const handleChangeQueryVariable = (i) => setQueryVariable(i);
    const handleChangeStatisticType = (i) => setStatisticType(i);


    return (
        <Stack sx={{ marginTop: "2rem" }} alignItems="center" justifyContent="center" >
            
            <Stack direction="row" sx={{ width: "70%", marginTop: "2rem" }} justifyContent="space-around">
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {
                        STATISTIC_TYPE.map((type, i) => (
                            <Button color={i == statisticType ? "primary" : "inherit"}>{type}</Button>
                        ))
                    }
                </ButtonGroup>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {
                        QUERY_TYPE.map((type, i) => (
                            <Button onClick={() => handleChangeQueryType(i)} color={i == queryType ? "primary" : "inherit"}>{type}</Button>
                        ))
                    }
                </ButtonGroup>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {
                        QUERY_VARIABLE.map((type, i) => (
                            <Button onClick={() => handleChangeQueryVariable(i)} color={i == queryVariable ? "primary" : "inherit"}>{type}</Button>
                        ))
                    }
                </ButtonGroup>
            </Stack>
            <Grid spacing={2} sx={{ width: "70%", marginTop: "2rem" }} container>
                <Grid item md={9}>
                    <Paper sx={{ width: "100%", height: "100%" }}>
                        {
                            statistic ? (
                                <TimeChart statistic={statistic} />
                            ) : (
                                <Stack sx={{height: "500px" }} justifyContent="center" alignItems="center" >
                                    <CircularProgress />
                                </Stack>
                            )
                        }
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