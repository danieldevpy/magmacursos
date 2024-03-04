import React from "react";
import { Certificate } from "@/entity/certificate";
import { Box, CircularProgress, Button, ButtonGroup, TextField } from "@mui/material";
import API from "@/controller/api";

interface ViewProps{
    certificate?: Certificate
}



export default function ViewCertificate(props: ViewProps){
    const api = API.getInstance();
    const [src, setSrc] = React.useState("");
    const [modeEdit, setModeEdit] = React.useState(false);
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [date, setDate] = React.useState("");
      

    const getPDF =async(id: number)=>{
        const response = await api.getPDF(id);
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setSrc(pdfUrl);
    }

    React.useEffect(()=>{
        if(props.certificate){
            setName(props.certificate.name);
            setCpf(props.certificate.cpf);
            setDate(props.certificate.date);
            getPDF(props.certificate.id);
        }
    }, [props.certificate])
    

    return(
        <Box className="boxCertificate">
            <Box className="boxCertificateTools">

                {src && !modeEdit?(
                    <Box>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button key="one" color="warning" onClick={()=>{setModeEdit(true)}}>Editar</Button>
4                            <Button key="two" color="error" >Apagar</Button>
                            <Button key="three">Fechar</Button>
                        </ButtonGroup>
                    </Box>
                ):null}

            </Box>
            <Box className="boxCertificateDiv">
                <Box>
                    {src?(
                        <iframe src={src} width={500} height={400}></iframe>
                    ):(
                        <CircularProgress/>
                    )}
                </Box>
                {modeEdit?(
                     <Box className="boxModeEdit">
                        <Box>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button key="two" color="error" >Apagar</Button>
                                <Button key="three">Fechar</Button>
                            </ButtonGroup>
                        </Box>
                        <Box className="boxModeEditHeader">
                            <label>Modo Edição</label>
                            <Button onClick={()=>{setModeEdit(false)}} color="error">X</Button>
                        </Box>
                        <TextField value={name} onChange={(e)=>{setName(e.target.value)}} label="NOME COMPLETO"/>
                        <TextField value={cpf} onChange={(e)=>{setCpf(e.target.value)}} label="CPF"/>
                        <TextField value={date} onChange={(e)=>{setDate(e.target.value)}} label="DATA" />
                        <Button variant="contained">SALVAR</Button>
                     </Box>
                ): null}
            </Box>
        </Box>
    );
}