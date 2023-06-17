import React, { Component } from 'react';
class ListLine extends Component {
    renderElement=(objt)=>{
        let keys=Object.keys(objt);
        let res=[];
        keys.map(element=>{
            // console.log(element+"--------");
            if( typeof objt[element] === "string" || typeof  objt[element] === "number"){ 
                if(element !=="mdp" && element !=="id")
                res.push(<td>{objt[element]}</td>)
            }
            
        })
        // console.log(res);
        return res;
    }
    state = {  } 
    render() { 
        var obj=this.props.obj;
        // var key=Object.keys(obj);
        return (
            <tr>
                {this.renderElement(obj)}
                
            </tr>)
        ;
    }
}
 
export default ListLine;