import React, { Component } from 'react';
import twilio from 'twilio'

// This should not be here
const client = new twilio("AC955db2c2603191785ef8d9aaf9f7a7de","4807667c194232cd707e3fb9ac374b68")

class verify extends Component {
    render() {
        return (
            <div>
                {/* I need to require phone number */}
                {/* button verify my number */}
            </div>
        );
    }
}

export default verify;