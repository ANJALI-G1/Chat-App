import { useChatStore } from "../store/useChatStore.js"
import ChatHeader from "./chatHeader.jsx";
import { useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=useChatStore();
  const {authUser}=useAuthStore();

  if(isMessagesLoading) return <>
  <div className="flex flex-1 flex-col overflow-auto">
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>
  </>

  useEffect(()=>{
    getMessages(selectedUser._id);
  },[selectedUser._id,getMessages])

  return (
    <>
    <div className="flex flex-1 flex-col overflow-auto ">
      <ChatHeader/>

      {/* Message that will be get displayed */}
      <p>messages...</p>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message)=>(
          <div 
          className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`}
          key={message._id}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img 
                src={message.senderId==authUser.id?authUser.profilePic || "/avatar.png":selectedUser.profilePic || "/avatar.png"}
                alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        ))}
      </div>
      <MessageInput/>
    </div>
    </>
  )
}
export default ChatContainer