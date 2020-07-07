import React from "react";
import { connect } from "react-redux";
import MyTable from "./table";
import { getSearchRouteAction } from "../../store/action";
import { HomeWrapper } from "../style";

class Search extends React.Component {

  componentDidMount() {
    const keyWord = this.props.match.params.keyWord;
    if(keyWord) {
      this.props.init(keyWord);
    }
  }

  render() {
    return (<HomeWrapper>
      <MyTable routes={this.props.routes} title="搜索结果" />
    </HomeWrapper>);
  }
}

const mapStateToProps = (state) => ({
  routes: state.search
});

const mapDispatchToProps = (dispatch) => ({
  init(keyWord) {
    dispatch(getSearchRouteAction(keyWord));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
