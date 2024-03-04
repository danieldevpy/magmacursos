import React from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, CircularProgress} from "@mui/material";
import BasicSelect from "@/components/select";
import LayoutAPP from "@/components/layout";
import Fade from '@mui/material/Fade';
import API from "@/controller/api";
import { useRouter } from 'next/router';
import Image from "next/image";
import imageCertificate from '@../../../public/certificado-aph.png'

export default function PreviewPage(){
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout>();
  const [img, setImg] = React.useState<string>();
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [date, setDate] = React.useState("");
  const [created, setCreated] = React.useState(false);
  const router = useRouter();
  const api = API.getInstance();

  const getJson =()=>{
    return JSON.stringify({"name": name, "cpf": cpf, "date": date, "model_id": 1})
  }

  const save =async()=>{
    if(name && cpf && date){
      const response = await api.save(getJson())
      if(response.status == 200){
        setCreated(true);
      }
    }
  }

  const resetCertificate =()=>{
    setName("")
    setCpf("")
    setDate("")
    setCreated(false);
  }
  
  const viewCertificate =()=>{
    router.push(`/certificados/list?search=${cpf}`);
  }

  const preview =async()=>{
    const response = await api.preview(getJson())
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    setImg(imgUrl);
  }

  React.useEffect(()=>{
    if(name || cpf || date){
      clearTimeout(timerId);
      const newTimerId = setTimeout(() => {
        preview();
      }, 600);
      setTimerId(newTimerId);
     }
  }, [name, cpf, date])


  return(
    <LayoutAPP>
      <Box className="boxGenerate">
        {created? (
          <Fade in={created} timeout={1000}>
            <Box>
              <label className="textSpace" style={{fontSize: 25}}>Certificado gerado com sucesso!</label>
              <Box sx={{margin: 2, display: "flex", gap: 1}}>
              <Button variant="contained" color="info" onClick={viewCertificate}>Visualizar Certificado</Button>
              <Button variant="contained" color="warning" onClick={resetCertificate}>Gerar Novo</Button>
            </Box>
            </Box>
          </Fade>
        ):(
          <>
          <Box className="boxGenerateFields">
            <label className="textSpace" style={{fontSize: 25}}>Formulario</label>
            <TextField label="Nome Completo" variant="outlined" color="warning" onChange={(e)=>{setName(e.target.value)}}/>
            <TextField label="Cpf" variant="outlined" type="number" color="warning" onChange={(e)=>{setCpf(e.target.value)}}/>
            <TextField label="Data" variant="outlined" color="warning" onChange={(e)=>{setDate(e.target.value)}}/>
            <BasicSelect/>
            <Button sx={{margin: 2}} variant="contained" color="warning" onClick={save}>Registrar Certificado</Button>
        </Box>
        <Box className="boxGenerateImg">
          {img? (
            <img src={img} width={600}/>
          ):(
            <Image src={imageCertificate} width={600} alt="img"/>
          )}
        </Box>
          </>
        )}
      </Box>
    </LayoutAPP>
 
  );
}