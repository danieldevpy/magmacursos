import React from "react"
import { Box, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Delete } from "@mui/icons-material";

interface SearchProps{
    mode: boolean;
    s?: string;
    reset: any;
    avanced: any;
}



export default function SearchComponent(props: SearchProps){
    const [search, setSearch] = React.useState("")
    
    const resetSearch =()=>{
        setSearch("");
        props.reset();
    }

    React.useEffect(()=>{
        if(props.s){
            setSearch(props.s)
        }
    }, [props.s])
    
    return(
        <Box sx={{display: "flex", justifyContent: "center", gap: 5, marginLeft: 2}}>
            <TextField sx={{width: 300}} value={search} onChange={(e)=>{setSearch(e.target.value)}} label="Pesquisar" variant="standard" />
            {props.mode? (
                 <Button variant="contained" onClick={resetSearch} color="error" endIcon={<Delete />}>
                    Limpar
                </Button>
            ):(undefined)}
            <Button  onClick={()=>{props.avanced(search)}}variant="contained" endIcon={<SendIcon />}>
                Buscar
            </Button>
        </Box>
    );
}