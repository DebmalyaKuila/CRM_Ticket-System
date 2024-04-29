import React from 'react'
import {Form,Input,Button,Typography} from "antd"

import "./entry.style.css"


const ResetPassword = () => {

  
  const handleOnResetPasswordSubmit = (form)=>{
    //TODO : api call to submit this form
 console.log(form);
}

  return (
    <div className="entry-page">
         <div className='bg-slate-100 px-20 py-14 rounded-xl '>
        <Typography.Title level={2} className='text-center pb-6'>Reset Password</Typography.Title>
        <Form
        layout='vertical'
        name='reset-password'
        onFinish={handleOnResetPasswordSubmit}
        >
            <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                  message: 'Please enter a valid email',
                  type:"email"
                },
              ]}
            >
            <Input 
            placeholder='Enter Email ' 
            autoFocus
            required
            />
            </Form.Item>
            
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button className='bg-blue-500 text-white mt-4' htmlType="submit" >
        Reset Password
      </Button>
    </Form.Item>
    <Typography.Link href="/" underline>Login now </Typography.Link>
        </Form>
    </div>
    </div>
  )
}

export default ResetPassword