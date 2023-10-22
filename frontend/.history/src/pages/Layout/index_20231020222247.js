import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../images/logo_manez.jpeg'
import QuizStatistic from '../../components/QuizStatistic';
import EnglishQuiz from '../../components/EnglishQuiz';
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
  // UserOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import QuizDashboard from "../../components/QuizDashboard";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Media from 'react-media';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Analysis', '1', <PieChartOutlined />),
  getItem('Practice', '2', <DesktopOutlined/>),
  // getItem('Profile', '3', <UserOutlined />),
  getItem('Quiz', '3', <ContainerOutlined />, [getItem('English', '31'), getItem('Maths', '32')]),
  getItem('Log Out', '4', <LogoutOutlined />),
];
const TennisLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItemKey, setSelectedMenuItemKey] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuSelect = ({ key }) => {
    setSelectedMenuItemKey(key);
  };
  const bread=(selectedMenuItemKey)=>{
    if(parseInt(selectedMenuItemKey)<10)
        return <Breadcrumb.Item>{items[selectedMenuItemKey-1].label}</Breadcrumb.Item>
    else{
      return <><Breadcrumb.Item>{items[parseInt(selectedMenuItemKey/10)-1].label}</Breadcrumb.Item>
      <Breadcrumb.Item>{items[parseInt(selectedMenuItemKey/10)-1].children[selectedMenuItemKey%10-1].label}</Breadcrumb.Item></>
    }
  }

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Media query="(min-width: 501px)">
        {(matches) => (matches ? ( 
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[selectedMenuItemKey]} mode="inline" items={items} onSelect={handleMenuSelect}/>
        </Sider>) : (
          <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[selectedMenuItemKey]} mode="inline" items={items} onSelect={handleMenuSelect}/>
        </Sider>))}
      </Media>

      <Layout>
        <Header
          style={{
            padding: 0,
            marginBottom: 5,
            background: colorBgContainer,
          }}
        >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: '35px',
            height: '35px',
            marginRight: '15px',
            marginLeft: '15px',
          }}
        />
        <h2 style={{ margin: '0', color:'#3D9970' }}>ManezCo</h2>
      </div>
        </Header>
        <Content style={{
            margin: '0 16px',
          }}>
        <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {bread(selectedMenuItemKey)}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: '90%',
              background: colorBgContainer,
            }}
          >
            {selectedMenuItemKey==="4" && handleLogOut()}
            {selectedMenuItemKey==="1" && <QuizStatistic/>}
            {selectedMenuItemKey==="2" && <QuizDashboard/>}
            {selectedMenuItemKey==="31" && <EnglishQuiz lesson={'English'}/>}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Quiz Design ©2023 Created by Maple
        </Footer>
      </Layout>
    </Layout>
  );
};
export default TennisLayout;