import { Card, CardContent } from '@mui/material';
import { TreeType } from '../../types/tree';

interface IDetailCard {
  data: TreeType;
}

const DetailCard: React.FC<IDetailCard> = ({ data }) => {
  return <Card>
    
    <CardContent>
      
    </CardContent>
  </Card>;
};

export default DetailCard;
