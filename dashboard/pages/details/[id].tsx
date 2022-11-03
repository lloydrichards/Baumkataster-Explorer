import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';
import { GetServerSideProps } from 'next';
import DetailCard from '../../components/card/DetailCard';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { urlBase } from '../../config/api';
import { DetailResult } from '../../types/details';
import { TreeType } from '../../types/tree';
import { NextPageWithLayout } from '../page';

const DetailPage: NextPageWithLayout<IDetailPage> = ({ data, error }) => {
  // OPTIMIZE: should be a pipe to better deal with different states
  if (error != null) {
    // FIXME: error handling should have some kind of way to solve
    return <>{error}</>;
  }
  if (data != null) {
    return <DetailCard data={data} />;
  }
  // FIXME: default /details/ page needs something helpful to say
  return <div>DetailPage</div>;
};

export default DetailPage;

// NOTE: use same layout so they don't reload between route changes
DetailPage.getLayout = (page: any) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// OPTIMIZE: should be a union between data or failure
interface IDetailPage {
  data?: TreeType;
  error?: String;
}

export const getServerSideProps: GetServerSideProps<IDetailPage> = async (
  context
) => {
  const id = context.params?.id;
  const data = await fetch(`${urlBase}/api/details/${id}`);

  const json = await data.json();

  //   console.log(json);
  return {
    // NOTE: decode the json to make sure its the results and return to props
    props: pipe(
      DetailResult.decode(json),
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
