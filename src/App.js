import React from 'react';
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
    const length = this.state.contact.length;
    const lastId =  length > 0 ? this.state.contact[this.state.contact.length - 1].id +1 : 1;
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
  /**
   * 수정모드
   */
  _handleToggleEditMode = (id) =>{
    this.setState(prevState => ({isEditMode: prevState.isEditMode === id ? -1 : id}))      
  }

  
  /**
   * 수정값반영
   */
  _handleChangeContact = (index, event) => {
    const newContact = this.state.contact.slice(0);
    newContact[index][event.target.name] = event.target.value;
    this.setState({contact : newContact});
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
    let data = contact
    let isEditMode = this.state.isEditMode
    if(name){
      data = contact.filter(c=> c.name.indexOf(name) > -1)
    }
    return (
      <div className="App">
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>name</th>
                <th>phone</th>
                <th>-</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input value = {name} onChange={(event) => this._handleChangeState('name',event.target.value)} placeholder="name"/></td>
                <td><input value = {phone} onChange={(event) => this._handleChangeState('phone',event.target.value)} placeholder="phone"/></td>
                <td colSpan="2">
                  <button onClick={()=> this._handleChange()}>new</button>
                </td>
              </tr>
                            
              {
                data.map((Item, index) => (
                <tr key ={index.toString()}>
                  {(isEditMode > -1 && isEditMode === Item.id) ? (
                    <>
                    <td><input name="name" value={Item.name} onChange={(event) => this._handleChangeContact(index,event)}/></td>
                    <td><input name ="phone" value={Item.phone} onChange={(event) => this._handleChangeContact(index,event)} /></td>         
                    </>
                   ) : (
                    <>
                    <td>{Item.name}</td>
                    <td>{Item.phone}</td>
                    </>
                  )}
                  <td>
                    <button onClick ={()=> this._handleToggleEditMode(Item.id) }>Edit</button>
                  </td>
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
