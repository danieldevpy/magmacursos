
import { Box } from '@mui/material';
import ButtonAppBar from './components/appBar';
import CardComponent from './components/card';
import GenerateCertificate from './components/generateCertifate';


function Index() {

  return(
    <>
    <ButtonAppBar/>

    <CardComponent border>
      <Box>
      <GenerateCertificate/>
      </Box>
    </CardComponent>

    
    </>
  )
}

export default Index;
