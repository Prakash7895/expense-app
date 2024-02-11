import {
  Button,
  DropdownItem,
  DropdownTrigger,
  Pagination,
  SelectItem,
  SortDescriptor,
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
import { toast } from 'react-toastify';
import Dropdown from './Dropdown';
import Select from './Select';
import DropdownMenu from './DropdownMenu';

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
  dropdownDisabledeys?: string[] | ((val: any) => string[]);
}

const DataTable: FC<DataTableProps> = ({
  api,
  columns,
  queryKey,
  actionItems,
  refetchNum = 0,
  columnRenderers,
  tableRowClassName,
  onRowAction,
  dropdownDisabledeys,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'createdAt',
    direction: 'descending',
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isPending, refetch, isError, error } = useQuery<{
    success: boolean;
    data: any[];
    total: number;
  }>({
    queryKey: [...queryKey, page, sortDescriptor, rowsPerPage],
    queryFn: async ({ queryKey }) => {
      const sort: SortDescriptor = queryKey[2]!;
      return axiosInstance
        .get(
          `${api}?pageNo=${queryKey[1]}&pageSize=${queryKey[3]}&sortBy=${
            sort.column
          }&sortOrder=${sort?.direction === 'ascending' ? 'asc' : 'desc'}`
        )
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (refetchNum > 0) {
      refetch();
    }
  }, [refetchNum]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        <div>
          {(error as any)?.response?.data?.errors?.map((el: any) => (
            <p key={el.msg}>{el.msg}</p>
          )) ??
            (error as any)?.response?.data?.message ??
            (error as any)?.message}
        </div>
      );
    }
  }, [isError, error]);

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

    if (columnRenderers?.[columnKey]) {
      return columnRenderers[columnKey](cellValue, item);
    }

    if (columnKey === 'actions' && actionItems) {
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className='text-default-800'
                size='sm'
                variant='light'
              >
                <IoEllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Static Actions'
              items={actionItems}
              onAction={(key) => onRowAction && onRowAction(key, item)}
              disabledKeys={
                typeof dropdownDisabledeys === 'function'
                  ? dropdownDisabledeys(item)
                  : dropdownDisabledeys
              }
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
      <div className='py-2 px-2 flex flex-col sm:flex-row justify-between items-center gap-3'>
        <span className='w-full text-center sm:text-left sm:w-[30%] text-small text-default-400'>
          {`Showing ${(page - 1) * rowsPerPage + 1}-${Math.min(
            data?.total ?? 0,
            page * rowsPerPage
          )} of ${data?.total} rows.`}
        </span>

        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={totalPages}
          onChange={setPage}
          classNames={{
            cursor: 'text-default-50',
            item: 'text-default-900',
            next: 'text-default-900 ',
            prev: 'text-default-900',
          }}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={page === 1}
            size='sm'
            variant='solid'
            onPress={onPreviousPage}
            className='text-default-50'
          >
            Previous
          </Button>
          <Button
            isDisabled={totalPages === page}
            size='sm'
            variant='solid'
            onPress={onNextPage}
            className='text-default-50'
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [data?.total, page, totalPages]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col sm:flex-row gap-3 justify-between items-center'>
        <span className='text-default-400 text-small'>
          Total {data?.total} rows.
        </span>
        <Select
          size='sm'
          value={rowsPerPage}
          className='max-w-60'
          label='Rows per page:'
          defaultSelectedKeys={['5']}
          labelPlacement='outside-left'
          onChange={onRowsPerPageChange}
          classNames={{
            label: 'w-[80%] text-default-400 text-small my-auto pr-0',
          }}
        >
          <SelectItem key={'5'} value='5'>
            5
          </SelectItem>
          <SelectItem key={'10'} value='10'>
            10
          </SelectItem>
          <SelectItem key={'25'} value='25'>
            25
          </SelectItem>
          <SelectItem key={'50'} value='50'>
            50
          </SelectItem>
        </Select>
      </div>
    );
  }, [rowsPerPage, data?.total]);

  return (
    <Table
      aria-label='Example table with custom cells, pagination and sorting'
      // isHeaderSticky
      bottomContent={bottomContent}
      topContent={topContent}
      bottomContentPlacement='outside'
      classNames={{
        wrapper: 'max-h-[400px]',
        tr: 'border-default-50',
      }}
      shadow='md'
      className='mt-5'
      sortDescriptor={sortDescriptor}
      onSortChange={(descriptor) => {
        setSortDescriptor(descriptor);
      }}
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
