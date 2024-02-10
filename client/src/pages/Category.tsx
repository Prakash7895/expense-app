import CrudComponent from '../components/CrudComponent';
import { categoryColumns } from '../utils/columnFields';
import { categoryFormFields } from '../utils/formFields';
import { addCategorySchema } from '../utils/validations';

const Category = () => {
  return (
    <CrudComponent
      api='/api/category/list'
      crudApi='/api/category/'
      formHeader='Add Category'
      headerBtnLabel='Add Category'
      headerDescription='Update and explore categories'
      headerLabel='Category'
      queryKey={['category']}
      tableColumns={categoryColumns}
      columnRenderers={{
        type: (val: string) => val[0].toUpperCase() + val.substring(1),
      }}
      disableEdit={(item) => {
        return !item.userId;
      }}
      disableDelete={(item) => {
        return !item.userId;
      }}
      formFields={categoryFormFields}
      formValidationSchema={addCategorySchema}
    />
  );
};

export default Category;
