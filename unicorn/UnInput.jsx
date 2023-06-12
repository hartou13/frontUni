import React, { Component } from 'react';
// import Editor from './Editor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
class UnInput extends Component {
    state = { 
        field: {
            fieldType: "integer",
            inputType: "integer",
            readable: false,
            writable: false,
            fieldName: "id",
            fieldLabel: "id",
            // possibleValue: null,
            mainField: null,
            possibleValue:[]
        },
        oc:null
    } 
    constructor(props) {
        super(props);
        this.state = { field: props.field, oc : props.oc};
    }
    onlyNumber=(event) => {
        // console.log(event);
        if (!/[\d.]/.test(event.key)) {
            event.preventDefault();
          }
    }
    integer=()=>{
        return <div class="mb-3 col-5">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="number"
            class="form-control" 
            name={this.state.field.fieldName} 
            placeholder={this.state.field.fieldLabel} 
            onKeyPress={this.onlyNumber}
            value={this.props.formState[this.state.field.fieldName]}  
            onChange={this.props.oc}
            min={0} />
          </div>
    }
    double=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="number"
            class="form-control" 
            name={this.state.field.fieldName} 
            id="" aria-describedby="helpId" 
            placeholder={this.state.field.fieldLabel} 
            step={0.001} 
            onKeyPress={this.onlyNumber}
            value={this.props.formState[this.state.field.fieldName]}  
            onChange={this.props.oc} min={0}/>
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
            value={this.props.formState[this.state.field.fieldName]} 
            onChange={this.props.oc} />
          </div>
    }
    onImgChange= (event)=>{
        
        let file=event.target.files[0];
        const reader = new FileReader();
        reader.oc=this.state.oc
        reader.onload = function() {
            const base64String = reader.result;
            console.log(base64String);
            let res={
                target:{
                    name: nom,
                    value: base64String
                }
            }
            console.log(res);
            this.oc (res);

        };
        var nom=this.state.field.fieldName;
        
        let res= reader.readAsDataURL(file);
        console.log(res);
        // this.props.oc(res);
        
    }
    img=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="file"
            class="form-control" 
            name={this.state.field.fieldName} 
            id={"sary"+this.state.field.fieldName}
            aria-describedby="helpId" 
            placeholder={this.state.field.fieldLabel}
             />
          </div>
    }
    onCKChange=(event, editor) =>{
        editor.getData()
        let res={
            target:{
                name:this.state.field.fieldName,
                value: editor.getData()
            }
        }
        this.props.oc(res);
    }

    ck=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <CKEditor editor={ClassicEditor} 
          data={this.props.formState[this.state.field.fieldName]} 
          onChange={this.onCKChange} ></CKEditor>
        </div>
    }
    date=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="date"
            class="form-control" 
            name={this.state.field.fieldName} 
            id="" aria-describedby="helpId" 
            placeholder={this.state.field.fieldLabel}
            value={this.props.formState[this.state.field.fieldName]} 
            onChange={this.props.oc} />
          </div>
    }
    datetime=()=>{
        return <div class="mb-3">
          <label for="" class="form-label">{this.state.field.fieldLabel}</label>
          <input type="datetime-local"
            class="form-control" 
            name={this.state.field.fieldName} 
            id="" aria-describedby="helpId" 
            placeholder={this.state.field.fieldLabel}
            value={this.props.formState[this.state.field.fieldName]} 
            onChange={this.props.oc} />
          </div>
    }
    checkRequired=(el)=>{
        return (el.id===this.props.formState[this.state.field.fieldName])
    }
    select=()=>{
        return <div class="mb-3">
            <label for="" class="form-label">{this.state.field.fieldLabel}</label>
            <select class="form-select" name={this.state.field.fieldName} id="" 
            onChange={this.props.oc}>
                 <option >---</option>
                {this.state.field.possibleValue.map(el=>
                    <option value={el.id} selected={this.checkRequired(el)}>{el[this.state.field.mainField]}</option>
                    )}
            </select>
        </div>;
    }
    rsa=()=>{
        return <div className="mb-3">
        <label for="" class="form-label">{this.state.field.fieldLabel}</label>
        <ReactSearchAutocomplete></ReactSearchAutocomplete>
        </div>
    }
    checkInput=()=>{
        if(this.state.field.writable)
            if(this.state.field.possibleValue!==null && this.state.field.possibleValue.length>0)
                return this.select();
            else if(this.state.field.fieldType==="integer")
                return this.integer();
            else if(this.state.field.fieldType==="float")
                return this.double();
            else if(this.state.field.fieldType==="date")
                return this.date();
            else if(this.state.field.fieldType==="datetime")
                return this.datetime(); 
            else if(this.state.field.inputType==="ck")
                return this.ck();
            else if(this.state.field.inputType==="image")
                return this.img();
            else
                return this.text();
    }
    render() { 
        return (
            // this.integer()
            <React.Fragment>{this.checkInput()}</React.Fragment>
        );
    }
}
 
export default UnInput;