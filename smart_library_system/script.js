// GET BOOKS
function getBooks(){
return JSON.parse(localStorage.getItem("books")) || [];
}

// SAVE BOOKS
function saveBooks(books){
localStorage.setItem("books", JSON.stringify(books));
}

// ADD BOOK
function addBook(){

let id = document.getElementById("bookid").value
let name = document.getElementById("bookname").value
let author = document.getElementById("author").value
let image = document.getElementById("image").value

if(id=="" || name==""){
alert("Enter Book Details")
return
}

let book = {
id:id,
name:name,
author:author,
image:image
}

let books = getBooks()

books.push(book)

saveBooks(books)

document.getElementById("msg").innerHTML="✅ Book Added Successfully"

}

// LOAD BOOKS TABLE
function loadBooks(){

let table=document.getElementById("bookTable")

if(!table) return

let books=getBooks()

books.forEach((book,index)=>{

let row=table.insertRow()

let c1=row.insertCell(0)
let c2=row.insertCell(1)
let c3=row.insertCell(2)

c1.innerHTML=book.name
c2.innerHTML=book.author

c3.innerHTML=`
<button onclick="editBook(${index})">Edit</button>
<button onclick="deleteBook(${index})">Delete</button>
`

})

}

// DELETE BOOK
function deleteBook(index){

let books=getBooks()

if(confirm("Are you sure to delete?")){

books.splice(index,1)

saveBooks(books)

alert("Book Deleted")

location.reload()

}

}

// EDIT BOOK
function editBook(index){

let books=getBooks()

let newName=prompt("Enter New Book Name",books[index].name)
let newAuthor=prompt("Enter New Author",books[index].author)

if(newName!=null && newAuthor!=null){

books[index].name=newName
books[index].author=newAuthor

saveBooks(books)

alert("Book Updated")

location.reload()

}

}

// SEARCH BOOK
function searchBook(){

let keyword = document.getElementById("searchInput").value.toLowerCase()

let books = getBooks()

let found = books.find(book => book.name.toLowerCase() === keyword)

if(found){

document.getElementById("result").innerHTML = `
<h3>Book Found</h3>

<img src="${found.image}" width="120">

<p>Book : ${found.name}</p>
<p>Author : ${found.author}</p>

<a href="dashboard.html">⬅ Back</a>
`

}

else{

document.getElementById("result").innerHTML =
"<span style='color:red'>Book Not Found</span>"

}

}

// REGISTER USER
function registerUser(){

let name = document.getElementById("name").value
let email = document.getElementById("email").value
let password = document.getElementById("password").value

if(name=="" || email=="" || password==""){
alert("Please fill all fields")
return
}

let users = JSON.parse(localStorage.getItem("users")) || []

users.push({
name:name,
email:email,
password:password
})

localStorage.setItem("users", JSON.stringify(users))

alert("Registration Successful")

window.location.href="login.html"

}

// LOGIN USER
function loginUser(){

let email = document.getElementById("loginEmail").value
let password = document.getElementById("loginPassword").value

let users = JSON.parse(localStorage.getItem("users")) || []

let found = users.find(user =>
user.email === email && user.password === password)

if(found){

localStorage.setItem("currentUser", found.name)

alert("Login Success")

window.location.href="dashboard.html"

}
else{

alert("Invalid Email or Password")

}

}

// ISSUE BOOK
function issueBook(){

let student = document.getElementById("studentname").value
let bookid = document.getElementById("bookid").value
let book = document.getElementById("bookname").value
let issue = document.getElementById("issuedate").value
let ret = document.getElementById("returndate").value

if(student=="" || book==""){
alert("Enter details")
return
}

let table = document.getElementById("tabledata")

let row = table.insertRow()

row.insertCell(0).innerHTML = student
row.insertCell(1).innerHTML = bookid
row.insertCell(2).innerHTML = book
row.insertCell(3).innerHTML = issue
row.insertCell(4).innerHTML = ret

document.getElementById("msg").innerHTML =
"📚 Book Issued Successfully"

clearForm()

}

// CLEAR FORM
function clearForm(){

document.getElementById("studentname").value=""
document.getElementById("bookid").value=""
document.getElementById("bookname").value=""
document.getElementById("issuedate").value=""
document.getElementById("returndate").value=""

}

