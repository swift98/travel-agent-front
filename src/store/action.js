import axios from "axios";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const GET_ROUTES = "get_route";
export const INIT_ROUTE = "init_route";
export const INIT_BILL = "init_bill";
export const INIT_MY_ROUTE = "init_my_route";
export const SEARCH_ROUTE = "search_route";

//用户登录
export const loginAction = (user) => {
  return {
    type: LOGIN,
    data: {
      login: true,
      user
    }
  }
};

//退出登录
export const logoutAction = () => {
  return {
    type: LOGOUT,
    data: {
      login: false,
      user: null
    }
  }
};

//发出请求获取所有路线
export const getRouteAction = () => {
  return (dispatch) => {
    axios.get("/route/allRoutes").then(res => {
      // console.log(res.data);
      dispatch(routeInitAction(res.data));
    }).catch(error => {
      console.log(error);
    });
  }
};

//获取到所有路线初始化store
const routeInitAction = (data) => {
  return {
    type: INIT_ROUTE,
    data: {
      routes: data
    }
  }
};

//发出请求获取我的账单
export const getMyBillAction = (userId) => {
  return (dispatch) => {
    axios.get(`/route/myBill?userId=${userId}`).then(res => {
      // console.log(res.data);
      if(res.data.success) {
        dispatch(billsInitAction(res.data.bills));
      }
    }).catch(error => {
      console.log(error);
    });
  }
};

//获取到我的账单后改变store
const billsInitAction = (data) => {
  return {
    type: INIT_BILL,
    data: {
      bills: data
    }
  }
};

//发出请求获取我的所有路线
export const getMyRouteAction = (agentId) => {
  return (dispatch) => {
    axios.get(`/route/myRoute?agentId=${agentId}`).then(res => {
      if(res.data.success) {
        dispatch(myRouteInitAction(res.data.routes));
      }
    }).catch(error => {
      console.log(error);
    });
  }
};

//获取到所有我的路线后改变store
const myRouteInitAction = (data) => {
  data.forEach(item => item.key = item.id)
  return {
    type: INIT_MY_ROUTE,
    data: {
      myRoute: data
    }
  }
};

//发出请求搜索路线
export const getSearchRouteAction = (keyWord) => {
  return (dispatch) => {
    axios.get(`/route/searchRoute?keyWord=${keyWord}`).then(res => {
      if(res.data.success) {
        dispatch(searchRouteAction(res.data.routes));
      }
    }).catch(error => {
      console.log(error);
    });
  }
};

const searchRouteAction = (data) => ({
  type: SEARCH_ROUTE,
  data: {
    search: data
  }
});
