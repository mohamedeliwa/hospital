'use client';

import { Table, TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import TableSearchFilter from './TableSearchFilter';
import { SearchOutlined } from '@ant-design/icons';
import DeleteModal from './DeleteModal';
import UpdatePatientModal from './UpdatePatientModal';

interface DataType {
  key: React.Key;
  name: string;
  nationalId: string;
  phone: string;
}

const stringSorter = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const data = [
  {
    key: '1',
    name: 'أحمد محمود',
    nationalId: '12345678901234',
    phone: '01010101010',
  },
  {
    key: '2',
    name: 'محمد أحمد',
    nationalId: '12345678901234',
    phone: '01010101010',
  },
  {
    key: '3',
    name: 'محمود أحمد',
    nationalId: '12345678901234',
    phone: '01010101010',
  },
  {
    key: '4',
    name: 'رضا عبده',
    nationalId: '12345678901234',
    phone: '01010101010',
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const PatientsTable = () => {
  const [searchInput, setSearchInput] = useState<string | null>(null);

  useEffect(() => {
    console.log({ searchInput });
    return () => {
      setSearchInput(null);
    };
  }, [searchInput]);

  const columns: TableColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: 'الإسم',
        dataIndex: 'name',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => stringSorter(a.name, b.name),
      },
      {
        title: 'الرقم القومي',
        dataIndex: 'nationalId',
        filterDropdown: ({ close }) => (
          <TableSearchFilter onSearch={setSearchInput} close={close} />
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),

        onFilterDropdownOpenChange: (visible) => {
          if (visible) return;
        },
        sorter: (a, b) => stringSorter(a.nationalId, b.nationalId),
      },
      {
        title: 'تليفون',
        dataIndex: 'phone',
        sorter: (a, b) => stringSorter(a.phone, b.phone),
      },
      {
        title: 'الإجراءات',
        render: () => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <UpdatePatientModal /> <DeleteModal />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

export default PatientsTable;
