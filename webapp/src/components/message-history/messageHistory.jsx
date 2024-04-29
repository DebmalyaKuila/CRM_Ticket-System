import React from 'react'
import "./style.css"
import { Typography, Input ,Button} from 'antd'


const MessageHistory = ({messageHistory}) => {
  
  return (
    <div className='w-11/12 mt-12 mx-auto'>
      {!messageHistory
        ? <Typography.Title  level={1} className='text-center '>Add a comment</Typography.Title>
        :  
        messageHistory.map((row,index)=>{
          return (
          <div key={index} className={"message-history "+(row.role == "client" ? "client" :"operator")}>
          <div className="send">
          <div className="sender">{row.sender}</div>
          <div className="date">{row.date}</div>
          </div>
          <div className="message">{row.message}</div>
      </div>
          )
        })
      }
      <Input.TextArea
      allowClear
      rows={6}
      />
      <div className='w-full'>
      <Button type='primary' className='bg-blue-500 float-right mt-4 mx-10 ' >Send</Button>
      </div>
    </div>
  )
}

export default MessageHistory