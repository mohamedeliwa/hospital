'use client';

import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

// navigation items
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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Hospital management system ©{new Date().getFullYear()}.
      </Footer>
    </Layout>
  );
}
