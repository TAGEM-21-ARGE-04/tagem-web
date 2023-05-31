import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "utils/Api";

const Details = () => {
    const params = useParams();

    const getGroupDetails = async () => {
        if (params.id == null) return;

        const group = await axios.get(`group/${params.id}`);

        console.log({group});
    } 

    useEffect(() => {
        getGroupDetails();
    }, []);

    return (
        <>
            
        </>
    );
}

export default Details;