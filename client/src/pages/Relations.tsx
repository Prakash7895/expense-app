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
    />
  );
};

export default Relations;