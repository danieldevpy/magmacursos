import React from "react";
import LayoutAPP from "@/components/layout";
import { Box } from "@mui/material";
import ListCertificates from "@/components/lista";
import API from "@/controller/api";
import { Certificate } from "@/entity/certificate";

interface SearchData {
    search: string;
  }
  
  interface Props {
    searchData: SearchData | null;
  }

  

const ListPage: React.FC<Props> = ({ searchData }) => {
    const [certificates, setCertificates] = React.useState<Certificate[]>();
    const [search, setSearch] = React.useState<any>();
    const api = API.getInstance();
  
    const request =async()=>{
        const response = await api.list();
        const data = await response.json()
        setCertificates(data);
    }

    React.useEffect(() => {
        request();
        if(searchData){
            setSearch(searchData['search']);
        }
      }, [searchData]);

    return(
        <LayoutAPP>
            <Box>
                <ListCertificates certificates={certificates} search={search}/>
            </Box>
        </LayoutAPP>
    );
};

export async function getServerSideProps(context: any) {
    const { query } = context;
    return {
      props: {
        searchData: query.search ? { search: query.search } : null // Retorna os dados para o componente
      }
    };
  }


export default ListPage;