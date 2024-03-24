'use client';

import { Table, TableColumnsType, TableProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import TableSearchFilter from '../TableSearchFilter';
import { SearchOutlined } from '@ant-design/icons';
import DeleteModal from '../DeleteModal';
import UpdatePatientModal from '../UpdatePatientModal';

interface Token {
  id: number;
  value: number;
  usedAt?: string;
}

interface DataType {
  key: React.Key;
  serialNumber: string;
  issuedAt: string;
  expirationDate: string;
  tokens: Token[];
}

const stringSorter = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const data = [
  {
    key: '1',
    serialNumber: '0123456',
    issuedAt: new Date().toISOString(),
    expirationDate: new Date().toISOString(),
    tokens: [],
  },
  {
    key: '2',
    serialNumber: '0123456',
    issuedAt: new Date().toISOString(),
    expirationDate: new Date().toISOString(),
    tokens: [],
  },
  {
    key: '3',
    serialNumber: '0123456',
    issuedAt: new Date().toISOString(),
    expirationDate: new Date().toISOString(),
    tokens: [],
  },
  {
    key: '4',
    serialNumber: '0123456',
    issuedAt: new Date().toISOString(),
    expirationDate: new Date().toISOString(),
    tokens: [],
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

const DecisionsTable = () => {
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
        title: 'رقم القرار',
        dataIndex: 'serialNumber',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => stringSorter(a.serialNumber, b.serialNumber),
        filterDropdown: ({ close }) => (
          <TableSearchFilter onSearch={setSearchInput} close={close} />
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),

        onFilterDropdownOpenChange: (visible) => {
          if (visible) return;
        },
      },
      {
        title: 'تاريخ الصدور',
        dataIndex: 'issuedAt',
        sorter: (a, b) => stringSorter(a.issuedAt, b.issuedAt),
      },
      {
        title: 'تاريخ الإنتهاء',
        dataIndex: 'expirationDate',
        sorter: (a, b) => stringSorter(a.expirationDate, b.expirationDate),
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

export default DecisionsTable;
