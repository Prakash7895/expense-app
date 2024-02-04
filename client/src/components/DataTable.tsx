import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
  Key,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Column, DropdownMenuItem } from '../utils/types';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import { IoEllipsisVertical } from 'react-icons/io5';

interface DataTableProps {
  columns: Column[];
  columnRenderers?: {
    [key: string]: (val: any, rowData?: any) => ReactNode;
  };
  queryKey: string[];
  api: string;
  refetchNum?: number;
  tableRowClassName?: string | ((val: any) => string);
  actionItems?: DropdownMenuItem[];
  onRowAction?: (key: Key, item: any) => void;
}

const rowsPerPage = 5;

const DataTable: FC<DataTableProps> = ({
  api,
  columns,
  queryKey,
  actionItems,
  refetchNum = 0,
  columnRenderers,
  tableRowClassName,
  onRowAction,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading, isPending, refetch } = useQuery<{
    success: boolean;
    data: any[];
    total: number;
  }>({
    queryKey: [...queryKey, page],
    queryFn: async ({ queryKey }) => {
      return axiosInstance
        .get(`${api}?pageNo=${queryKey[1]}&pageSize=${rowsPerPage}`)
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (refetchNum > 0) {
      refetch();
    }
  }, [refetchNum]);

  // console.log('DATA', data);
  // console.log('isLoading', isLoading);
  // console.log('isPending', isPending);
  // console.log('isFetching', isFetching);
  // console.log('isRefetching', isRefetching);

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

    // console.log('columnKey', columnKey);
    // console.log('columnRenderers?.[columnKey]', columnRenderers?.[columnKey]);
    if (columnRenderers?.[columnKey]) {
      return columnRenderers[columnKey](cellValue, item);
    }

    if (columnKey === 'actions' && actionItems) {
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size='sm' variant='light'>
                <IoEllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Static Actions'
              items={actionItems}
              onAction={(key) => onRowAction && onRowAction(key, item)}
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.color}
                  className={item.className}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      );
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
        <span className='w-[30%] text-small text-default-400'>
          {`Showing ${(page - 1) * rowsPerPage + 1}-${Math.min(
            data?.total ?? 0,
            page * rowsPerPage
          )} of ${data?.total} rows.`}
        </span>

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
      shadow='md'
      className='mt-5'
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.isSortable}>
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
                typeof tableRowClassName === 'function'
                  ? tableRowClassName(item)
                  : tableRowClassName
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
