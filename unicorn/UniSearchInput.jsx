import React, { Component } from 'react';
class UniSearchInput extends Component {
    state = { 
        field: {
            fieldType: "number",
            inputType: "integer",
            readable: true,
            writable: false,
            fieldName: "id",
            fieldLabel: "id",
            // possibleValue: null,
            mainField: "nomModele",
            possibleValue: []
        }
     } 
    constructor(props) {
        super(props);
        this.state = { field: props.field};
    }
    onlyNumber=(event) => {
        // console.log(event);
        if (!/[\d.]/.test(event.key)) {
            event.preventDefault();
          }
    }
    
    numberInterval=()=>{
        return <div>
            <div class="mb-3">
              <label for="" class="form-label">{this.props.field.fieldLabel}</label>
              <input type="number"
                class="form-control"
                name={"min"+this.props.field.fieldName} 
                placeholder="minimum value"
                onKeyPress={this.onlyNumber}
                step={0.001} />
              <input type="number"
                class="form-control"
                name={"max"+this.props.field.fieldName} 
                placeholder="maximum value"
                onKeyPress={this.onlyNumber}
                step={0.001} />
            </div>
        </div>
    }
    dateInterval=()=>{
        return <div>
            <div class="mb-3">
            <label for="" class="form-label">{this.props.field.fieldLabel}</label>
              <input type="datetime-local"
                class="form-control"
                name={"min"+this.props.field.fieldName} 
                placeholder="minimum value"
                onKeyPress={this.onlyNumber}
                step={0.001} />
              <input type="datetime-local"
                class="form-control"
                name={"max"+this.props.field.fieldName} 
                placeholder="maximum value"
                onKeyPress={this.onlyNumber}
                step={0.001} />
            </div>
        </div>
    }
    select=()=>{
        return <div class="mb-3">
            <label for="" class="form-label">{this.props.field.fieldLabel}</label><br />
            {this.state.field.possibleValue.map(el=>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="" name={this.props.field.fieldName} value={el.id}/>
              <label class="form-check-label" for="">{el[this.state.field.mainField]}</label>
            </div>
                )}
            
        </div>
    }
    text=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="text"
            class="form-control" 
            name={this.state.field.fieldName} 
            id=""
            aria-describedby="helpId" 
            placeholder={this.state.field.fieldLabel}
             />
          </div>
    }
    checkInput=()=>{
        if(this.state.field.readable)
            if(this.state.field.possibleValue!==null && this.state.field.possibleValue.length>0)
                return this.select();
            else if(this.state.field.fieldType==="integer")
                return this.numberInterval();
            else if(this.state.field.fieldType==="float")
                return this.numberInterval();
            else if(this.state.field.fieldType==="date")
                return this.dateInterval();
            else if(this.state.field.fieldType==="datetime")
                return this.dateInterval();
            else if(this.state.field.inputType==="image")
                return <div></div>
            else
                return this.text();
    }
    render() { 
        return (
            <React.Fragment>
                <div>
                    {this.checkInput()}
                   
                </div>
            </React.Fragment>
        );
    }
}
 
export default UniSearchInput;