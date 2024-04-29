import React from 'react'
import { Table } from "antd"

const TicketTable = ({tickets,scroll}) => {

    const dataSource =tickets

    const columns = [
        {
            title: '#',
            dataIndex: 'ticket_id',
            key: 'ticket_id',
            width:"15%"
        },
        {
            title: 'Issue',
            dataIndex: 'issue',
            key: 'issue',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Found on',
            dataIndex: 'issue_date',
            key: 'issue_date',
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} 
        scroll={{
            y: scroll,
          }}
          pagination={{
            pageSize: 25,
          }}
          rowKey='ticket_id'
          bordered
          locale={
            {
                emptyText: 'No Tickets issued'
            }
          }
          />
    )
}

export default TicketTable