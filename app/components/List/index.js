import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import Item from './Item'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const data = this.props.data
        //console.log(data)
        return (
          <div className="list-container">
            {
                data.map((item, index) => {
                    return <Item key={index} data={item} />
                })
            }
            </div>
        )
    }
}

export default List
