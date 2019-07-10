import React, { Component } from 'react';
import MembersService from './MembersService';

const membersService = new MembersService();


export default class MembersList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            members : [],
            nextPageURL : '',
            previousPageURL: ''
        }

        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // Sets the initial state by calling getMembers() method 
    componentDidMount() {
        var self = this;
        membersService.getMembers().then(response => {
            
            self.setState({
                            members: response.data, 
                            previousPageURL:response.prevlink, 
                            nextPageURL: response.nextlink})
        });
    }

    // Can be called to delete a member and adjust the state accordingly
    handleDelete(e, pk) {
        var self = this;
        membersService.deleteMember({pk : pk}).then(()=>{
            var newArray = self.state.members.filter(function(obj) {
                return obj.pk !== pk;
            });
            self.setState({members: newArray})
        });
    }


    // Sets the state for the next page member data, as well as the next Page url
    nextPage() {
        var self = this;

        membersService.getMembersByURL(this.state.nextPageURL).then(response => {
            self.setState({members: response.data, 
                           nextPageURL: response.nextlink,
                           previousPageURL: response.prevlink})
        });    
    }


    previousPage() {
        var self = this;
        
        membersService.getMembersByURL(this.state.previousPageURL).then(response => {
            self.setState({members: response.data, 
                           nextPageURL: response.nextlink,
                           previousPageURL: response.prevlink})

        console.log(this.state);
        });
    }


    render() {

        return (
            <React.Fragment>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Accout</th>
                            <th>Password</th>
                            <th>Permission</th>
                            <th>Join Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.members.map(member=>{
                                
                                let permissionStr = ''
                                if(member.permission === 1) permissionStr = 'master'
                                else if(member.permission === 2) permissionStr = 'diamond'
                                else if(member.permission === 3) permissionStr = 'platinum'
                                else if(member.permission === 4) permissionStr = 'gold'
                                else if(member.permission === 5) permissionStr = 'silver'
                                else if(member.permission === 6) permissionStr = 'bronze'

                                return <tr key={member.pk}>
                                    <td>{member.pk}  </td>
                                    <td>{member.name}</td>
                                    <td>{member.account}</td>
                                    <td>{member.password}</td>
                                    <td>{permissionStr}</td>
                                    <td>{member.createdAt.substring(0, 10)}</td>
                                    <td>
                                        <p className="buttons">
                                            <button onClick={(e)=> this.handleDelete(e, member.pk)} className="button is-small is-danger">Delete</button>
                                            <a href={`/member/${member.pk}`} className="button is-small is-link">Update</a>
                                        </p>
                                    </td>
                                </tr>
                        })}
                    </tbody>

                    </table>
                    <p className="buttons">
                        <button className="button is-primary is-outlined" onClick={this.previousPage}>Previous</button>
                        <button className="button is-primary is-outlined" onClick={this.nextPage}>Next</button>
                    </p>  
            </React.Fragment>
        )
    }
}
