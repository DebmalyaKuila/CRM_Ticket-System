import React from 'react'
import {Breadcrumb} from 'antd'
import { useNavigate } from 'react-router-dom'
import AddTicketForm from '../../components/add_ticket_form.jsx'


const AddTicketsPage = () => {

  const navigate=useNavigate()

//antd form is already controlled component , so no need for custom controlled component
const handleSubmit=(form)=>{
  //just converted antd dayjs into string format
  //if there's a date available convert that to string , otherwise if it's empty ,it will be today's date
  console.log({...form,["issue_date"]:form.issue_date?form.issue_date.format():"",["status"]:"issue_raised",["assigned_to"]:"open"});
  navigate("/dashboard")
}
    

  return (
    <div className='h-full px-2 py-4'>
    <Breadcrumb
      items={[
        {
          title: <a href="">Home</a>,
        },
        {
          title: <a href="">New ticket</a>,
        }
      ]}
      />
      <div className='m-auto w-8/12 h-full'>
        <AddTicketForm
        // onChangeHandler={onChangeHandler}
        handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default AddTicketsPage