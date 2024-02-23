import { DateTime } from 'luxon';
import CrudComponent from '../components/CrudComponent';
import { userColumns } from '../utils/columnFields';

const Relations = () => {
  return (
    <CrudComponent
      api='/api/user/related-users'
      headerDescription='Update and explore other users'
      headerLabel='Users'
      queryKey={['users']}
      tableColumns={userColumns}
      columnRenderers={{
        createdAt: (val) => DateTime.fromISO(val).toFormat('DD, t a'),
        name: (val, rowData) =>
          val?.trim()?.length
            ? val
            : rowData.email ?? `${rowData.countryCode}-${rowData.phone}`,
      }}
    />
  );
};

export default Relations;
