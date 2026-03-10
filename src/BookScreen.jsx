
import { useState, useEffect } from 'react'
//import BookList from "./components/BookList//"
import BookList from './components/BookList2.jsx'
import Clock from "./components/Clock.jsx"
import AddBook from './components/AddBook.jsx'
import EditBook from './EditBook.jsx'
import {Button, Spin} from 'antd'
import { StepForwardOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Link } from 'react-router-dom'

const URL_BOOK = "/api/book"

function BookScreen(props) {
  const [total, setTotalAmount] = useState(0)
  const [bookData, setBookData] = useState([])
  const [loading, setLoading] = useState(false)

  /*
  const summary = () => {
    const bookCount = bookData.reduce( (total, book) => total += book.stock, 0)
    if (bookCount > 50) {
      return <p style={{ "color" : "green"}}>Wow, so many books - {bookCount}</p>
    }
    else {
      return <p style={{ "color" : "red"}}>Low stock - {bookCount}</p>
    }
    const positiveSummary = <p style={{ "color" : "green"}}>Wow, so many books - {bookCount}</p>
    const negativeSummary = <p style={{ "color" : "red"}}>Low stock - {bookCount}</p>

  }
  */
  const bookCount = bookData.reduce( (total, book) => total += book.stock, 0)
  const positiveSummary = <p style={{ "color" : "green"}}>Wow, so many books - {bookCount}</p>
  const negativeSummary = <p style={{ "color" : "red"}}>Low stock - {bookCount}</p>
  
  const [categories, setCategories] = useState([])

  const [counter, setCounter] = useState(0);
  useEffect(() => console.log(`Change ${counter}`), [counter])

  const counterClicked = () => {
    setCounter(counter + 1)
  }

  const fetchBook = async () => {
    setLoading(true);
    try{
      const response = await axios.get(URL_BOOK)
      setBookData(response.data)

    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [])

  const generateBook = () => {
    const current = bookData.length + 1
    console.log(`created book ${current}`)
    const data = {
      id: current,
      title: titleValue,
      author: `Unknown ${current}`,
      description: `Dummy description ${current}`,
      price: Number(priceValue),
      stock: Number(stockValue),
      likeCount: 0

    }

    return data
  }

  const addBook = async (book) => {
    try{
      const reponse = await axios.post('http://localhost:3000/api/book', book)
      fetchBook()
      
    }
    catch(err) {
      console.log(err)
    }
  }

  const [value, setValue] = useState(0)
  const [titleValue, setTitleValue] = useState("")
  const [priceValue, setPriceValue] = useState(0)
  const [stockValue, setStockValue] = useState(0)

  const [editBook, setEditBook] = useState(null)

  const handleLike = async (bookId) => {

    try{
      const postLike = await axios.post(`http://localhost:3000/api/book/${bookId}/like`)

      const response = await axios.get(`http://localhost:3000/api/book/${bookId}`) 
      setBookData( bookData.map( book => (book.id === bookId ? {...book, likeCount : response.data.likeCount} : book)))
    }
    catch (err){
      console.error(err)
    }
  }

  const deleteBook = async (bookId) => {
    try{
      const deleteBook = await axios.delete(`http://localhost:3000/api/book/${bookId}`)
      fetchBook()

    }
    catch(err) {
      console.error(err)

    }
  }


  const onEdit = (record) => {
    setEditBook(record)
  }

  useEffect(() => {
    console.log(editBook)

  }, [editBook])


  const URL_CATEGORY = '/api/book-category'

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000'+URL_CATEGORY)
    setCategories(response.data.map((items) => ({value:items.id, label: items.name})))
  }

  const patchBook = async (formData, category, id) => {

    const categoryResponse = await axios.get('http://localhost:3000'+URL_CATEGORY)

    console.log(`category : ${category} ${typeof(category) == "number"}`)

    if (typeof(category) == "number"){
      formData.categoryId = category
    }

    const response = await axios.patch(`http://localhost:3000/api/book/${id}`, formData)
    setEditBook(null)
    fetchBook()
  }

  useEffect(() => {
    setCategories(fetchCategories())
  }, [])

  useEffect(() => setValue(bookData.reduce((total , book) => total + (book.price * book.stock), 0)), [bookData])

  return (
    <>
      <Clock></Clock>
      {`Money : ${value}`}
      <h3>Book List</h3>
      {`Counter ${counter}`}

      <AddBook category={categories} onBookAdded={addBook}/>

      {/*bookCount < 50 ? negativeSummary : positiveSummary*/}
      {bookCount >= 50 && positiveSummary}
      {bookCount < 50 && negativeSummary}

      <Spin spinning={loading}>
        <BookList data={bookData} onLiked={handleLike} onDelete={deleteBook} onEdit={onEdit}/>
      </Spin>

      <EditBook 
        isOpen={editBook == null ? false : true} 
        handleCancel={() => setEditBook(null)} 
        editBook={editBook}
        category={categories}
        handleSubmit={patchBook}
      />
    </>
  )
}

export default BookScreen
