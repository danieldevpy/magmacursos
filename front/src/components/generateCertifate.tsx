import React from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, CircularProgress} from "@mui/material";
import BasicSelect from "./select";


export default function GenerateCertificate(){
  const [timerId, setTimerId] = React.useState<number>();
  const [img, setImg] = React.useState<string>();
  const [name, setName] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [date, setDate] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const getJson =()=>{
    return JSON.stringify({"name": name, "cpf": cpf, "date": date, "model_id": 1})
  }

  const save =async()=>{
    if(name && cpf && date){
      const response = await fetch("http://localhost:8000/certificate/save", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: getJson()
      })
      if(response.status == 200){

      }

    }

  }

  const preview =async()=>{
    console.log('teste')
    const response = await fetch("http://localhost:8000/certificate/preview", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: getJson()
    })
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    setImg(imgUrl);
  }

  React.useEffect(()=>{
    if(checked){
     if(name || cpf || date){
      clearTimeout(timerId);
      const newTimerId = setTimeout(() => {
        preview();
      }, 600);
      setTimerId(newTimerId);
     }
    }
  }, [name, cpf, date])
  

  React.useEffect(()=>{
    preview();
  }, [])

  return(
    <Box className="boxGenerate">
      <Box className="boxGenerateFields">
        <Box className="boxForm">
          <label className="textSpace" style={{fontSize: 25}}>Formulario</label>
          <FormControlLabel control={<Checkbox onChange={(e)=>setChecked(e.target.checked)}/>} label="Atualizar automatico" />
        </Box>
        <TextField label="Nome Completo" variant="outlined" color="warning" onChange={(e)=>{setName(e.target.value)}}/>
        <TextField label="Cpf" variant="outlined" color="warning" onChange={(e)=>{setCpf(e.target.value)}}/>
        <TextField label="Data" variant="outlined" color="warning" onChange={(e)=>{setDate(e.target.value)}}/>
        <BasicSelect/>
        <Button sx={{margin: 2}} variant="contained" color="warning" onClick={save}>Registrar Certificado</Button>

      </Box>
      <Box className="boxGenerateImg">
        {img? (
          <img src={img} width={600}/>
        ):(
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
}