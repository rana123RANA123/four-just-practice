import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Divider, message } from 'antd';
import { useAuthContext } from '../../../context/AuthContext'
import TextArea from 'antd/es/input/TextArea';
import '../../../App.scss'



const initialState = {
    title: '',
    description: '',
    date: '',
    id: '',
    dateCreated: '',
    status: ''
}
export default function Home() {
    const [messageApi, contextHolder] = message.useMessage();
    const { dispatch } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(initialState)
    const [todos, setTodos] = useState([])
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos")) || []

        setTodos(todos)
    }, [])



    const handleAddTodo = e => {
        e.preventDefault()
        const { title, description, date } = state

        if (title.length < 3) {
            return messageApi.open({
                type: 'error',
                content: 'Please Add Title',
            });
        }
        if (description.length < 10) {
            return messageApi.open({
                type: 'error',
                content: 'Please Add Description',
            });
        }
        // if (!date) {
        //     return messageApi.open({
        //         type: 'error',
        //         content: 'Please Add Date',
        //     });
        // }
        let todo = { ...state }
        todo.id = Math.round(Math.random() * 10000).toString(32);
        todo.dateCreated = new Date();
        todo.status = "active"
        let todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.push(todo)
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            localStorage.setItem("todos", JSON.stringify(todos))
            dispatch({ type: "SET_LOGGED_IN", payload: { todos } })
            setState(initialState)
            messageApi.open({
                type: 'success',
                content: 'Add ToDo Successfully',
            });
        }, 2000)



    }



    return (
        <div>
            {contextHolder}
            <div className="loginPage my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mt-3 m-auto"  id='inputTodo'>

                            <h2 className='text-center mt-5'>Add Todo</h2>
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


                            <Button type="success" htmlType="submit" loading={isProcessing} onClick={handleAddTodo} className='w-100 btn btn-dark py-0'>
                                Adddd TooDo0
                            </Button>
                            {/* </Form> */}


                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div >

        </div>
    )
}
