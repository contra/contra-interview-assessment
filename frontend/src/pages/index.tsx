/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { Box } from '@mui/material'
import TabNavigation from '@/components/Tabs/TabNavigations';
const Index: NextPage = () => {
  return (
    <Box sx={{
      width:{
        xs:300,
        sm:200,
        md:500,
        xl:500
      }
    
    }}>
      <TabNavigation /> 
         </Box>
  )
}

export default Index;
