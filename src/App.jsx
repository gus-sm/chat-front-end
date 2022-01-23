import React, { useCallback, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Sidebar from './components/sidebar';
import ChatComponent from './components/chat-content';
import InputChat from './components/input';
import createChat from 'logic_module/chat';
import createRoom from 'logic_module/room';
import { io } from "socket.io-client";
import './App.css';

const socket = io("localhost:3001");
const chat = createChat();
const room = createRoom();


function App() {
    const [connected_flag, setConnectedFlag] = useState(false);
    const [room_state, setRoomState]  = useState();
    //const [chat_state, setChatState] = useState();
    const [chat_history, setChatHistory] = useState([]);

    const clickFunction = useCallback((e,msg)=>{
      handleClick(e,msg)
    });

   function handleClick(e, message){
      e.preventDefault();
      const userId = socket.id;
      
      socket.emit("add-message",{
        userId,
        message
      });
    
    }

    useEffect(()=>{

      socket.on("connect", () => {
        setConnectedFlag(true);
        room.addUser(socket.id);
  
        socket.on("setup", (state) => {
          room.setState(state.room_state)
          chat.setState(state.chat_status);
  
          setRoomState(room.state);
          //setChatState(chat.state);  
        });

        socket.on("add-user", (obj) => {
          
          if(obj.userId !== socket.id){
            room.addUser(obj.userId);
            
            setRoomState(prevState=>({
              ...prevState,
              users : room.state.users
            }));
          }

        });
  
        socket.on("remove-user", (obj) => {
          room.removeUser(obj.userId);
        
          setRoomState(prevState => ({
            ...prevState,
            users: room.state.users
          }));
  
        });
  
        socket.on("message-has-been-received", (obj) => {
          chat.addMessage(obj.userId, obj.message);

          setChatHistory(prevArray => [...prevArray,
            (<Row id = "message_canvas">

              <div className = {socket.id === obj.userId ? "current_user_message": "message"}>
                  <p>
                    <span style={{fontSize:"15px",color: "cornflowerblue"}}>{obj.userId}:</span><p>{obj.message}
                    </p>
                  </p>
              </div>

          </Row>)
          
          ]);
        });

        socket.on("disconnect", () => {
          
          room.removeUser(socket.id);
          room.setState({users:[]});
          chat.setState({});
          setConnectedFlag(false);
        });
  
      });
    })
  
  return (
    <>
      <Row style={{ width: "100%", display: "flex" }}>

        <Sidebar userConnected={connected_flag} connected_users={room_state ? room_state.users : ""}/>
        
        <div style={{ width: "85%", marginLeft: "5px", maxHeight: "100vh" }}>
          <div style={{maxHeight: "50%"}}>
            <ChatComponent msg_list={chat_history} />
          </div>
          
          <InputChat clickHandler={clickFunction}/>
        </div>

      </Row>
    </>
  );
}

export default App;
