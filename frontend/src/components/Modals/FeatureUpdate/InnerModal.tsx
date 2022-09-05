import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalProps {
    flagName: string;
    submit: Function;
}

function InnerModal(props:ModalProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState(props.flagName);
    
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);  
   

      const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        props.submit(value);
        handleClose()
    };

   
  
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleOpen}>Edit</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }} >
                    <FormControl onSubmit={onSubmit}>
                    <TextField
                        id="outlined-basic" 
                        label="Outlined"
                         variant="outlined"
                         ref={editFieldRef} 
                         type="text" 
                         onChange={onChange}
                        value={value}
                    />
                    </FormControl>
                    <Button variant="outlined" ref={editButtonRef} type="submit" onClick={onSubmit}>Update</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default InnerModal