import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List.js'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const params = this.props.params
        return (
            <div>
                <SearchHeader keyword={params.keyword} />
                <SearchList keyword={params.keyword} category={params.category} />
            </div>
        )
    }

    // componentDidMount() {
    //     const params = this.props.params
    //     console.log('category param:' + params.category)
    //     console.log('key param:' + params.keyword)
    // }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
// export default Search
module.exports = Search
