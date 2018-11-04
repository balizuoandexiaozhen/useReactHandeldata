import React, { Component } from 'react';

class Lis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false,
            name: "",
            age: ""
        }
        this.show = this.show.bind(this)
        this.change = this.change.bind(this)
        this.modify = this.modify.bind(this)
        // console.log(props)
    }
    show(name,age) {
        return () => {
            this.setState({
                flag: !this.state.flag,
                name,
                age
            })
        }
    }
    change(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    modify(id) {
        return () => {
            let {name,age} = this.state
            this.props.modify(id,name,age)
            this.setState({
                flag: !this.state.flag
            })
        }
    }
    render() {
        let {name,age,id} = this.props.lis
        return  <li >
                    宠物名：{name}
                    年龄：{age}
                    <button onClick={this.props.del.bind(this,id)}>删除</button>
                    <button onClick={this.show(name,age)}>修改</button>
                    <span style={{display: this.state.flag?"block":"none"}} >
                    名字：<input  id="name" type="text" value={this.state.name} onChange={this.change}/><br/>
                    年龄：<input   id="age" type="text" value={this.state.age} onChange={this.change}/><br/>
                    <button onClick={this.modify(id)}>确认修改</button>
                    </span>
                </li>

    }
}

export default Lis
