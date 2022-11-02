import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';
import { GetServerSideProps } from 'next';
import DetailCard from '../../components/card/DetailCard';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { DetailResult } from '../../types/details';
import { TreeType } from '../../types/tree';
import { NextPageWithLayout } from '../page';

const DetailPage: NextPageWithLayout<IDetailPage> = ({ data, error }) => {
  if (error != null) {
    return <>{error}</>;
  }
  if (data != null) {
    return <DetailCard data={data} />;
  }
  return <div>DetailPage</div>;
};

export default DetailPage;

DetailPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

interface IDetailPage {
  data?: TreeType;
  error?: String;
}

export const getServerSideProps: GetServerSideProps<IDetailPage> = async (
  context
) => {
  const id = context.params?.id;
  const data = await fetch('http://localhost:3000/api/details', {
    body: JSON.stringify({
      query: id,
    }),
    method: 'POST',
  });

  return {
    props: pipe(
      DetailResult.decode(data),
      E.fold(
        (l) =>
          ({
            error: failure(l)[0],
          } as IDetailPage),
        (r) =>
          ({
            data: r.data,
          } as IDetailPage)
      )
    ),
  };
};
