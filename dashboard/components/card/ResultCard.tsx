import {
  ButtonBase,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import { TreeResultType } from '../../types/tree';
interface IResultCard {
  data: TreeResultType;
}

const ResultCard: React.FC<IResultCard> = ({ data }) => {
  const router = useRouter();
  return (
    <Card style={{ marginTop: '0.5rem' }}>
      <ButtonBase
        style={{ width: '100%', alignContent: 'left', justifyContent: 'left' }}
        onClick={() => router.push(`/details/${data.id}`)}
      >
        <CardContent style={{ padding: '8px 16px' }}>
          <Typography align="left">{data.name_lat}</Typography>
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption">{data.id}</Typography>
            <Box style={{ width: '2rem' }} />
            <Chip label={data.quarter} />
          </Container>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default ResultCard;
