import React, { useEffect } from 'react'
import { Button, Typography, Form, Input, Space, DatePicker, Select } from 'antd'

import moment from "moment"

const AddTicketForm = ({handleSubmit}) => {



  return (
    <div className='bg-white mt-6 px-4 py-6 rounded-xl '>
      <Typography.Title level={2} className='text-center pb-6'>Add new Ticket</Typography.Title>
      <Form
        layout='horizontal'
        initialValues={{
          ["priority_level"]: "low",
          ["description"]:"",
          ["issue_date"]:moment(),
          
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          style={{ width: "60%" }}
          label="Subject"
          name="subject"
        >
          <Input
            placeholder='Enter the Issue '
            maxLength={70}
            required
            autoFocus
          />
        </Form.Item>
        <Space direction={(screen.width < 750) ? "vertical" : "horizontal"}>
          <Form.Item
            label="Issue found on"
            name="issue_date"
          >
            <DatePicker
            />
          </Form.Item>

          <Form.Item
            label="Priority level"
            name="priority_level"
          >
            <Select style={{
              width: 130,
            }}
              placeholder="select priority"
              options={[
                { value: 'low', label: <span>Low</span> },
                { value: 'medium', label: <span>Medium</span> },
                { value: 'high', label: <span>High</span> }]}
            />
          </Form.Item>
        </Space>
          
        <Form.Item 
        name='description'
         label="Description">
          <Input.TextArea
            rows={(screen.width < 750) ? 4 : 6}
            count={{
              show:true,
              max: 1000,
              exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join('')
            }}
          />
        </Form.Item>

        <Button className='bg-blue-500 text-white mb-2' htmlType="submit" block >Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddTicketForm