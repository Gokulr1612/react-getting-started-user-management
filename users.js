import React from 'react';

export default class UsersComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'', username:'', index: '',
            users: [
               { name: 'Tania', username: 'floppydiskette', manage: '' },
               { name: 'Craig', username: 'silicone', manage: '' },
               { name: 'Ben', username: 'benisphere', manage: '' }
            ]
         }
    }
    submitData(event){
        event.preventDefault();
        let users = this.state.users;
        users.push({
            name: this.state.name,
            username: this.state.username
        });
        this.setState({
            users,
            name: '',
            username: ''
        });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    editUser(args, index){
        document.getElementsByClassName('g-adduser')[0].style.display = 'none';
        document.getElementsByClassName('g-edituser')[0].style.display = '';
        this.setState({name: args.name,
            username: args.username, index: index});
     }

    deleteUser(args) {
        let users = this.state.users;
        for(let i = 0; i < users.length; i++){
            if(args.name === users[i].name){
                users.splice(i,1);
                this.setState({users,
                name: '',
                username: ''});
            }
        }
    }

    updateData(event){
        event.preventDefault();
        let users = this.state.users;
        let key = this.state.index;
        
        users[key].name = this.state.name;
        users[key].username = this.state.username;
        this.setState({
            name: '', username: '', users
        });
        document.getElementsByClassName('g-adduser')[0].style.display = '';
        document.getElementsByClassName('g-edituser')[0].style.display = 'none';
    }

    resetForm(event){
        this.setState({
            name: '',
            username: ''
        });
        document.getElementsByClassName('g-adduser')[0].style.display = '';
        document.getElementsByClassName('g-edituser')[0].style.display = 'none';
    }

    render(){
        return(
            <div>
            <div style={{display: '-webkit-box'}}>
            <AddUser submitData={this.submitData.bind(this)} handleChange={this.handleChange.bind(this)} name={this.state.name} username={this.state.username}/>
            <EditUser name={this.state.name} username={this.state.username} submitData={this.updateData.bind(this)} handleChange={this.handleChange.bind(this)} resetForm={this.resetForm.bind(this)}/>
            <UserList users={this.state.users} editUser={this.editUser.bind(this)} deleteUser={this.deleteUser.bind(this)}/>  
            </div>
            </div> 
        );
    }

}

class AddUser extends React.Component{
    
    render(){
        return(
            <div className='g-adduser'>
                <h2> Add User </h2>
                <form id='addform' onSubmit={this.props.submitData}>
                    <label htmlFor="name">Name:</label> <br />
                    <input type="text" id="name" name="name" autoComplete='off' value={this.props.name} onChange={this.props.handleChange} required /> <br />
                    <label htmlFor="username">User Name:</label> <br />
                    <input type="text" id="username" name="username" autoComplete='off' value={this.props.username} onChange={this.props.handleChange} required/> <br />
                    <button type="submit" >Add New User</button>
                </form>
            </div>
        )
    }
}

class EditUser extends React.Component{
    render(){
        return(
            <div className='g-edituser' style={{display: 'none'}}>
                <h2> Edit User </h2>
                <form id='editform' onSubmit={this.props.submitData} ref={(ef) => this.editFormRef = ef}>
                    <label htmlFor="name">Name:</label> <br />
                    <input type="text" id="name" name="name" autoComplete='off' required value={this.props.name} onChange={this.props.handleChange} /> <br />
                    <label htmlFor="username">User Name:</label> <br />
                    <input type="text" id="username" name="username" autoComplete='off' required value={this.props.username} onChange={this.props.handleChange} /> <br />
                    <button type="submit" >Update</button>
                    <button type="reset" onClick={this.props.resetForm}> Cancel</button>
                </form>
            </div>
        )
    }
}

class UserList extends React.Component{
    
    render(){
        return(
            <div className='g-userlist'>
                <h2> View Users </h2>
                <table role='table' id='userinfo' className='g-usertable'>
                <thead>
                    <tr role='row'>
                    {this.renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderBody()}
                </tbody>
            </table> 
            </div>
            
        )
    }
    renderHeader(){
        let header = Object.keys(this.props.users[0]);
        return header.map((key, index) => {
         return <th role='columnheader' key={index} className={key}>{key.toUpperCase()}</th>
      });
    }

    renderBody() {
        return this.props.users.map((user, index) => {
           const { name, username } = user //destructuring
           return (
              <tr role='row' key={index}>
                 <td role='cell' className='g-cell' width='100px' align='center'>{name}</td>
                 <td role='cell' className='g-cell' width='140px' align='center'>{username}</td>
                 <td role='cell'>
                 <button className='g-btn g-edit' onClick={() => this.props.editUser(user, index)}>Edit</button>
                 <button className='g-btn g-delete' onClick={() => this.props.deleteUser(user)}>Delete</button></td>
              </tr>
           )
        })
     }
}