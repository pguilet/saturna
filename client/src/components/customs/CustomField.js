// CustomField contains logic to render a single label and text input.
import React from 'react';

export default ({disabled,valueToSet,input, type,label,meta:{error,touched}})=>{
  
    return(
        
        <div>
            <label>{label}</label>
            <input {...input} type={type} style={{marginBottom:'5px'}} disabled={disabled} value={valueToSet}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    );
}; 