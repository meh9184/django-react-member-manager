import React, { Component } from 'react';
import MembersService from './MembersService';


const membersService = new MembersService();


class MemberCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {match: { params }} = this.props;
        if(params && params.pk){
            membersService.getMember(params.pk)
            .then(member=>{
                this.refs.name.value = member.name;
                this.refs.account.value = member.account;
                this.refs.password.value = member.password;
                this.refs.permission.value = member.permission;
            })
        }
    }

    handleCreate() {
        membersService.createMember({
            "name": this.refs.name.value,
            "account": this.refs.account.value,
            "password": this.refs.password.value,
            "permission": this.refs.permission.value
        }).then(response => {
            alert("Member has been created.")
        }).catch(error=> {
            alert(`There was an error with the form ${error}`)
        });
    }

    handleUpdate(pk) {
        membersService.updateMember({
            "pk": pk,
            "name": this.refs.name.value,
            "account": this.refs.account.value,
            "password": this.refs.password.value,
            "permission": this.refs.permission.value
        }).then( response => {
            console.log(response);
            alert(`Member ${this.refs.firstName.value} has been updated.`);
        }).catch( error => {
            alert(`There was an error, please check your form.`);
        });
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
        if(params  &&  params.pk){
            console.log('Executing handleUpdate...');
            this.handleUpdate(params.pk);
        }else{
            console.log('Executing handleCreate...');
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>
                          Name</label>
                        <input className="form-control" type="text" ref='name' />
            
                        <label>
                          Account</label>
                        <input className="form-control" type="text" ref='account' />
            
                        <label>
                          Password</label>
                        <input className="form-control" type="text" ref='password' />
            
                        <label>
                          Permission</label>
                        <input className="form-control" type="text" ref='permission' />
                        <br/>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </form>
            </React.Fragment>
        );
  }
}

export default MemberCreateUpdate;