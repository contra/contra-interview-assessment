import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


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



export default function Users() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>View All Users</Button>
      {
        open && (
          <React.Fragment>

            <Modal

              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              style={{}}
            >
              <Box sx={{
                ...style, width: {
                  xs: 100,
                  sm: 200,
                  md: 400,
                  lg: 600

                }
              }}>
                <Button variant="outlined" onClick={handleClose}>Close</Button>

                <h2 id="parent-modal-title">Below is a list of users and respective feature flags</h2>
                <p id="parent-modal-description">
                  Modal
                </p>
              </Box>
            </Modal>
          </React.Fragment>
        )
      }

    </div>
  );
}

