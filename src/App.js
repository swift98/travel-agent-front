import React, { Fragment } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import lazyLoad from "./lazy";
import Header from "./header";
// import { Home, Search } from "./home";
// import { Login, Register, MyBill, MyRoute, EditRoute } from "./user";
import { GlobalResetStyle } from "./style";

const Home = lazyLoad(() => import("./home/component/home"));
const Search = lazyLoad(() => import("./home/component/search"));
const Login = lazyLoad(() => import("./user/component/login"));
const Register = lazyLoad(() => import("./user/component/register"));
const MyBill = lazyLoad(() => import("./user/component/myBill"));
const MyRoute = lazyLoad(() => import("./user/component/myRoute"));
const EditRoute = lazyLoad(() => import("./user/component/editRoute"));

const styleObj = {
  width: "1000px",
  margin: "10px auto",
  height: "100%",
  minHeight: "650px",
  backgroundColor: "#fff",
  padding: "15px"
};

function App() {
  return (
    <Provider store={store}>
      <div style={{backgroundColor: "#f9f9f9"}}>
        <GlobalResetStyle/>
        <Router>
          <Fragment>
            <Header/>
            <div style={styleObj}>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/myBill" component={MyBill} />
              <Route path="/myRoute" component={MyRoute} />
              <Route path="/edit/:id" component={EditRoute} />
              <Route path="/new_route" component={EditRoute} />
              <Route path="/search/:keyWord" component={Search} />
            </div>
          </Fragment>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
