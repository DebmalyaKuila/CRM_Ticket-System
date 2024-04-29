import React from 'react'
import {Breadcrumb,Button,Typography} from 'antd'
import { useNavigate } from "react-router-dom";

import TicketTable from '../../components/tickets-table'

const Dashboard = () => {
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
  return (
    <div className=' h-full px-2 py-2'>
      <Breadcrumb
      items={[
        {
          title: <a href="">Home</a>,
        },
        {
          title: <a href="">Dashboard</a>,
        }
      ]}
      />

      <div className='text-center pt-5'>
      <Button className='bg-blue-400 w-4/12' onClick={()=>navigate("/add-ticket")} >Add new ticket</Button>
      <p className='pt-4'>Total tickets : 50</p>
      <p>Pending : 50</p>
      </div>
      <div>
        <Typography.Title>Recently added tickets</Typography.Title>
        <div>
          <TicketTable tickets={tickets} 
          scroll={210}/>
        </div>
      </div>

    </div>
  )
}

export default Dashboard