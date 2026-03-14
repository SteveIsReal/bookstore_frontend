import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu } from 'antd'

export default function NavBar () {

    const [current, setCurrent] = useState('')
    const navigate = useNavigate()

    const onNavClick = (e) => {
        setCurrent(e.key)
        navigate(`/${e.key}`)
    }

    return (
    <Menu style={{padding: 30, position: 'sticky', zIndex: 1, top: 0}}
    items={[
        {label:'Book', key:'book'},
        {label:'Settings', key:'settings'},
    ]} 
    selectedKeys={current} mode='horizontal' onClick={onNavClick}></Menu>
    )
}