import React from 'react';
import logo from './logo.svg';
import './App.css';





class App extends React.Component { 
  state = {
    name:'',
    phone:'',

    contact: [
      {
        id:1,
        name:'david',
        phone:'010-1234-5678'
      },
      {
        id:2,
        name:'kelly',
        phone:'010-5030-7951'
      },
      {
        id:3,
        name:'frank',
        phone:'010-5030-7951'
      },
      {
        id:4,
        name:'hou',
        phone:'010-5030-7951'
      }
    ]
  }
  /** 
   * 삭제함수
   */
  _handleRemoveContact = id => {
    const newContact = this.state.contact.filter(c => c.id !== id)
    console.log(newContact);
    this.setState({contact: newContact});
  }
  /**
   * 등록함수
   */
  _handleChange = () => {
    console.log("name:",this.state.name);
    console.log("phone:",this.state.phone);    
    // const newContact = this.state.contact.slice(0);
    // newContact.push()
    const lastId = this.state.contact[this.state.contact.length - 1].id + 1;
    this.setState({
      contact:[
        ...this.state.contact,
        {
          id: lastId,
          name: this.state.name,
          phone: this.state.phone
        }
      ]
    })
  }
  /**
   * state 변경
   */
  _handleChangeState = (target,value) => {
    this.setState({[target] : value})
  }
  // _handleChangeState = event => {
  //   console.log("E :", event);
  //   this.setState({[event.target.name] : event.target.value})

  // }
  /** 
   * 뷰
   */
  render(){
    const {contact, name, phone} = this.state;
    return (
      <div className="App">
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>name</th>
                <th>phone</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input value = {name} onChange={(event) => this._handleChangeState('name',event.target.value)} placeholder="name"/></td>
                <td><input value = {phone} onChange={(event) => this._handleChangeState('phone',event.target.value)} placeholder="phone"/></td>
                <td>
                  <button onClick={()=> this._handleChange()}>new</button>
                </td>
              </tr>
              {
                contact.map(Item => (
                <tr>
                <td>{Item.name}</td>
                <td>{Item.phone}</td>
                <td>
                  <button onClick ={()=> this._handleRemoveContact(Item.id) }>Delete</button>
                </td>
                </tr>

                ))}                            
            </tbody>
          </table>
        </div>    
      </div>
    );
  }
}

export default App;
