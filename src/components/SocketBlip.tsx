import { Box, Card, Typography } from "@mui/material"
import { useService } from "jokits-react";


const SocketBlip = () => {

    const [blipColor] = useService<string>("socketService");


    return (
        <Card>
            <Box sx={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                <h2>Socket Blip</h2>
                <Typography sx={{width: "10rem"}}>{blipColor}</Typography>
                <Box sx={{ backgroundColor: blipColor, width: "3rem", height: "3rem" }} />
            </Box>


        </Card>
    )
}

export default SocketBlip;