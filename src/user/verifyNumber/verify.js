import React, { Component } from 'react';
import twilio from 'twilio'

// This should not be here
const client = new twilio("null", "null")

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