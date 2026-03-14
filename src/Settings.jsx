import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd'
import axios from 'axios'
import NavBar from './components/NavBar'

export default function Settings() {

    const CATEGORY_URL = 'http://localhost:3000/api/book-category'

    const [categories, setCategories] = useState([])
    const [categoryCreate, setCategoryCreate] = useState(false)
    const [categoryEdit, setCategoryEdit] = useState(null)

    const [forms] = Form.useForm()

    const tableFormat = [
        {
            title : 'Category',
            dataIndex : 'name',
            key : 'category',
        },
        {
            title : 'Description',
            dataIndex : 'description',
            key : 'description`'
        },
        {
            title : 'Action',
            dataIndex : 'action',
            key : 'action',
            render: (value, record, index) => (<>
            <Button color='primary' variant='outlined' onClick={() => setCategoryEdit(record)}>Edit</Button>
            <Button color='danger' variant='solid' onClick={() => deleteCategory(record)}>Delete</Button>
            </>)
        }
    ]

    const onNavClick = e => {
        console.log(e)
        navigate(`/${e.key}`)
    }
    
    const fetchCategories = async () => {
        const response = await axios.get(CATEGORY_URL)
        setCategories(response.data)
    }

    const createCategory = async () => {
        const formData = await forms.validateFields()
        forms.resetFields()
        const request = await axios.post(CATEGORY_URL, {name : formData.name, description : formData.description})
        fetchCategories()
        setCategoryCreate(false)
    }

    const handleCancel = () => {
        setCategoryCreate(false)
        setCategoryEdit(null)
        forms.resetFields()
    }

    const handleSubmit = () => {
        categoryCreate ? createCategory() : editCategory()
    }

    const deleteCategory = async (data) => {
        try{
        data.books.map(async (value) => await axios.patch('http://localhost:3000/api/book/'+value.id, {'categoryId' : null}))
        const response = await axios.delete(CATEGORY_URL+'/'+data.id)
        fetchCategories()
        } catch(err){
            alert(err)
        }
    }

    const editCategory = async () => {
        const formData = await forms.validateFields()
        forms.resetFields()
        const response = await axios.patch(CATEGORY_URL+'/'+categoryEdit.id, {name : formData.name, description: formData.description})
        fetchCategories()
        setCategoryEdit(null)
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {  
        console.log(categoryEdit)
        if(categoryEdit != null){
            forms.setFieldsValue(categoryEdit)
        }
    }, [categoryEdit])

    return (
        <>

        <Modal open={categoryCreate || categoryEdit != null} onOk={handleSubmit} onCancel={handleCancel}>
            {categoryCreate ? <h2>Create Category</h2> : <h2>Edit Category</h2>}
            <Form form={forms}>
                <Form.Item label='Name' name='name' rules={[{required : true}]}>
                    <Input /> 
                </Form.Item>
                <Form.Item label="Description" name='description' rules={[{required: true}]}>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>

        <NavBar />
        <h1>This is Settings</h1>
        <Button onClick={() => setCategoryCreate(true)} type='primary' style={{margin:2}}>Create new category</Button>
        <Table dataSource={categories} columns={tableFormat} pagination={{ pageSize : 5}} style={{width:"100vw"}}/>
        
        </>
    )
}