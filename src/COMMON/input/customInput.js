import React from "react";
import PropTypes from 'prop-types';
export default class CustomInput extends React.Component{
   constructor(props){
      super(props);
   }
   getLabelAddon(){
      if(this.props.label.length > 0){
         return(
               <div className = "input-group-addon">
                  {this.props.label}
               </div>
         );
      }else{
         return (
               <div></div>
         );
      }
   }
   render(){
      var labelAddon = this.getLabelAddon();
         return (
                 <div className="input-group">
                    {labelAddon}
                     <input 
                        type = {this.props.type} 
                        value = {this.props.value} 
                        placeholder = {this.props.placeholder}
                        className = "form-control"
                        style = {this.props.style}
                        onChange = {this.props.onChange.bind(this)}/>
                 </div>
         );
    }
}
CustomInput.propTypes = {
   type: PropTypes.string,
   value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
   placeholder: PropTypes.string,
   style: PropTypes.object,
   onChange: PropTypes.func.isRequired,
   label: PropTypes.string
}
CustomInput.defaultProps = {
   type: "text",
   label:""
}