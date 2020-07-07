import { LOGIN, LOGOUT, INIT_ROUTE, INIT_BILL,
         INIT_MY_ROUTE, SEARCH_ROUTE
} from "./action";

const defaultState = {
  login: false,
  user: null,  
  // login: true,
  // user: {
  //   id: 1,
  //   name: "理工大旅行社",
  //   sex: "男",
  //   phone: "01234567890",
  //   card: "123456123456123456",
  //   password: "123456",
  //   role: "agent"
  // },
  routes: [],
  bills: [],
  myRoute: [],
  search: []
};

export default (state=defaultState, action) => {
  switch(action.type) {
    case LOGIN:
    case LOGOUT:
    case INIT_ROUTE:
    case INIT_BILL:
    case INIT_MY_ROUTE:
    case SEARCH_ROUTE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}