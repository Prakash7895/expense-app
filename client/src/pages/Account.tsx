import CrudComponent from '../components/CrudComponent';
import { accountColumns } from '../utils/columnFields';
import { accountFormFields } from '../utils/formFields';
import { addAccountSchema } from '../utils/validations';

const Account = () => {
  return (
    <CrudComponent
      api='/api/account/list'
      crudApi='/api/account/'
      formHeader='Add Account'
      headerBtnLabel='Add Account'
      headerDescription='Update and explore accounts'
      headerLabel='Account'
      queryKey={['account']}
      tableColumns={accountColumns}
      formFields={accountFormFields}
      formValidationSchema={addAccountSchema}
      columnRenderers={{
        description: (val: any) => {
          return val || '-';
        },
      }}
    />
  );
};

export default Account;
