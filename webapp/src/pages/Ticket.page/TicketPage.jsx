import React from 'react'
import { useParams } from 'react-router-dom';
import { Breadcrumb, Button, Typography, Input ,Table} from 'antd'
import MessageHistory from '../../components/message-history/messageHistory';
const TicketPage = () => {
  const {ticketId}=useParams()

  const ticket={
    ticket_id: '1',
    issue: 'Server support',
    status: "pending",
    issue_date:"2024-10-22",
    history:[
      {
        date:"20-10-2024",
        message:"hey , I think there's a serious issue in the UI . It breaks for devices of leaaser width than 330px",
        sender:"client-Ajay",
        role:"client"
      },
      {
        date:"20-10-2024",
        message:"okay , I get it. but do we really have to make it responsive for such small devices? ",
        sender:"Debmalya Kuila",
        role:"operator"
      },
      {
        date:"20-10-2024",
        message:"yes,we have some clients using small devices.",
        sender:"client-Ajay",
        role:"client"
      },
      {
        date:"20-10-2024",
        message:"okay , I will start working on this issue.",
        sender:"Debmalya Kuila",
        role:"operator"
      },
      {
        date:"20-10-2024",
        message:"But it might take some time huh!",
        sender:"Debmalya Kuila",
        role:"operator"
      },
    ]
};


  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <a href="">Home</a>,
          },
          {
            title: <a href="">Ticket</a>,
          }
        ]}
      />
      <div className='w-full text-center'>
      <Button className='bg-blue-500 w-6/12 my-6' type='primary'>Close Ticket</Button>
      </div>
      <div>
        {/* the whole ticket summary */}
        <Typography.Paragraph style={{fontSize:"1.3rem ",margin:0}}><strong>Ticket Id : </strong> {ticketId}</Typography.Paragraph>
        <Typography.Paragraph style={{fontSize:"1.3rem ",margin:0}}><strong>Subject : </strong> {ticket.issue}</Typography.Paragraph>
        <Typography.Paragraph style={{fontSize:"1.3rem",margin:0}}><strong>Open on : </strong> {ticket.issue_date}</Typography.Paragraph>
        <Typography.Paragraph style={{fontSize:"1.3rem",margin:0}}><strong>Status : </strong> {ticket.status}</Typography.Paragraph>
        <MessageHistory messageHistory={ticket.history}/>
      </div>
    </div>
  )
}

export default TicketPage