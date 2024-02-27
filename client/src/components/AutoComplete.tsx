import { FC, forwardRef, useCallback, useState } from 'react';
import { FormFields, useAppSelector } from '../utils/types';
import { ControllerRenderProps, FieldErrors } from 'react-hook-form';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { getSettings } from '../utils/store/settingSlice';
import { useQuery } from '@tanstack/react-query';

interface AutoCompleteProps {
  errors: FieldErrors<{
    [x: string]: any;
  }>;
  initialValues?: { [key: string]: any };
  ref?: any;
}
type IAutoComplete = FormFields &
  ControllerRenderProps<
    {
      [x: string]: any;
    },
    string
  >;

type IAutoCompleteProps = AutoCompleteProps & IAutoComplete;

const AutoComplete: FC<IAutoCompleteProps> = forwardRef<
  HTMLInputElement,
  IAutoCompleteProps
>(
  (
    {
      name,
      onChange,
      value,
      label,
      className,
      classNames,
      errors,
      initialValues,
      autoCompleteItem,
      fetchData,
      matchOptionHandler,
    },
    ref
  ) => {
    const { mode } = useAppSelector(getSettings);
    const errMessage = name?.split('.')?.reduce((acc: any, nam) => {
      return acc ? acc?.[nam] : {};
    }, errors);
    const [searchVal, setSearchVal] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(
      value ? initialValues?.[name.substring(0, name.length - 2)] ?? null : null
    );

    const { data, isLoading } = useQuery<any[]>({
      queryKey: [`autocomplete-${name}`, searchVal],
      queryFn: async ({ queryKey }) =>
        fetchData!(queryKey as string[]).then((res) => {
          setIsFetching(false);
          return res.data.data;
        }),
    });

    const debounce = useCallback(() => {
      let timer: NodeJS.Timeout | null = null;
      return function (val: string) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          timer = null;
          setSearchVal(val);
        }, 1000);
      };
    }, []);

    const debounceFn = debounce();

    const onInputChange = (val: string) => {
      const dt = matchOptionHandler
        ? matchOptionHandler(val, data ?? [])
        : data?.find((v) => v?.value === val);
      if (dt) {
        val = '';
        setSearchVal('');
      } else {
        setIsFetching(true);
        onChange({
          target: { value: '' },
        });
        setSelectedItem(null);
      }
      debounceFn(val);
      return val;
    };

    return (
      <Autocomplete
        ref={ref}
        defaultItems={[
          ...(selectedItem &&
          data?.findIndex((el) => el.id === selectedItem.id) === -1
            ? [selectedItem]
            : []),
          ...(data ?? []),
        ]}
        isLoading={isLoading || isFetching}
        variant='bordered'
        label={label}
        classNames={{
          ...classNames,
          popoverContent: `${mode} text-foreground bg-background ${classNames?.popoverContent}`,
          selectorButton: `${mode} text-foreground bg-background ${classNames?.selectorButton}`,
        }}
        className={`${!!errMessage?.message ? '' : 'pb-6'} ${className ?? ''}`}
        isInvalid={!!errMessage?.message}
        errorMessage={errMessage?.message as string}
        name={name}
        value={value}
        onInputChange={onInputChange}
        onSelectionChange={(key) => {
          onChange({
            target: { value: key },
          });
          const dt = data?.find((el) => el.id === key);
          setSelectedItem(dt ? dt : null);
          setSearchVal('');
        }}
        selectedKey={selectedItem ? selectedItem.id : null}
      >
        {(item) =>
          autoCompleteItem ? (
            (autoCompleteItem(item) as any)
          ) : (
            <AutocompleteItem key={item.value} textValue={`${item.label}`}>
              <div className='flex gap-2 items-center'>
                <div className='flex flex-col'>
                  <span className='text-small'>{item.label}</span>
                </div>
              </div>
            </AutocompleteItem>
          )
        }
      </Autocomplete>
    );
  }
);

export default AutoComplete;
