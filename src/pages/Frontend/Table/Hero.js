import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Divider, Form, Input, Modal, message } from 'antd'
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import TextArea from 'antd/es/input/TextArea';

const initialState = {
  title: '',
  description: '',
  date: '',
  id: '',
  dateCreated: '',
  status: ''
}
export default function About() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])




  const handleOk = (e) => {
    e.preventDefault()
    const { title, description, date } = state

    if (title.length < 3) {
      return messageApi.open({
        type: 'error',
        content: 'Add Title',
      });
    }
    if (description.length < 10) {
      return messageApi.open({
        type: 'error',
        content: 'Add Description',
      });
    }
    if (!date) {
      return messageApi.open({
        type: 'error',
        content: 'Add Date',
      });
    }
    let todo = { ...state, title, description, date }
    todo.dateCreated = new Date();
    const updateTodo = todos.map((oldtodo) => {
      if (oldtodo.id === todo.id)
        return todo
      return oldtodo
    })
    setTodos(updateTodo)
    localStorage.setItem("todos", JSON.stringify(updateTodo))
    messageApi.open({
      type: 'success',
      content: 'Update ToDo Successfully',
    });
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    messageApi.open({
      type: 'error',
      content: 'You Cancel Update',
    });
  };

  const handleChange = (e) => {
    e.preventDefault()
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }



  const handleDelete = todo => {

    let filteredData = todos.filter((oldTodo) => {
      return oldTodo.id !== todo.id
    })

    setTodos(filteredData)
    localStorage.setItem("todos", JSON.stringify(filteredData))
    messageApi.open({
      type: 'error',
      content: 'Delete ToDo Successfully',
    });
  }

  return (
    <>
    {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mt-5">
              <h2 className='text-center py-3'>TODO TABLE</h2>
              <div className="table-responsive ">
                <table className="table table- table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Description </th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table">
                    {
                      todos.map((todo, i) => {
                        return (

                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{todo.title}</td>
                            <td>{todo.location}</td>
                            <td>{todo.description}</td>
                            <td>{todo.date}</td>
                            <td>
                                {/* <DeleteOutlined className='text-danger' onClick={() => { handleDelete(todo) }} /> */}

                                <button className='btn btn-info bt-sm me-1' onClick={() => { setState(todo); setIsModalOpen(true); }} >Edit</button>

                                <button className='btn btn-danger bt-sm me-1' onClick={() => { handleDelete(todo) }} >Delete</button>

                                 {/* <EditOutlined className='text-info' onClick={() => { setState(todo); setIsModalOpen(true); }} /> */}
                                 </td>
                          </tr>


                        )

                      })
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="UpDate ToDo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

         <div>
            {contextHolder}
            <div className="loginPage my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mt-3 m-auto"  id='inputTodo'>

                            <h2 className='text-center mt-5'>ADD TODO</h2>
                            <Divider />

                            <div className="row">
                                <div className="col col-md-4 col-lg-4">
                                    <Form.Item>
                                        <Input placeholder='Add Title' value={state.title} name='title' onChange={handleChange} />
                                    </Form.Item>
                                </div>

                                <div className="col col-md-4 col-lg-4">
                                    <Form.Item>
                                        <Input placeholder='Add Location' value={state.location} name='location' onChange={handleChange} />
                                    </Form.Item>
                                </div>

                                <div className="col col-md-4 col-lg-4">
                                    <Form.Item>
                                        <input type="date" className='form-control' value={state.date} name='date' onChange={handleChange} />
                                    </Form.Item>
                                </div>
                            </div>



{/* 
                            <Form.Item>
                                <input type="date" className='form-control' value={state.date} name='date' onChange={handleChange} />
                            </Form.Item> */}


                            <Form.Item
                            // label="Description"
                            >

                                <br />
                                <TextArea rows={4} placeholder="Add Description" value={state.description} name='description' onChange={handleChange} />

                            </Form.Item>


                            
                            {/* </Form> */}


                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div >

        </div>




      </Modal>
    </>
  )
}
