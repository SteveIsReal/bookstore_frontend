import { Modal, Form, Input, InputNumber, Button, Select } from 'antd'
import { useEffect } from 'react'

const EditBook = (props) => {
    
    const Sub = () => {
        const form = Form.useFormInstance()

        return <Button onClick={() => form.setFieldsValue({title : 0})} />;
    }

    const [forms] = Form.useForm()

    useEffect(() => {
        if (props.editBook != null ){
        forms.setFieldsValue(
            {...props.editBook, category : props.editBook.category.name}
        )
        }
    }, [props.editBook])

    const handleFormSubmit = async () => {

        try{
            const formData = await forms.validateFields()
            console.log(formData)
            const {category, ...data} = formData
            console.log(category)
            //const [submitCategory] = (props.category.filter((category) => (category.label == formData.category)))
            props.handleSubmit({...data, price: Number(formData.price)}, category, props.editBook.id)

        }
        catch(err) {
            console.log(err)
        }

    }


    return (
        <Modal open={props.isOpen} onCancel={props.handleCancel} onOk={handleFormSubmit}>
            <br></br>
            <Form form={forms}>
                <Form.Item label="Title" name="title" rules={[{required: true}]}>
                    <Input /> 
                </Form.Item>
                <Form.Item label="Author" name="author" rules={[{required:true}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{required:true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Stock" name="stock" rules={[{required:true}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{required:true}]}>
                    <Select options={props.category} allowClear></Select>
                </Form.Item>
            </Form>
        </Modal>
    )

}

export default EditBook