import { useMeQuery } from '../../../hooks/useMeQuery'
import { useConversationStore } from '../../../store/useConveration'
import MessageHeader from './ui/MessageHeader'
import MessageInput from './ui/MessageInput'
import Messages from './ui/Messages'
import NoChatSelected from './ui/NoChatSelected'

const MessageContainer = () => {
  const {selectedUser} = useConversationStore()
  if (selectedUser){
    return (
      <div className="h-full relative overflow-hidden flex flex-col">
      <MessageHeader />
      <div className="flex-1 overflow-auto">
        <Messages />
      </div>
      <div className="">
        <MessageInput />
      </div>
    </div>    
    )
  }else{
    return (
      <div className='flex items-center justify-center h-full'>
        <NoChatSelected/>
      </div>
    )
  }
}

export default MessageContainer