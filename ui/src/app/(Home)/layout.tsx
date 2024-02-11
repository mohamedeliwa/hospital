'use client';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 'home',
    label: 'الرئيسية',
  },
  {
    key: 'patients',
    label: 'المرضى',
  },
  {
    key: 'decisions',
    label: 'القرارات',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        Hospital management system ©{new Date().getFullYear()}.
      </Footer>
    </Layout>
  );
}
