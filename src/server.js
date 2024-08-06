const express=require("express");
const app=express();

app.use(express.json());

const listOfBooks = [];
book_id = 1;

app.post("/book", (request, response) => {
    
    console.log(request.body);
    
    const book = {
        id: book_id,
        title: request.body.title,
        author: request.body.author,
        genre: request.body.genre
    };


    listOfBooks.push(book);
    book_id += 1;

    const successResponse = {
        message: "Book created successfully",
        book: listOfBooks
    };

    response.send(successResponse)
});

app.get("/book", (request, response) => {
    const successResponse = {
        message: "List of books is currently: ",
        books: listOfBooks
    }

    response.send(successResponse)
})

app.put("/book", (request, response) => {
    function findBook(x) {
        return x.title === request.body.title
    }
    const index = listOfBooks.findIndex(findBook)

    if (index !== -1) {
        listOfBooks[index].author = request.body.author;
        listOfBooks[index].genre = request.body.genre;
        responseMessage = {
            msg: "author and genre updated",
            book: listOfBooks[index]
        }
    } else {
        responseMessage = {
            msg: "Book title not found",
            book: request.body.title
        }
    }

    response.send(responseMessage)

})

app.delete("/book", (request, response) => {
    function findBook(x) {
        return x.title = request.body.title
    }
    const index = listOfBooks.findIndex(findBook)

    listOfBooks.splice(index,1)

    responseMessage = {
        msg: "Book deleted",
        book: request.body.title,
        books: listOfBooks
    }

    response.send(responseMessage)
})

app.listen(5001, () => console.log("server listening on port 5001"))