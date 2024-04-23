import { Box } from '@mui/material';

const SectionComponent = ({
  sectionID,
  minCondition,
  maxCondition,
  unit,
  component,
}: {
  sectionID: string;
  minCondition: string;
  maxCondition: string;
  unit: string;
  component: React.ReactNode;
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>{sectionID}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>{minCondition}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>{maxCondition}</Box>
      <Box sx={{ display: 'flex', width: '20%' }}>{component}</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>{unit}</Box>
    </Box>
  );
};

export default SectionComponent;
