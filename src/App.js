
import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import './Quote.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [quote,setQuote] = useState("");
const [author,setAuthor] = useState("");
 const [tags,setTags] = useState([]);
 const [selectedTag, setSelectedTag] = useState("");
 const [bookmarks, setBookmarks] = useState([]);
 

 
 const quoteAPI = async (selectedTag) =>{
  let arrayOfQuotes = [];
  let apiUrl = "https://api.quotable.io/random";
  if (selectedTag) {
    apiUrl += `?tags=${selectedTag}`;
  }
  try{
const data =  await axios.get("https://api.quotable.io/random")
 console.log(data)
 arrayOfQuotes=data.data;
}catch(error){
   console.log(error)
  }
  try{
  setQuote(arrayOfQuotes.content)
  setAuthor(arrayOfQuotes.author)
  setTags(arrayOfQuotes.tags)
  }catch(error){
    console.log(error)
  }
};
const onTagChange = (event)=>{
  setSelectedTag(event.target.value)
}
const onBookmark = () =>{
  const newBookmark = { quote, author, tags };
  setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);

  const newWindow = window.open(`http://localhost:3004/bookmarks${bookmarks}`, '_blank')
  if (newWindow) newWindow.opener = null


}


useEffect(()=>{
  quoteAPI();
},[]);
return(
 
 
  <div className='App'>
    <div className='quoteBox'>
      <div className='quoteButton'><button onClick={quoteAPI}>NEW QUOTE</button></div>
      <div className='quote'onChange={onTagChange}><h4>{quote}</h4></div>
      <div className='author'><h3>{author}</h3></div>
 <Router>

 <Link to="/bookmarks"><button onClick={onBookmark}>Bookmark</button></Link>  
 
  <Switch>
          <Route path="/bookmarks">
          
          </Route>
          </Switch>
          </Router>
    </div>
   <div>
    
   <h2>List of Tags</h2>

    <select value={selectedTag} onChange={onTagChange}>
     <option value="" ><h5 className='select'>Select Tag</h5></option>
     {tags.map((tag,index) => (
       <option key={index} value={tag}>{tag}</option>
     ))}      
  </select>
  
   </div>    
    
 
  
  </div>
  
)
};
export default App;


