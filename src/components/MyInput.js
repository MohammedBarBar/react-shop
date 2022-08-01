import React from 'react'
import "../index.css";

 const MyInput = ({name,placeholder,type,label,error,onChange}) => {
  //  console.log(value);
        return (
            <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 col-form-label labelHead">
              {label}
            </label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                id={name}
                placeholder={placeholder}
                onChange={(evt) => onChange(evt)}
                />
              {error && (
                <div className="alert alert-danger"> Error Email</div>
              )}
              <br></br>
            </div>
          </div>
        )
}
export default MyInput;
