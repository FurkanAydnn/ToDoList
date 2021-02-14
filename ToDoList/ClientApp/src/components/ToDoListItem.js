import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen, faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment';

export default class ToDoListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoListItem: {}
        }
    }

    componentDidMount() {
    }

    changeCheckedStatus = () => {
        var toDoListItem = { ...this.props.toDoListItem }
        toDoListItem.IsChecked = !toDoListItem.IsChecked;
        this.props.onChecked(toDoListItem);
    }

    render() {
        const { toDoListItem } = this.props;
        return (
            <>
                <Card className="todo-list-item-card ml-auto mr-auto mb-2" >
                    <CardBody>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-center flex-grow-1 todo-item-area" onClick={() => this.changeCheckedStatus()}>
                                <div className="check-area mr-2" >
                                    {toDoListItem.IsChecked ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCircle} />}
                                </div>
                                <div className="title-area flex-grow-1">
                                    {toDoListItem.Title}
                                </div>
                                <div className="date-area mr-2">
                                    {moment(toDoListItem.ExecuteDate).format('llll')}
                                </div>
                            </div>
                            <div className="edit-area mr-2" onClick={() => this.props.onEdit(toDoListItem)}>
                                <FontAwesomeIcon icon={faPen} />
                            </div>
                            <div className="remove-area" onClick={() => this.props.onDelete(toDoListItem.Id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

            </>
        )
    }
}
