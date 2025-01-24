import React from 'react'

const handleSend = ()=>{
   console.log("this is handle Send");
   
}
export const SendButton = ({
    onClick = handleSend ,
    className = "Send-btn btn px-0 py-0"
})=>{
   return(
    <button onClick={onClick} className={className} style={{
      fontWeight: "600",
      borderRadius: "0",
      backgroundColor: "#758694",
      fontSize: "12px",
        border: "1px solid grey",
        color : "white"
    }}>
       Send
    </button>
   )
}