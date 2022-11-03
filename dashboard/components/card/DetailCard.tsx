import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { TreeType } from '../../types/tree';
import DetailRow from './DetailRow';

interface IDetailCard {
  data: TreeType;
}

const DetailCard: React.FC<IDetailCard> = ({ data }) => {
  return (
    <Card style={{ width: '50vw', padding: '2rem 1rem' }}>
      <CardContent>
        <DetailRow field="ID">
          <Typography>{data.id}</Typography>
        </DetailRow>
        <Box style={{ height: '1rem' }} />
        <DetailRow field="Latin name">
          <Typography>{data.name_lat}</Typography>
        </DetailRow>
        <DetailRow field="German name">
          <Typography>{data.name_german}</Typography>
        </DetailRow>
        <DetailRow field="Species">
          <Typography>{data.species}</Typography>
        </DetailRow>
        <DetailRow field="Genus">
          <Typography>{data.genus}</Typography>
        </DetailRow>

        <Box style={{ height: '1rem' }} />
        <DetailRow field="Street Address">
          <Typography>{data.address}</Typography>
        </DetailRow>
        <DetailRow field="Quarter">
          <Chip label={data.quarter} size="small" />
        </DetailRow>
        <DetailRow field="Category">
          <Chip label={data.category} size="small" />
        </DetailRow>
        <DetailRow field="Status">
          <Chip label={data.status} size="small" />
        </DetailRow>
        <DetailRow field="Year planted">
          <Typography>{data.year}</Typography>
        </DetailRow>
        <DetailRow field="Crown Diameter">
          <Typography>{data.crown}m</Typography>
        </DetailRow>
        <Box style={{ height: '1rem' }} />
        <DetailRow field="Source">
          <Typography>{data.source}</Typography>
        </DetailRow>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
