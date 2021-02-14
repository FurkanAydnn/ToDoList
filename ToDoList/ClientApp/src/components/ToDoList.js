import React, { Component } from 'react';
import ToDoListItem from './ToDoListItem';
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ToDoList extends Component {
    static displayName = ToDoList.name;
    constructor(props) {
        super(props);
        this.state = {
            toDoListItems: [],
            toDoWillEdit: { Title: '', ExecuteDate: moment().format('YYYY-MM-DDTHH:mm:ss'), IsAlertDisplayed: false },
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            isNew: true,
            deletedId: 0
        }
    }

    componentDidMount() {
        this.getTodoList();
        this.checkExecuteTimesForAlert();
    }

    getTodoList = () => {
        axios.get(`todolist/getlist`)
            .then(res => {
                this.setState({ toDoListItems: res.data })
            })
    }

    createToDoListItem = (toDoListItem) => {
        // console.log(toDoListItem)
        axios.post('todolist/create', toDoListItem)
            .then(res => {
                if (res.status === 200)
                    this.getTodoList()
            })
    }

    updateToDoListItem = (toDoListItem) => {
        axios.put('todolist/update', toDoListItem)
            .then(res => {
                if (res.status === 200)
                    this.getTodoList()
            })
    }

    deleteToDoListItem = (id) => {
        axios.delete(`todolist/delete/${id}`)
            .then(res => {
                if (res.status === 200)
                    this.getTodoList();
            })
    }

    checkExecuteTimesForAlert = () => {
        const interval = setInterval(() => {
            this.state.toDoListItems.map(todo => {
                if (this.state.toDoListItems.length > 0) {
                    console.log(todo.IsAlertDisplayed);
                    console.log(moment().diff(moment(todo.ExecuteDate).toDate(), 'minutes'));
                    if (!todo.IsAlertDisplayed && moment().diff(moment(todo.ExecuteDate).toDate(), 'minutes') >= 0) {
                        todo.IsAlertDisplayed = true;
                        this.updateToDoListItem(todo);
                        toast(`Don't miss!! ${todo.Title}`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            })
        }, 60000);
    }


    toggleEditModal = () => { this.setState(prevState => { return { isEditModalOpen: !prevState.isEditModalOpen } }) }
    toggleDeleteModal = () => { this.setState(prevState => { return { isDeleteModalOpen: !prevState.isDeleteModalOpen } }) }

    render() {
        return (
            <React.Fragment>
                <Card className="todo-list-card mr-auto ml-auto mt-3" >
                    <CardBody>
                        <div className="d-flex justify-content-between main-title">
                            <CardTitle tag="h5">To Do</CardTitle>
                            <Button outline className="add-todo-button" size="sm" onClick={() => this.setState({ isNew: true, toDoWillEdit: { Title: '', ExecuteDate: moment() } }, () => this.toggleEditModal())}><FontAwesomeIcon icon={faPlus} color="light" /></Button>
                        </div>
                        {this.state.toDoListItems.length > 0 ? this.state.toDoListItems.map((toDo, i) => { return <ToDoListItem key={i} toDoListItem={toDo} onEdit={(toDoWillEdit) => { this.toggleEditModal(); this.setState({ toDoWillEdit: toDoWillEdit, isNew: false }) }} onChecked={(todo) => this.updateToDoListItem(todo)} onDelete={(id) => this.setState({ deletedId: id }, () => this.toggleDeleteModal())} /> }) : 'Please add new To-Do'}
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal} className="form-modal">
                    <ModalHeader toggle={this.toggleEditModal}>{this.state.isNew ? 'Create New To-Do' : 'Edit To-Do'}</ModalHeader>
                    <ModalBody>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Label for="Title">Title</Label>
                                <Input type="text" name="Title" id="Title" className="mr-2" value={this.state.toDoWillEdit.Title} onChange={(e) => {
                                    var toDoWillEdit = { ...this.state.toDoWillEdit }
                                    toDoWillEdit.Title = e.target.value;
                                    this.setState({ toDoWillEdit });
                                }} />
                            </div>
                            <div className="form-execute-date-area">
                                <Label for="ExecuteDate">Execute Date</Label>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker name="ExecuteDate" id="ExecuteDate" value={this.state.toDoWillEdit.ExecuteDate} onChange={e => {
                                        var toDoWillEdit = { ...this.state.toDoWillEdit }
                                        toDoWillEdit.ExecuteDate = e.format('YYYY-MM-DDTHH:mm:ss');
                                        this.setState({ toDoWillEdit });
                                    }} />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
                        <Button color="secondary" onClick={() => { this.state.isNew ? this.createToDoListItem(this.state.toDoWillEdit) : this.updateToDoListItem(this.state.toDoWillEdit); this.toggleEditModal() }}>Save</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal} className="form-modal">
                    <ModalHeader toggle={this.toggleDeleteModal}>Delete</ModalHeader>
                    <ModalBody>
                        Selected To-Do will be deleted. Are you sure?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                        <Button color="danger" onClick={() => { this.deleteToDoListItem(this.state.deletedId); this.toggleDeleteModal() }}>Delete</Button>
                    </ModalFooter>
                </Modal>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </React.Fragment>
        )
    }
}
