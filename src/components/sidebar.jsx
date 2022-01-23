import React, {useState} from "react";
import {Container, Nav} from 'react-bootstrap';


function Sidebar(props){
    console.log(props.connected_users);
    return(
        <>
        <Nav className = "sidebar">
            <h2 style={{textAlign: "center"}}>Chat project - Gus</h2>
            { props.userConnected ? 
                <div style={{backgroundColor: "lightgreen", color: "#fff", borderRadius: "5px", width: "25%", margin: "0 auto"}}>
                    <p style={{margin: "0 2px 0 3px"}}>
                        On-line
                    </p>
                </div> :
                 
                <div style={{backgroundColor: "red", color: "#fff", borderRadius: "5px", width: "25%", margin: "0 auto"}}>
                    <p style={{margin: "0 2px 0 3px"}}>
                        Off-line
                    </p>    
                </div>}

                <Container style={{textAlign:"center", borderTop:"1px dotted black",marginTop: "10px"}}>
                    <h3>Usuarios conectados:</h3>
                    { 
                        props.connected_users !== "" ?
                            props.connected_users.map((item)=>{
                                return <p key={item}>{item}</p>
                            }) 
                        : ""
                    }
                </Container>

            
        </Nav>
        </>
    );
    
}

export default Sidebar;