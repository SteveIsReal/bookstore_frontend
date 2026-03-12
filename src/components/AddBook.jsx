import {Form, Input, InputNumber, Select, Button, Modal} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useForm } from 'antd/es/form/Form'


export default function AddBook(props) {

    const generateId = () => {
        return Math.random().toString(36).substring(2, 15)
    }

    const [forms] = useForm()

    const formCancel = () =>{
        props.onCancel()
        forms.resetFields()
    }

    const submitForms = async () => {
        try {
            const formData = await forms.validateFields()
            props.onBookAdded({...formData, likeCount : 0})
            props.onCancel()
        }
        catch(err){
            console.error(err)
        }
        
    }

    return (
        <Modal open={props.addBookStatus} onCancel={formCancel} onOk={submitForms}>
        <br></br>
        <Form layout='horizontal' form={forms}>
            <Form.Item name='title' label='Title' rules={[{ required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item name='price' label='Price' rules={[{ required: true}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='stock' label='Stock' rules={[{ required: true}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='categoryId' label='Category'>
                <Select allowClear style={{"width":"150px"}} options={props.category}></Select>
            </Form.Item>
            <Form.Item name="author" label="Author" rules={[{required : true}]}>
                <Input />
            </Form.Item>
        </Form>
        </Modal>
    )

}