import React from 'react'
import MessageBubble from './MessageBubble'

//fake chat messages
const messages = [
  {
    id: 1,
    text: 'Hello! How are you?',
    sender: 'currentUser',
    timestamp: '20 : 50',
  },
  {
    id: 2,
    text: 'I am good, thank you! How about you?',
    sender: 'chat',
    timestamp: '20 : 51',
  },
  {
    id: 3,
    text: 'I am doing well, thanks for asking!',
    sender: 'currentUser',
    timestamp: '20 : 52',
  },
  {
    id: 4,
    text: 'What are you up to?',
    sender: 'chat',
    timestamp: '20 : 53',
  },
  {
    id: 5,
    text: 'Just working on some projects. You?',
    sender: 'currentUser',
    timestamp: '20 : 54',
  },
  {
    id: 6,
    text: 'I am working on a new project. How about you?',
    sender: 'chat',
    timestamp: '20 : 55',
  },
  {
    id: 7,
    text: 'Just working on some projects. You?',
    sender: 'currentUser',
    timestamp: '20 : 54',
  },
  {
    id: 8,
    text: 'I am working on a new project. How about you?',
    sender: 'chat',
    timestamp: '20 : 55',
  },
]

const Messages = () => {
  return (
    <div className='p-6 flex flex-col max-h-[calc(100vh-200px)] gap-4'>
      {messages.map(({id ,sender , text , timestamp })=>(
        <MessageBubble key={id} id={id} sender={sender} text={text} timestamp={timestamp}  />
      ))}
    </div>
  )
}

export default Messages