'use client';

import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { GetRef } from 'antd';
import { Button, Input, Space } from 'antd';

type InputRef = GetRef<typeof Input>;

interface TableSearchFilterProps {
  onSearch: (query: string) => void;
  close: () => void;
}

const TableSearchFilter: React.FC<TableSearchFilterProps> = ({
  onSearch,
  close,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleReset = () => {
    setSearchText('');
    onSearch('');
  };

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search...`}
        value={searchText}
        onChange={(e) => {
          const value = e.target.value || '';
          setSearchText(value);
        }}
        onPressEnter={() => handleSearch()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset()}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  );
};

export default TableSearchFilter;
