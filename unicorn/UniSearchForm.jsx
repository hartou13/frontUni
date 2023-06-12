import React, { Component } from 'react';
import UniSearchInput from './UniSearchInput';
class UniSearchForm extends Component {
    state = { 
        search: false,
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
        console.log("const");
        super(props);
        console.log(props);
        this.setState({ fields: props.fields , search: props.show });
    }
    render() { 
        return (
            <div>
                <form id="searchform">
                {this.state.fields.map(field =><UniSearchInput field={field} ></UniSearchInput>)} 
                </form>
            </div>
        );
    }
}
 
export default UniSearchForm;