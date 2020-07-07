import React from "react";

export default (importComponent) => {
  return class LazyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {component: null}
    }

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({component: cmp.default});
      });
    }

    render() {
      const Component = this.state.component;
      return Component ? <Component {...this.props} /> : null;
    }
  }
}