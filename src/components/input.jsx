import React, {useState} from "react";
import {Row, Button, Form} from 'react-bootstrap';

function InputChat(props){
    const [text_value, setTextValue] = useState();

    return(
        <>
        <Row style = {{display: "flex"}}>
            <div style = {{ position: "absolute", bottom: "0",marginBottom:"2%"}}>

              <Form>
                <Form.Control as="textarea" 
                  onChange={(e)=>{
                      e.preventDefault();
                      setTextValue(e.target.value);
                    }}

                  value={text_value}
                  as="textarea" 
                  style = {{resize: "none", borderRadius: "5px"}} 
                  rows={5} 
                  cols = {180} />
              
              </Form>
              <Button id="send_button" type="submit" onClick={(e)=>{
                  setTextValue("");
                  props.clickHandler(e,text_value)
                }}>
                  Enviar
               </Button>
            </div>
        </Row>
        </>
    );

}

export default InputChat;