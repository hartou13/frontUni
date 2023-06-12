import React, { Component } from 'react';
import UniFicheLine from './UniFicheLine';
class UniFiche extends Component {
    state = {  } 
    constructor(props) {
        super(props);
        this.state = { fields: props.fields };
    }

    render() { 
        return (
            <React.Fragment>
                <table>
                    {this.state.fields.map(field =><UniFicheLine field={field} formState={this.props.formState}></UniFicheLine>)}
                </table>
            </React.Fragment>
        );
    }
}
 
export default UniFiche;