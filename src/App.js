import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import UserHomepage from "./pages/user/Homepage";
import ShopsListpage from "./pages/user/ShopsListpage";
import Shoppage from "./pages/admin/ShopDetailspage";
import AllMallspage from "./pages/user/AllMallspage";
import AdminAllMallspage from "./pages/admin/AllMallspage";
import AdminHomepage from "./pages/admin/Homepage";
import AddFormPage from "./pages/admin/AddFormPage";
import AdminShopLists from "./pages/admin/ShopListspage";
import AddShopsFormPage from "./pages/admin/AddShopsFormPage";
import EditShopFormpage from "./pages/admin/EditShopFormpage";
import ShopDetailspage from "./pages/user/ShopDetailspage";
import AllShopspage from "./pages/user/AllShopspage";
import AdminAllShopspage from "./pages/admin/AllShopspage";
import EditMallFormpage from "./pages/admin/EditMallFormpage";
import Login from "./components/Form/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />

          {/* User Routes */}
          <ProtectedRoute path="/user/home" component={UserHomepage} />
          <ProtectedRoute path="/user/allmalls" component={AllMallspage} />
          <ProtectedRoute path="/user/allshops" component={AllShopspage} />
          <ProtectedRoute
            exact
            path="/user/malls/:mallid"
            component={ShopsListpage}
          />
          <ProtectedRoute
            path="/user/malls/:mallid/:shopid"
            component={ShopDetailspage}
          />
          <ProtectedRoute path="/user/shops" component={ShopDetailspage} />

          {/* Admin Routes */}
          <ProtectedRoute
            path="/admin/malls/:mallid/:shopid"
            component={Shoppage}
          />
          <ProtectedRoute path="/admin/addmall" component={AddFormPage} />
          <ProtectedRoute
            path="/admin/:mallid/addshop"
            component={AddShopsFormPage}
          />
          <ProtectedRoute
            path="/admin/malls/:mallid"
            component={AdminShopLists}
          />
          <ProtectedRoute
            path="/admin/allmalls"
            component={AdminAllMallspage}
          />
          <ProtectedRoute
            path="/admin/allshops"
            component={AdminAllShopspage}
          />
          <ProtectedRoute
            path="/admin/:mallid/:shopid/editshop"
            component={EditShopFormpage}
          />
          <ProtectedRoute
            path="/admin/:mallid/editmall"
            component={EditMallFormpage}
          />
          <ProtectedRoute path="/admin/shop" component={ShopDetailspage} />

          <ProtectedRoute path="/admin/home" component={AdminHomepage} />
          <Route path="/" render={() => <Redirect to="/admin/home" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
