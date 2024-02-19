import React from "react";
import { Certificate } from "@/entity/certificate";
import { Box } from "@mui/material";


interface ViewProps{
    certificate?: Certificate
}

export default function ViewCertificate(props: ViewProps){

    return(
        <Box>
            <label>hello world</label>
        </Box>
    );
}