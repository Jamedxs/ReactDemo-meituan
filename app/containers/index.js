import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import Home from './Home/index'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        //为了优化react性能，所有的react的js页面都加上这句话
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          initDone: false
        }
    }
    render() {
        return (
            <div>
              {
                this.state.initDone
                ? this.props.children
                : <Home/>
              }
            </div>
        )
    }

    componentDidMount() {
      //从localstorerage里面获取城市
      let cityName = LocalStore.getItem(CITYNAME)
      if(cityName == null){
        cityName = '北京'
      }
      //将城市信息存储到 Redux 中
      this.props.userInfoActions.update({
        cityName: cityName
      })

      this.setState({
        initDone: true
      })

    }


}

function mapStateToProps(state){
    return{

    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
