import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Column } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';

interface DataTableProps {
  columns: Column[];
  columnRenderers?: {
    [key: string]: (val: any) => ReactNode;
  };
}

const rowsPerPage = 5;

const DataTable: FC<DataTableProps> = ({ columns, columnRenderers }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isPending, isFetching, isRefetching } = useQuery<{
    success: boolean;
    data: any[];
    total: number;
  }>({
    queryKey: ['transaction', page],
    queryFn: async ({ queryKey }) => {
      return axiosInstance
        .get(
          `/api/transaction/list?pageNo=${queryKey[1]}&pageSize=${rowsPerPage}`
        )
        .then((res) => res.data);
    },
  });

  console.log('DATA', data);
  console.log('isLoading', isLoading);
  console.log('isPending', isPending);
  console.log('isFetching', isFetching);
  console.log('isRefetching', isRefetching);

  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data?.total / rowsPerPage));
    }
  }, [data?.total]);

  const renderCell = useCallback((item: any, columnKey: string) => {
    const fields = columnKey.toString().split('.');
    const cellValue = fields.reduce((acc, field) => {
      return acc[field];
    }, item);

    console.log('columnKey', columnKey);
    console.log('columnRenderers?.[columnKey]', columnRenderers?.[columnKey]);
    if (columnRenderers?.[columnKey]) {
      return columnRenderers[columnKey](cellValue);
    }

    return cellValue;
  }, []);

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          color='secondary'
          page={page}
          total={totalPages}
          onChange={setPage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={page === 1}
            size='sm'
            variant='flat'
            color='secondary'
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={totalPages === page}
            size='sm'
            variant='flat'
            color='secondary'
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [data?.total, page, totalPages]);

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[382px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.isSortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={'No data found.'}
        items={data?.data ?? []}
        isLoading={isLoading || isPending}
        loadingContent={<Spinner label='Loading...' />}
      >
        {(item) => {
          return (
            <TableRow
              key={item.id}
              className={
                item.type === 'debit'
                  ? 'bg-danger-50 text-danger'
                  : 'bg-success-50 text-success'
              }
            >
              {(columnKey) => {
                return (
                  <TableCell>
                    {renderCell(item, columnKey.toString())}
                  </TableCell>
                );
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default DataTable;
