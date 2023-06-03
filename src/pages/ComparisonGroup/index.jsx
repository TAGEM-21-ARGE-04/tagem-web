import { Button, ButtonGroup, CircularProgress, Divider, Grid, Paper, Stack } from "@mui/material";
import TimeChart from "component/chart/TimeChart";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "utils/Api";


const STATISTIC_TYPE = [
    "week",
    "mount",
    "year",
]

const QUERY_TYPE = [
    {label: "AVARAGE", value: "AVG"},
    {label: "SUM", value: "SUM"}
]

const QUERY_VARIABLE = [
    {label: "LEAF COUNT", value: "leafCount"},
    {label: "LEAF VOLUME", value: "leafVolume"},
]

const ComparisonGroup = () => {
    const { id } = useParams(); 
    const [statistic, setStatistic] = useState();
    const [group, setGroup] = useState({  id: null, flowers: [] });
    const [statisticType, setStatisticType] = useState(2);
    const [queryType, setQueryType] = useState(0);
    const [queryVariable, setQueryVariable] = useState(0);

    const getStatistic = async (group) => {
        try {
            setStatistic(null);

            /*
            const res = await axios.post("statistic", {
                group,
                queryVariable: QUERY_VARIABLE[queryVariable].value,
                queryType: QUERY_TYPE[queryType].value
            });
            setStatistic(res);
            */

        } catch (e) {
            console.log({ e });
        }
    }

    const getGroupDetails = async () => {
        if (id == null) return;

        const group = await axios.get(`group/${id}`);

        setGroup(group);

        return group;
    } 

    useEffect(() => {
        const initPageData = async () => {
            const group = await getGroupDetails();
            getStatistic(group);
        }
        initPageData();
    }, []);

    useEffect(() => {
        if(group.id == null) return;

        getStatistic(group);        
    }, [queryType, queryVariable]);

    const handleChangeQueryType = (i) => setQueryType(i)
    const handleChangeQueryVariable = (i) => setQueryVariable(i);
    const handleChangeStatisticType = (i) => setStatisticType(i);


    return (
        <Stack sx={{ marginTop: "2rem" }} alignItems="center" justifyContent="center" >

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
                    <Stack spacing="1rem" direction="column" alignItems="center">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            {
                                QUERY_TYPE.map((type, i) => (
                                    <Button onClick={() => handleChangeQueryType(i)} color={i == queryType ? "primary" : "inherit"}>{type.label}</Button>
                                ))
                            }
                        </ButtonGroup>
                        <ButtonGroup sx={{ marginTop: "1rem" }} variant="contained" aria-label="outlined primary button group">
                            {
                                QUERY_VARIABLE.map((type, i) => (
                                    <Button onClick={() => handleChangeQueryVariable(i)} color={i == queryVariable ? "primary" : "inherit"}>{type.label}</Button>
                                ))
                            }
                        </ButtonGroup>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            {
                                STATISTIC_TYPE.map((type, i) => (
                                    <Button color={i == statisticType ? "primary" : "inherit"}>{type}</Button>
                                ))
                            }
                        </ButtonGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default ComparisonGroup;