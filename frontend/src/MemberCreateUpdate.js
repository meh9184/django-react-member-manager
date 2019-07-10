import React, { Component } from 'react';
import Select from 'react-select';
import MembersService from './MembersService';


const membersService = new MembersService();

const options = [
    { value: 1, label: 'master' },
    { value: 2, label: 'diamond' },
    { value: 3, label: 'platinum' },
    { value: 4, label: 'gold' },
    { value: 5, label: 'silver' },
    { value: 6, label: 'bronze' }
  ];

class MemberCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        selectedOption: null,
        defaultValue: null
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    componentDidMount() {
        const {match: { params }} = this.props;
        if(params && params.pk){
            membersService.getMember(params.pk)
            .then(member=>{
                this.refs.name.value = member.name;
                this.refs.account.value = member.account;
                this.refs.password.value = member.password;
                
                if(member.permission === 1)
                    this.handleChange({value: member.permission, label: "master"});
                if(member.permission === 2)
                    this.handleChange({value: member.permission, label: "diamond"});
                if(member.permission === 3)
                    this.handleChange({value: member.permission, label: "platinum"});
                if(member.permission === 4)
                    this.handleChange({value: member.permission, label: "gold"});
                if(member.permission === 5)
                    this.handleChange({value: member.permission, label: "silver"});
                if(member.permission === 6)
                    this.handleChange({value: member.permission, label: "bronze"});
                
            })
        }
    }

    handleCreate() {

        if(this.state.selectedOption.value === 1){
            membersService.getMembers().then(response => {
                console.log(response.data);
                const members = response.data;
                for(let i=0; i < response.data.length; i++){
                    if(members[i].permission === 1){
                        throw "Aleady exist master Error"
                    }
                }
                return
            }).then( _ => {
                membersService.createMember({
                    "name": this.refs.name.value,
                    "account": this.refs.account.value,
                    "password": this.refs.password.value,
                    "permission": this.state.selectedOption.value
                }).then(response => {
                    alert("Member has been created.")
                    this.props.history.push("/")
                }).catch(error=> {
                    alert(`There was an error with the form ${error}`)
                });
            }).catch(error => {
                alert("Aleady exist 'master' permission member")
            })
        }else{
            membersService.createMember({
                "name": this.refs.name.value,
                "account": this.refs.account.value,
                "password": this.refs.password.value,
                "permission": this.state.selectedOption.value
            }).then(response => {
                alert("Member has been created.")
                this.props.history.push("/")
            }).catch(error=> {
                alert(`There was an error with the form ${error}`)
            });
        }
    }

    handleUpdate(pk) {
        membersService.updateMember({
            "pk": pk,
            "name": this.refs.name.value,
            "account": this.refs.account.value,
            "password": this.refs.password.value,
            "permission": this.state.selectedOption.value
        }).then( response => {
            console.log(response);
            alert(`Member ${this.refs.name.value} has been updated.`);
            this.props.history.push("/")
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
        const { selectedOption } = this.state;
        
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label> Name </label>
                        <input className="form-control" type="text" ref='name' />
            
                        <label> Account </label>
                        <input className="form-control" type="text" ref='account' />
            
                        <label> Password </label>
                        <input className="form-control" type="text" ref='password' />
            
                        <label> Permission </label>
                        <Select
                            name='permission'
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                        <br/>
                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </form>
            </React.Fragment>
        );
  }
}

export default MemberCreateUpdate;