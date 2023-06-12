import React, { Component } from 'react';
import UnInput from './UnInput';
class UniForm extends Component {
    state = { 
        fields:[
            {
                fieldType: "integer",
                inputType: "integer",
                readable: false,
                writable: false,
                fieldName: "id",
                fieldLabel: "id",
                possibleValue: null,
                mainField: null,
                // possibleValue:[]
            },
        ]
    } 
    constructor(props) {
        super(props);
        this.state = { fields: props.fields };
    }
    render() { 
        // console.log(this.props.fields);
        return (
            <div >
                <form id="uniform">
                    {this.state.fields.map(field =><UnInput field={field} formState={this.props.formState} oc={this.props.oc}></UnInput>)}
                    
                </form>
            </div>
        );
    }
}
 
export default UniForm;