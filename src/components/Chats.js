import React, {useRef, useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import {ChatEngine} from "react-chat-engine"
import {auth} from "../firebase"
import {useAuth} from "../contexts/AuthContext"
import axios from 'axios'

const Chats = () => {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const {user} = useAuth()

  console.log(user)

  const handleLogout = async () => {
    await auth.signOut()
    history.push("/")
  }

  const getFile = async (url) => {
    const response = await fetch(url)
    const data = await response.blob()

    return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
  }

  useEffect(() => {
    if(!user) {
      history.push("/")
      return
    }
    axios.get("https://api.chatengine.io/users/me", {
      headers: {
        "project-id": "a3817ed5-9550-462e-9c52-1337533439ac",
        "user-name": user.email,
        "user-secret": user.uid,
      }
    })
    .then(() => {
      setLoading(false)
    })
    .catch(() => {
      let formData = new FormData()
      formData.append('email', user.email)
      formData.append('username', user.email)
      formData.append('secret', user.uid)
      
      getFile(user.photoURL)
      .then((avatar) => {
        formData.append('avatar', avatar, avatar.name)
        axios.post('https://api.chatengine.io/users',
        formData,
        {headers: {"private-key": "f229cb91-ecd5-4135-a431-16d04e17b8d3"}}
        )
        .then(() => setLoading(false))
        .catch((error) => console.log(error))
      })
    })
  }, [user, history])

  if(!user || loading) return "Loading..."

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          DevChat
        </div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="a3817ed5-9550-462e-9c52-1337533439ac"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats