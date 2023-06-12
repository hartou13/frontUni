import React, { Component } from 'react';
class UniFicheLine extends Component {
    state = {  } 
    getVal=()=>{
        if( this.props.field.possibleValue!=null){
            for (let index = 0; index < this.props.field.possibleValue.length; index++) {
                const element = this.props.field.possibleValue[index];
                if(element.id===this.props.formState[this.props.field.fieldName])
                    return <React.Fragment>{element[this.props.field.mainField]}</React.Fragment>;
                
            }
        }
        if(this.props.field.inputType === "image")
            return <img src={"data:image/jpeg;base64,"+this.props.formState[this.props.field.fieldName]} alt="" />
        else
            return <div>{this.props.formState[this.props.field.fieldName]}</div> 
    }
    render() { 
        return (
            <React.Fragment>
                <tr>
                    <td>
                        {this.props.field.fieldLabel}
                    </td>
                    <td>
                        {this.getVal()}
                    </td>
                </tr>

            </React.Fragment>
        );
    }
}
 
export default UniFicheLine;