import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'


class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],  //存储列表信息
            hasMore: false,  //记录当前状态下还有没有更多的数据可供加载
            isLoadingMore: false, //记录当前状态下，是“加载中..” 还是“点击加载更多”
            page: 1  //下一页的页码

        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data} />
                    : <div>加载中...</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}></LoadMore>
                    : <div></div>
                }

            </div>
        )
    }

    componentDidMount() {
        //获取首页数据
        this.loadFirstPageData()
    }
    //获取首屏数据
    loadFirstPageData(){
        const cityName = this.props.cityName
        const result = getListData(cityName, 0)
        this.resultHandle(result)
    }
    //加载更多数据   点击加载更多 按钮 触发
    loadMoreData() {
        //用到this.resultHandle
        //加载更多  变成  加载中
        this.setState({
            isLoadingMore: true
        })

        const cityName = this.props.cityName
        const page = this.state.page   //下一页的页码
        const result = getListData(cityName,page)

        this.resultHandle(result)

        //增加page的基数
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })

    }

    //处理数据
    resultHandle(result){
        result.then(res => {
            return res.json()
        }).then(json => {
            const hasMore = json.hasMore
            const data = json.data
            //存储
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)   //数据拼接上，而不是覆盖数据
            })

        })
    }


}

export default List
