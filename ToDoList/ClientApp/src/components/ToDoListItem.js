import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class ToDoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true
        }
    }

    render() {
        return (
            <div className="d-flex align-items-center">
                <div className="check-area">
                    {this.state.isChecked && <FontAwesomeIcon icon={faCheck} />}
                </div>
            </div>
        )
    }
}
