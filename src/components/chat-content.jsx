import React from "react";

import {Row} from 'react-bootstrap';

function ChatComponent(props){

    return(
      <>
      <Row>
      <div>
        {props.msg_list}
      </div>
      </Row>

    
    </>
  );
}


export default ChatComponent;