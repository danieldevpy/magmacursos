import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: '#262626',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


interface ModalProps{
    children: any;
    open: boolean;
    setOpen: any;
}

export default function BasicModal(props: ModalProps) {



  return (
      <Modal
        open={props.open}
        onClose={()=>{props.setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         {props.children}
        </Box>
      </Modal>
  );
}