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

    }
    this.delete = this.delete.bind(this)
    this.change = this.change.bind(this)
    this.add = this.add.bind(this)
  }
  componentDidMount() {
    this.getDate()
  }
  getDate() {
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
      name: this.state.name,
      age: this.state.age
    }, {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log(res)
        // this.setState({
        //   list: res.data
        // })
        // console.log( this.state.list)

      })
  }
  delete() {

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
        名字：<input type="text" id="name" value={this.state.name} onKeyUp={this.add} onChange={this.change} />
        年龄：<input type="text" id="age" value={this.state.age} onKeyUp={this.add} onChange={this.change} />
        <button onClick={this.add}>添加</button>
        {this.state.name}
        <ul>
          {
            list.map((item, index) => {
              return <li key={item.id}>
                {item.name}
                <button>删除</button>
                <button>修改</button>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
