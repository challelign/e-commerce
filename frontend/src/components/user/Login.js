import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { login, clearErrors } from "../../actions/userActions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const alert = useAlert();
  const dispatch = useDispatch();
  //isAuthenticated, error, loading parametrs call from userReducers.js  authReducer method
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  ); // auth is from userReducers

  //this check it the user is checkout some item , and he is not logged in ,
  // will add shipping to the url after login
  // http://localhost:3000/login?redirect=shipping
  const redirect = location.search? location.search.split('=')[1]:'/'
//and take shipping else '/'
  useEffect(() => {
    if (isAuthenticated) {
      // history.push("/");
      history.push(redirect)
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    //this link to login.js component
    //call login.js component
    dispatch(login(email, password));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forget" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
