import React from "react";
import { Certificate } from "@/entity/certificate";
import { Box, CircularProgress, Button, ButtonGroup } from "@mui/material";
import API from "@/controller/api";

interface ViewProps{
    certificate?: Certificate
}

const buttons = [
    <Button key="one" color="warning">Editar</Button>,
    <Button key="two" color="error" >Apagar</Button>,
    <Button key="three">Fechar</Button>,
  ];
  

export default function ViewCertificate(props: ViewProps){
    const api = API.getInstance();
    const [src, setSrc] = React.useState("");

    const getPDF =async(id: string)=>{
        const response = await api.getPDF(id);
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setSrc(pdfUrl);
    }

    React.useEffect(()=>{
        if(props.certificate){
            const id = props.certificate.cpf+props.certificate.id;
            getPDF(id);
        }
    }, [props.certificate])
    

    return(
        <Box className="boxCertificate">
            <Box className="boxCertificateTools">
                <Box><h2>Visualização</h2></Box>
                <Box>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    {buttons}
                </ButtonGroup>
                </Box>
            </Box>
            <Box className="boxCertificateDiv">
                <Box>
                    {src?(
                        <iframe src={src} width={500} height={400}></iframe>
                    ):(
                        <CircularProgress/>
                    )}
                </Box>
                <Box>
                   
                </Box>
            </Box>
        </Box>
    );
}