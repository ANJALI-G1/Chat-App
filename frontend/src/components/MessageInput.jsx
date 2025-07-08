import { useState,useRef } from "react"
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text,settext]=useState("");
    const [imagePreview,setImagePreview]=useState(null);
    const fileInputRef=useRef(null);

    const {sendMessages}=useChatStore();
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("please select an image file")
            return;
        }

        const reader=new FileReader();
        reader.onloadend=()=>{
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    }

    // to remove image
    const removeImage=()=>{
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value="";
    }

    const handleSendMessages=async(e)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;

        try {
            await sendMessages({
                text:text.trim(),
                image:imagePreview,
            });

            //clearing input

            settext("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value="";

        } catch (error) {
           console.log(error);
        }

    }
  return (
    <>
    <div className="p-4 w-full">

    {imagePreview && (<div className="mb-3 flex items-center gap-2 ">
        {/* ImagePreview */}
        <div className="relative">
            <img
            src={imagePreview}
            alt="Preview"
            className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
            onClick={removeImage}
            className="absolute -top-1.5 --right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
            type="button"
            >
                <X className="size-3"/>

            </button>
        </div>

       
    </div>)}
     <form onSubmit={handleSendMessages} className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
                {/* Messgage */}
                <input
                type="text"
                className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                placeholder="Type a message..."
                value={text}
                onChange={(e)=>settext(e.target.value)}
                />

                {/* Image Upload */}
             
                <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
                />

                <button
                type="button"
                className={`hidden sm:flex btn btn-circle ${imagePreview?"text-emerald-500":"text-zinc-400"}`}
                onClick={()=>fileInputRef.current?.click()}
                >
                    <Image size={20} />
                </button>

                {/* sending button */}

                <button 
                type="submit"
                className="btn btn-sm btn-circle"
                disabled={!text.trim() && !imagePreview}
                >
                    <Send className="" size={22}/>
                </button>
            </div>

        </form>
        </div>
    </>
  )
}
export default MessageInput