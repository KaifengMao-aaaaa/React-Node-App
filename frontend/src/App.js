import './App.css';
import axions from 'axios'
import React, {useState, useEffect} from 'react';
function App() {
  const [userName,setUsername] = useState('')
  useEffect(() => {
    getNames()
  }, [])

  const getNames = async () => {
    const response = await axions.get('/api')
    setUsername(response.data)

  }
  return (
    <>
      <h1>  My frontend </h1>
      <h3> My name is {userName.message}</h3>
    </>
  )
}

export default App;
