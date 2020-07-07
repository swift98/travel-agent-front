import React from "react";
import { connect } from "react-redux";
import MyTable from "./table";
import Hot from "./hot";
import { HomeWrapper } from "../style";
import { getRouteAction } from "../../store/action";

class Home extends React.Component {

  componentDidMount() {
    this.props.init();
  }
  
  render() {
    const { routes } = this.props;
    return (<HomeWrapper>
      <MyTable routes={routes} title="所有路线" />
      <Hot />
    </HomeWrapper>);
  }
}

const mapStateToProps = (state) => {
  return {
    routes: state.routes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init() {
      dispatch(getRouteAction());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
