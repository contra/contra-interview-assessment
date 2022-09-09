import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FeatureAdd from '../Modals/FeatureAdd/FeatureAdd';
import FeatureUpdate from '../Modals/FeatureUpdate/FeatureUpdate'
import Users from '../Modals/UsersModal/Users'

export default function TabNavigation() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{p:3 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} 
          TabIndicatorProps={{ sx: { display: 'none' } }}
          sx={{
            '& .MuiTabs-flexContainer': {
              flexWrap: 'wrap',
            },
          }}
          
          aria-label="lab API tabs example">
            <Tab label="Users" value="1" />
            <Tab label="Feature Add" value="2" />
            <Tab label="Feature Update" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><Users/></TabPanel>
        <TabPanel value="2"><FeatureAdd/></TabPanel>
        <TabPanel value="3"><FeatureUpdate/></TabPanel>
      </TabContext>
    </Box>
  );
}
