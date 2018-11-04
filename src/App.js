import React, { Component } from 'react';
import axios from 'axios'
import List from './components/List'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: "",
      age: "",
      flag: false,
      query: "",
      querylist: []
    }
    this.change = this.change.bind(this)
    this.add = this.add.bind(this)
    this.del = this.del.bind(this)
    this.modify = this.modify.bind(this)
    this.query = this.query.bind(this)
  }
  componentDidMount() {
    this.getData()
    // this.forceUpdate()
  }
  getData() {
    axios.get("http://localhost:4000/dogs").then((res) => {
      // console.log(res.data)
      this.setState({
        list: res.data
      })
      // this.forceUpdate()

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
        this.setState({
          name: "",
          age: ""
        })
      })
  }
  del(id) {
      // console.log(id)
      axios.delete('http://localhost:4000/dogs/'+id).then(() => {
          this.getData();
      })
  }
  modify(id,name,age) {
    // console.log(id,name,age)
    axios.patch("http://localhost:4000/dogs/"+id, {
      name,
      age
    }, {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.getData()
        console.log(this.state.query)
        this.query()
      })
  }
  query(e) {
      if(this.state.query === "") {
        this.setState({
          querylist: []
        })
        return
      }
      var list = this.state.list
      list = list.filter((item,index) => {
        return item.name.includes(this.state.query)
      })
      this.setState({
        querylist: list
      })


  }
  change(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    let { list,querylist} = this.state
    return (
      <div>
        名字：<input type="text" id="name" value={this.state.name} onChange={this.change} />
        年龄：<input type="text" id="age" value={this.state.age} onChange={this.change} />
        <button onClick={this.add}>添加</button><br/>
        查找：<input type="text" id="query" value={this.state.query} onKeyUp={this.query} onChange={this.change}/><br/>{this.state.query}
        查找数据
        <List list={querylist} del={this.del} modify={this.modify}/>
        <hr/>
        全部数据
        <List list={list} del={this.del} modify={this.modify}/>
      </div>
    );
  }
}

export default App;
