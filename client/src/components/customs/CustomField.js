// CustomField contains logic to render a single label and text input.
import React from 'react';

export default ({disabled,valuetoset,input, type,label,meta:{error,touched}})=>{
  
    return(
        
        <div>
            
            <input id={label} {...input} type={type} style={{marginBottom:'5px'}} disabled={disabled} value={valuetoset}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    );
}; 
