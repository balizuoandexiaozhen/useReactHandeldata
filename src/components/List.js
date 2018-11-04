import React, { Component } from 'react';
import Lis from './Lis'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: false
        }
        // console.log(props)
    }

    render() {
        return  <ul>
                    {
                    this.props.list.map((item, index) => {
                        return <Lis key={item.id} lis={item} del={this.props.del} modify={this.props.modify}/>
                    })
                    }
                </ul>
    }
}

export default List
