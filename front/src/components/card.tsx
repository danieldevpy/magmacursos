import { Box } from "@mui/material";


interface CardProps{
  children?: any;
  border?: boolean;
}

export default function CardComponent(props: CardProps){

  return(
    <Box className="cardbox">
      <Box sx={{borderRadius: props.border? 2:0}}>{props.children}</Box>
    </Box>
  );
}