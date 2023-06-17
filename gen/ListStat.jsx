import React, { Component } from 'react';
import ListHeader from './ListHeader';
import ListLine from './ListLine';

class ListStat extends Component {
    state = { 
        limited: true,
    } 
    test=[{
        nom:"rakoto",
        prenom:"faly"
    },
    {
        nom:"rabe",
        prenom:"nandra"
    }];
    expand=()=>{
        this.setState({limited: false});
    }
    reduce=()=>{
        this.setState({limited: true});
    }
    genButton=()=>{
        if(this.state.limited){
            return <button className='btn btn-secondary' onClick={this.expand}>Expand</button>;
        }
        else{
            return <button className='btn btn-secondary' onClick={this.reduce}>Reduce</button>;
        }
    }
    renderHead=()=>{
        if(this.props.title !==undefined){
            return <div className="mb-2">
            <h1 className="fw-bolder text-center text-uppercase">Liste des categories</h1>
        </div>
        }
        return ;
    }
    checkNumber=()=>{
        let nb=0;
        var limited=this.state.limited;
        if(this.props.tab.length > 0){
            return (
                <div className="col-md-6">
                    {this.renderHead()}
                    <br />
                    <br />
                        
                    <div className="d-flex flex-column flex-shrink-0">
                        <div className="table-responsive">
                            <table  id="table" className="table-sm table">
                                <thead>
                                    <ListHeader obj={this.props.tab[0]}></ListHeader>
                                </thead>
                                <tbody>
                                    {this.props.tab.map(function(el){ 
                                        nb++;
                                        if(limited && nb>1){}else return <ListLine obj={el}/>
                                        
                                    })}
                                    <tr>
                                        <td>
                                            {this.genButton()}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>)
        }
    }
    render() { 
        return (
            this.checkNumber())
        ;
    }
}
 
//  <div className="col-md-6">
    //                      <div className="mb-2">
    //                          <h1 className="fw-bolder text-center text-uppercase">Liste des categories</h1>
    //                      </div>
    //                      <br />
    //                      <br />
                        
    //                      <div className="d-flex flex-column flex-shrink-0">
    //                          <div className="table-responsive">
    //                              <table  id="table" className="table-sm table">
        //         <thead>
        //         <ListHeader obj={this.props.tab[0]}></ListHeader>
        //     </thead>
        //     <tbody>
        //         {this.props.tab.map(function(el){ 
        //             nb++;
        //             if(limited && nb>1){}else return <ListLine obj={el}/>
                    
        //         }
                    
        //             )}
        //         <tr>
        //             <td>
        //                 {this.genButton()}
        //             </td>
        //         </tr>
        //     </tbody>
        // </table>
    //                          </div>
    //                      </div>
    //                  </div>
export default ListStat;