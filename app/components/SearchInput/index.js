import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'


class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <input
                className="search-input"
                type="text"
                placeholder="请输入关键字"
                value={this.state.value}
                onChange={this.changeHandle.bind(this)}
                onKeyUp={this.keyUpHandle.bind(this)}/>
        )
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || ''
        })
    }

    changeHandle(e) {
        this.setState({
            value: e.target.value
        })
    }

    keyUpHandle(e) {
        //  13为回车
        if(e.keyCode !== 13) {
            return
        }
        this.props.enterHandle(this.state.value)
    }

}

export default SearchInput
