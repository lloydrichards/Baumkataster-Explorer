import { ButtonBase, Card, CardContent, Chip, Typography } from '@mui/material';
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
      <ButtonBase onClick={() => router.push(`/details/${data.id}`)}>
        <CardContent style={{ padding: '8px 16px' }}>
          <Typography>{data.name_lat}</Typography>
          <Chip label={data.quarter} />
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default ResultCard;
