import React,{useEffect, useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Button, Typography, Input ,Table} from 'antd'

import TicketTable from '../../components/tickets-table'
const TicketList = () => {
  const navigate=useNavigate()
  const tickets= [
    {
        ticket_id: '1',
        issue: 'Server support',
        status: "pending",
        issue_date:"2024-10-22"
    },
    {
        ticket_id: '2',
        issue: 'Dashboard styling',
        status: "pending",
        issue_date:"2021-07-19"
    },
    {
        ticket_id: '3',
        issue: 'Frontend prototytping',
        status: "pending",
        issue_date:"2024-03-12"
    },
    {
        ticket_id: '4',
        issue: 'Frontend prototytping',
        status: "pending",
        issue_date:"2024-03-12"
    },
    {
        ticket_id: '5',
        issue: 'Frontend prototytping',
        status: "pending",
        issue_date:"2022-11-17"
    },
    {
        ticket_id: '6',
        issue: 'Frontend prototytping',
        status: "pending",
        issue_date:"2024-03-12"
    },
    {
      ticket_id: '7',
      issue: 'Dashboard styling',
      status: "pending",
      issue_date:"2021-03-13"
  },
  {
    ticket_id: '8',
    issue: 'Dashboard styling',
    status: "pending",
    issue_date:"2024-03-12"
},
{
  ticket_id: '9',
  issue: 'Dashboard styling',
  status: "pending",
  issue_date:"2024-05-02"
},
];

const [tableData,setTableData]=useState([])

useEffect(()=>{
  setTableData(tickets.map((obj)=>{
    return {...obj,["issue"]:<Link to={`/ticket/${obj.ticket_id}`}>{obj?.issue.toUpperCase()}</Link>}
  }))
},[])


  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);

    if(info?.source=='input'){
      let filteredTableData=tableData.filter((obj)=>{
        return obj.issue.toLowerCase().includes(value.toLowerCase())
       })
       setTableData(filteredTableData)
    }else{
      setTableData(tickets)
    }

    
  }


  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <a href="">Home</a>,
          },
          {
            title: <a href="">Ticket Lists</a>,
          }
        ]}
      />
      <div >
        <div className='flex justify-evenly items-center pt-4 mb-5'>
          <Button className='bg-blue-500' type='primary' onClick={()=>navigate("/add-ticket")}>Add new Ticket</Button>
          <Input.Search
            placeholder="search tickets"
            style={
              {
                width: 300
              }
            }
            enterButton="Search"
          
            allowClear
            onSearch={onSearch}
          />
        </div>
        <TicketTable
        tickets={tableData}
        scroll={325}
        />
      </div>
    </div>
  )
}

export default TicketList