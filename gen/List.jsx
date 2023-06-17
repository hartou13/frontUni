import React, { Component } from 'react';
import ListHeader from './ListHeader';
import ListLine from './ListLine';
class List extends Component {
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
    renderHead=()=>{
        if(this.props.title !==undefined){
            return <div className="mb-2">
            <h1 className="fw-bolder text-center text-uppercase">Liste des categories</h1>
        </div>
        }
        return ;
    }
    checkNumber=()=>{
        console.log(this.props.tab.length +" ny habeny");
        if(this.props.tab.length > 0){
            return (
                <div className="col-md-6">
                    {this.renderHead()}
                    <br />
                    <br />                
                    <div className="d-flex flex-column flex-shrink-0">
                        <div className="table-responsive">
                            <table id="table" className="table-sm table">
                                <thead>
                                    <ListHeader obj={this.props.tab[0]}></ListHeader>
                                </thead>
                                <tbody>
                                    {this.props.tab.map(el=>
                                        <ListLine obj={el}/>
                                    )}
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
    //  <div className="col-md-6">
    //                      <div className="mb-2">
    //                          <h1 className="fw-bolder text-center text-uppercase">Liste des categories</h1>
    //                      </div>
    //                      <br />
    //                      <br />
                        
    //                      <div className="d-flex flex-column flex-shrink-0">
    //                          <div className="table-responsive">
    //                              <table>
    //                  <thead>
    //                  <ListHeader obj={this.props.tab[0]}></ListHeader>
    //              </thead>
    //              <tbody>
    //                  {this.props.tab.map(el=>
    //                      <ListLine obj={el}/>
    //                      )}
    //              </tbody>
    //          </table>
    //                          </div>
    //                      </div>
    //                  </div>
    
}
 
export default List;