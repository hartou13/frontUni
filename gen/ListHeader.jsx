import React, { Component } from 'react';
class ListHeader extends Component {
    state = {  } 
    renderElement=(objt)=>{
        let keys=Object.keys(objt);
        let res=[];
        keys.map(element=>{
            // console.log(element+"--------");
            if( typeof objt[element] === "string" || typeof  objt[element] === "number"){  
                // console.log("the object is "+objt[element]);  
                if(element !=="mdp" && element !=="id")         
                res.push(<th>{element}</th>)
            }
            
        })
        // console.log(res);
        return res;
    }
    render() {
        var temp=this.props.obj; 
        var key=Object.keys(temp);
        console.log(key);
        return (
            <tr>
                {this.renderElement(temp)}
                
            </tr>)
        ;
    }
}
 
export default ListHeader;