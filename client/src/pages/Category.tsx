import CrudComponent from '../components/CrudComponent';
import { categoryColumns } from '../utils/columnFields';

const Category = () => {
  return (
    <CrudComponent
      api='/api/category/list'
      deleteApi='/api/category/'
      formHeader='Add Category'
      headerBtnLabel='Add Category'
      headerDescription='Update and explore categories'
      headerLabel='Category'
      queryKey={['category']}
      tableColumns={categoryColumns}
      columnRenderers={{
        type: (val: string) => val[0].toUpperCase() + val.substring(1),
      }}
    />
  );
};

export default Category;
