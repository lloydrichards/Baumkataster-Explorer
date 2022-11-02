import React from 'react';
import { TreeResultType } from '../../types/tree';
interface IResultCard {
  data: TreeResultType;
}

const ResultCard: React.FC<IResultCard> = ({ data }) => {
  return <div>ResultCard</div>;
};

export default ResultCard;
