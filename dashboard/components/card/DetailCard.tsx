import { Box, Card, CardContent, Typography } from '@mui/material';
import { TreeType } from '../../types/tree';

interface IDetailCard {
  data: TreeType;
}

const DetailCard: React.FC<IDetailCard> = ({ data }) => {
  return (
    <Card style={{ width: '50vw', padding: '2rem 1rem' }}>
      <CardContent>
        <Typography>ID: {data.id}</Typography>
        <Box style={{ height: '2rem' }} />
        <Typography>Latin name: {data.name_lat}</Typography>
        <Typography>German name: {data.name_german}</Typography>
        <Typography>Street Address: {data.address}</Typography>
        <Typography>Category: {data.category}</Typography>
        <Typography>Genus: {data.genus}</Typography>
        <Typography>Crown Diameter: {data.crown}</Typography>
        <Typography>Quarter: {data.quarter}</Typography>
        <Typography>Source: {data.source}</Typography>
        <Typography>Species: {data.species}</Typography>
        <Box style={{ height: '2rem' }} />
        <Typography>Status: {data.status}</Typography>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
