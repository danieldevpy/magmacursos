import * as React from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import SearchComponent from './search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BasicModal from './modal';
import {Certificate} from '@/entity/certificate'
import ViewCertificate from './viewCertificate';

interface ListCertificate{
    certificates?: Certificate[];
    search?: string;
}

export default function ListCertificates(props: ListCertificate) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [filter, setFilter] = React.useState<Certificate[]>();
    const [modeSearch, setModeSearch] = React.useState(false);
    const [certificateSelected, setCertificateSelected] = React.useState<Certificate>();
    

    const viewCertificate =(c: Certificate)=>{
        setModalVisible(true);
        setCertificateSelected(c);
    }

    const resetSearch =()=>{
        if (props.certificates){
            setFilter(props.certificates);
            setModeSearch(false);
        }
    }

    const avancedSearch =(value: string)=>{
        if(!value){
            setFilter(props.certificates);
            if(modeSearch) setModeSearch(false);
            return
        }
        if(props.certificates){
            const cpf = props.certificates.filter(c => c.cpf.includes(value));
            const name = props.certificates.filter(c => c.name.includes(value));
            const filteredCertificates = cpf.concat(name);
            setFilter(filteredCertificates);
            setModeSearch(true);
        }
    }

    React.useEffect(()=>{
        setFilter(props.certificates)
        if (props.certificates && props.search) {
            const c = props.certificates.filter(c => c.cpf == props.search);
            setFilter(c);
            setModeSearch(true);
        }

    }, [props.search, props.certificates])
  
    return (
        <Box className="boxList">
            <SearchComponent
                mode={modeSearch}
                reset={resetSearch}
                avanced={avancedSearch}
                s={props.search}/>
            <List>
                {filter?.map((certificate, i)=>(
                    <ListItem
                    key={certificate.cpf+i}
                    secondaryAction={
                    <IconButton edge="start" aria-label="delete" onClick={()=>{viewCertificate(certificate)}}>
                        <VisibilityIcon color='warning' />
                    </IconButton>
                    }
                >
                    <ListItemAvatar>
                    <Avatar>
                        <PictureAsPdfIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={certificate.name}
                    secondary={certificate.model.name}
                    />
                </ListItem>
                ))}
            </List>
            <BasicModal open={modalVisible} setOpen={setModalVisible}>
                <ViewCertificate certificate={certificateSelected}/>
            </BasicModal>
        </Box>
 
    );
}