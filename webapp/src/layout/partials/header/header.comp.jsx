import React,{useState} from 'react'
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import "./headerStyles.css"

const Header = () => {


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(!open);
  };



  return (
    <>
      <div className="header">
      <div className="logo">CRM</div>
      <nav className='nav-bar'>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="tickets">Tickets</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>
      <div className="sidebar">
      <MenuOutlined onClick={showDrawer}/>
      </div>
      <Drawer 
      placement="right"
      width="40%"
      onClose={showDrawer} 
      open={open}
      >
        <ul>
          <li><a onClick={showDrawer} href="/dashboard">Dashboard</a></li>
          <li><a onClick={showDrawer} href="/tickets">Tickets</a></li>
          <li><a onClick={showDrawer} href="/">Logout</a></li>
        </ul>
      </Drawer>
      </div>
      
    </>
  )
}

export default Header