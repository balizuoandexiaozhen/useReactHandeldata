import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: "",
      age: "",
      flag: false
    }
    this.change = this.change.bind(this)
    this.add = this.add.bind(this)
    this.del = this.del.bind(this)
    this.modify = this.modify.bind(this)
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    axios.get("http://localhost:4000/dogs").then((res) => {
      //console.log(res.data)
      this.setState({
        list: res.data
      })

    })
  }
  add() {
    let { name, age } = this.state
    axios.post("http://localhost:4000/dogs", {
      name,
      age
    }, {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.getData()

      })
  }
  del(id) {
      console.log(id)
      axios.delete('http://localhost:4000/dogs/'+id).then(() => {
        this.getData();
    })
  }
  modify(id,name,age) {
    console.log(id,name,age)
    this.setState({
      flag: !this.state.flag
    })
  }
  change(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    let { list } = this.state
    return (
      <div>
        名字：<input type="text" id="name" value={this.state.name} onChange={this.change} />
        年龄：<input type="text" id="age" value={this.state.age} onChange={this.change} />
        <button onClick={this.add}>添加</button>
        {this.state.name}
        {this.state.age}
        <ul>
          {
            list.map((item, index) => {
              return <li key={item.id} ref={item.id}>
                宠物名：{item.name}
                年龄：{item.age}
                <button onClick={this.del.bind(this,item.id)}>删除</button>
                <button onClick={this.modify.bind(this,item.id,item.name,item.age)}>修改</button>
                <input style={{display: this.state.flag?"block":"none"}} type="text" />
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
