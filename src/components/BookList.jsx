export default function BookList(props) {
  const generateRows = () => {
    if (props.data != null) {
      //console.log(props)
      return props.data.map( book => (
          <tr key={book.id} bgcolor={book.stock >= 30 ? "green" : "red"}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
            <td>{book.price}</td>
            <td>{book.isbn}</td>
            <td>{book.stock}</td>
            <td>{book.likeCount}</td>
            <td>
              <button onClick={ () => props.onLiked(book.id) }>Like</button>
              <button onClick={() => props.onDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))
    }
    else {
      return null
    }
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <td>Title</td>
          <td>Author</td>
          <td>description</td>
          <td>price</td>
          <td>ISBN</td>
          <td>Stocks</td>
          <td>Like</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {generateRows()}
      </tbody>
    </table>
  )
}
