import React, { Component } from 'react';
import ToDoListItem from './ToDoListItem';

export default class ToDoList extends Component {
    static displayName = ToDoList.name;

    render() {
        return (
            <React.Fragment>
                <ToDoListItem />
            </React.Fragment>
        )
    }
}
