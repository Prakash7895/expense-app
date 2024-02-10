import { FC, Key, ReactNode, useState } from 'react';
import DynamicForm from './DynamicForm';
import PageHeader from './PageHeader';
import { Column, FormFields } from '../utils/types';
import { Button } from '@nextui-org/react';
import DataTable from './DataTable';
import Modal from './Modal';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

interface CrudComponentProps {
  headerLabel: string;
  headerDescription: string;
  headerBtnLabel: string;
  formFields?: FormFields[];
  formValidationSchema?: any;
  formHeader: string;
  submitButtonLabel?: string;
  tableColumns: Column[];
  columnRenderers?: {
    [key: string]: (val: any, rowData?: any) => React.ReactNode;
  };
  api: string;
  queryKey: string[];
  tableRowClassName?: string | ((val: any) => string);
  crudApi: string;
  onSubmitSuccess?: (data?: any) => void;
  onDeleteSuccess?: (data?: any) => void;
  beforeTableComponent?: ReactNode;
  disableEdit?: boolean | ((val: any) => boolean);
  disableDelete?: boolean | ((val: any) => boolean);
}

const CrudComponent: FC<CrudComponentProps> = ({
  headerBtnLabel,
  headerDescription,
  headerLabel,
  formFields,
  formHeader,
  tableColumns,
  formValidationSchema,
  submitButtonLabel = 'Add',
  columnRenderers,
  api,
  crudApi,
  queryKey,
  tableRowClassName,
  onSubmitSuccess,
  onDeleteSuccess,
  beforeTableComponent,
  disableDelete,
  disableEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refetchNum, setRefetchNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (t: any) => {
    const transactionData = Object.keys(t).reduce((acc, key) => {
      if (t[key]) {
        acc = {
          ...acc,
          [key]: t[key],
        };
      }
      return acc;
    }, {});

    setIsSubmitting(true);

    (selectedItem
      ? axiosInstance.put(`${crudApi}${selectedItem.id}`, transactionData)
      : axiosInstance.post(`${crudApi}`, transactionData)
    )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data?.message);
        setIsOpen(false);
        setRefetchNum((p) => p + 1);
        setSelectedItem(null);
        setIsSubmitting(false);
        onSubmitSuccess && onSubmitSuccess();
      })
      .catch((error) => {
        toast.error(
          <div>
            {error?.response?.data?.errors?.map((el: any) => (
              <p key={el.msg}>{el.msg}</p>
            )) ?? error?.message}
          </div>
        );
      });
  };

  const handleDelete = () => {
    if (selectedItem) {
      axiosInstance
        .delete(`${crudApi}${selectedItem.id}`)
        .then((res) => {
          toast.success(res.data?.message);
          setSelectedItem(null);
          setIsModalOpen(false);
          setRefetchNum((p) => p + 1);
          onDeleteSuccess && onDeleteSuccess();
        })
        .catch((err) => {
          toast.error(
            <div>
              {err?.response?.data?.errors?.map((el: any) => (
                <p key={el.msg}>{el.msg}</p>
              )) ??
                err?.response?.data?.message ??
                err?.message}
            </div>
          );
        });
    }
  };

  const onRowAction = (key: Key, item: any) => {
    console.log('ITEM', key, item);

    setSelectedItem(item);
    if (key === 'delete') {
      setIsModalOpen(true);
    } else if (key === 'edit') {
      setIsOpen(true);
    }
  };

  return (
    <div>
      <div className='flex'>
        <PageHeader
          label={headerLabel}
          description={headerDescription}
          btnLabel={formFields ? headerBtnLabel : undefined}
          onPress={() => {
            setSelectedItem(null);
            setIsOpen(true);
          }}
        />
      </div>

      {formFields && isOpen && (
        <DynamicForm
          fields={formFields}
          validationSchema={formValidationSchema}
          initialValues={selectedItem}
          onSubmit={onSubmit}
          onOpenChange={() => setIsOpen(false)}
          formHeader={formHeader}
          submitButtonLabel={submitButtonLabel}
          fieldsWrapperClassName='gap-0'
          buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
          submitButtonProps={{
            isDisabled: isSubmitting,
          }}
          otherFooterElements={
            <Button
              color='danger'
              variant='flat'
              onPress={() => {
                setIsOpen(false);
                setSelectedItem(null);
              }}
            >
              Close
            </Button>
          }
        />
      )}

      {beforeTableComponent}

      <DataTable
        columns={tableColumns}
        columnRenderers={columnRenderers}
        api={api}
        queryKey={queryKey}
        refetchNum={refetchNum}
        tableRowClassName={tableRowClassName}
        actionItems={[
          {
            key: 'edit',
            label: 'Edit',
          },
          {
            key: 'delete',
            label: 'Delete',
            color: 'danger',
            className: 'text-danger',
          },
        ]}
        onRowAction={onRowAction}
        dropdownDisabledeys={(item) => [
          ...((
            typeof disableEdit === 'function' ? disableEdit(item) : disableEdit
          )
            ? ['edit']
            : []),
          ...((
            typeof disableDelete === 'function'
              ? disableDelete(item)
              : disableDelete
          )
            ? ['delete']
            : []),
        ]}
      />
      <Modal
        isOpen={isModalOpen}
        handleClose={() => {
          setSelectedItem(null);
          setIsModalOpen(false);
        }}
        header='Confirm'
        confirmBtnAction={handleDelete}
        confirmBtnLabel='Yes'
        body='Are you sure you want to delete this item?'
      />
    </div>
  );
};

export default CrudComponent;
