import { Box, Container, Typography } from '@mui/material';

interface IDetailRow {
  field: String;
  children: React.ReactNode;
}

const DetailRow: React.FC<IDetailRow> = ({ field, children }) => {
  return (
    <Container style={{ display: 'flex', alignItems: 'center' }}>
      <Box style={{ width: '8rem' }}>
        <Typography variant="body2">{field}:</Typography>
      </Box>
      {children}
    </Container>
  );
};

export default DetailRow;
