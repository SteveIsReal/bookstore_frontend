import {Form, Input, InputNumber, Select, Button} from 'antd'
import {useState, useEffect} from 'react'
import axios from 'axios'


export default function AddBook(props) {

    const generateId = () => {
        return Math.random().toString(36).substring(2, 15)
    }

    return (
        <Form layout='inline' onFinish={value => {props.onBookAdded({...value, likeCount:0})}}>
            <Form.Item name='title' label='Title' rule={[{ require: true}]}>
                <Input />
            </Form.Item>
            <Form.Item name='price' label='Price' rule={[{ require: true}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='stock' label='Stock' rule={[{ require: true}]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name='categoryId' label='Category'>
                <Select allowClear style={{"width":"150px"}} options={props.category}></Select>
            </Form.Item>
            <Form.Item name="author" label="Author" rules={[{required : true}]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type='Primary' htmlType='submit'>New Book</Button>
            </Form.Item>
        </Form>
    )

}