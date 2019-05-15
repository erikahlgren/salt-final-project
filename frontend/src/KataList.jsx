import React from 'react';
import './KataList.css';


function KataList(props) {
  return (
    <div className="kata-container" onClick={props.handler}>  
      <p><i className="fab fa-js"></i>{props.kata}</p>
    </div>
  );
}

export default KataList;