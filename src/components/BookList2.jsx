import { Table , Tag, Button, Image} from 'antd';

export default function BookList(props) {
    const columns = [
        {title:"cover", dataIndex:'coverUrl', render: (text) => {

            console.log(text)

            return  <Image src={`http://127.0.0.1:3080${text}`} height={100}></Image>
        }},
        {title:"Category", dataIndex: "category", key:"category", render: (text) => {
            if (text != null){
                return <Tag color={"blue"}>{text.name}</Tag>
            } else {
                return <Tag>None</Tag>
            }
        }},
        {title: 'Title', dataIndex: 'title', key: 'title'},
        {title: 'Author', dataIndex: 'author', key: 'author'},
        {title: 'Description', dataIndex: 'description', key: 'description'},
        {title: 'Price', dataIndex: 'price', key: 'price'},
        {title: 'ISBN', dataIndex: 'isbn', key: 'isbn'},
        {title: 'Stock', dataIndex: 'stock', key: 'stock'},
        {title: 'Liked', dataIndex: 'likeCount', key: 'likeCount'},
        {title: 'Action', dataIndex: 'action', key: 'action', 
        render: (value, record, index ) => {
        return (<>
            <Button onClick={() => {props.onLiked(record.id)}} color='primary' variant='solid'>Like</Button>
            <Button onClick={() => {props.onDelete(record.id)}} color='danger' variant="dashed">Delete</Button>
        </>)}},
    ]

    return (
        <>
        <Table columns={columns} dataSource={props.data}/>
        </>
    )

}