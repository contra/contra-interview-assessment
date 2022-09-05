import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InnerModal from './InnerModal'
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


export default function FeatureUpdate() {
  const User = "Eddie";
const initialvalue = 'TikTok authentication'
  const [open, setOpen] = useState(false);
  const [flagName, setFlagName] = useState(initialvalue)

  const onSubmit = (value: React.SetStateAction<string>) => setFlagName(value);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Update Flag Feature</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width:{
          xs:100,
          sm:200,
          md:400,
          lg:600

        }}}>

          <table>
            <thead>
              <tr>
                <th>User</th>

                <th>Flag Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{User}</td>
                <td>{flagName}</td>
                <td>

                </td>
              </tr>
            </tbody>
          </table>
          <InnerModal
            submit={onSubmit}
            flagName={flagName}
          />
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}