// CHECK FINE
function checkFine(){

let returnDate = document.getElementById("returndate").value
let checkDate = document.getElementById("returndatecheck").value

if(returnDate=="" || checkDate==""){
alert("Select return date")
return
}

let rdate = new Date(returnDate)
let cdate = new Date(checkDate)

let diff = cdate - rdate

let days = Math.floor(diff/(1000*60*60*24))

if(days>0){

let fine = days * 10

document.getElementById("fine").innerHTML =
"Late "+days+" days. Fine ₹"+fine

document.getElementById("paybtn").style.display="block"

}else{

document.getElementById("fine").innerHTML =
"No Fine 🎉"

document.getElementById("paybtn").style.display="none"

}

}

// PAY FINE
function payFine(){

alert("Redirecting to Google Pay")

window.open("https://pay.google.com")

}

// AUTO LOAD
window.onload=loadBooks
function loadHistory(){

let history = JSON.parse(localStorage.getItem("history")) || []

let table = document.getElementById("historyTable")

// clear table first
table.innerHTML = `
<tr>
<th>Student Name</th>
<th>Book Name</th>
<th>Action</th>
</tr>
`

history.forEach((h,index)=>{

let row = table.insertRow()

row.insertCell(0).innerHTML = h.student
row.insertCell(1).innerHTML = h.book

row.insertCell(2).innerHTML =
`<button onclick="deleteHistory(${index})">Delete</button>`

})

document.getElementById("total").innerHTML = history.length

}

window.onload = loadHistory


function deleteHistory(index){

let history = JSON.parse(localStorage.getItem("history")) || []

history.splice(index,1)

localStorage.setItem("history", JSON.stringify(history))

loadHistory() // reload table without refreshing page

}


function searchHistory(){

let text = document.getElementById("searchHistory").value.toLowerCase()

let history = JSON.parse(localStorage.getItem("history")) || []

let table = document.getElementById("historyTable")

table.innerHTML = `
<tr>
<th>Student Name</th>
<th>Book Name</th>
<th>Action</th>
</tr>
`

let filtered = history.filter(h =>
h.student.toLowerCase().includes(text) ||
h.book.toLowerCase().includes(text)
)

filtered.forEach((h,index)=>{

let row = table.insertRow()

row.insertCell(0).innerHTML = h.student
row.insertCell(1).innerHTML = h.book

row.insertCell(2).innerHTML =
`<button onclick="deleteHistory(${index})">Delete</button>`

})

}
function issueBook(){

let student = document.getElementById("student").value
let book = document.getElementById("book").value

let history = JSON.parse(localStorage.getItem("history")) || []

let newData = {
student: student,
book: book
}

history.push(newData)

localStorage.setItem("history", JSON.stringify(history))

alert("Book Issued Successfully")

}
function loadHistory(){

let history = JSON.parse(localStorage.getItem("history")) || []

let container = document.getElementById("historyList")

container.innerHTML = ""

history.forEach(h => {

container.innerHTML += `
<p>
Student Name: ${h.student}<br>
Book Name: ${h.book}
</p>
<hr>
`

})

}

window.onload = loadHistory
function issueBook(){

let student = document.getElementById("studentname").value
let bookid = document.getElementById("bookid").value
let book = document.getElementById("bookname").value
let issuedate = document.getElementById("issuedate").value
let returndate = document.getElementById("returndate").value

if(student=="" || bookid=="" || book==""){
document.getElementById("msg").innerHTML="Fill all fields"
return
}

let history = JSON.parse(localStorage.getItem("history")) || []

let data = {
student: student,
bookid: bookid,
book: book,
issuedate: issuedate,
returndate: returndate
}

history.push(data)

localStorage.setItem("history", JSON.stringify(history))

document.getElementById("msg").innerHTML="Book Issued Successfully 📚"

loadTable()

}
function loadTable(){

let history = JSON.parse(localStorage.getItem("history")) || []

let table = document.getElementById("tabledata")

table.innerHTML=""

history.forEach(h => {

table.innerHTML += `
<tr>
<td>${h.student}</td>
<td>${h.bookid}</td>
<td>${h.book}</td>
<td>${h.issuedate}</td>
<td>${h.returndate}</td>
</tr>
`

})

}

window.onload = loadTable
new QRCode(document.getElementById("qrcode"),{
text:data,
width:150,
height:150
})