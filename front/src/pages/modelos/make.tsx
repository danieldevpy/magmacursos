import React from "react";
import LayoutAPP from "@/components/layout";
import { Box } from "@mui/material";
import HorizontalLinearStepper from "@/components/stepper";


export default function MakePage(){


    const end =()=>{

    }

    return(
        <LayoutAPP>
            <Box>
              <input type="file" />
            </Box>
        </LayoutAPP>
    );
}