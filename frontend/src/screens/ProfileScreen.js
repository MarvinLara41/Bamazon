import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";

export default function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>

        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="name"
                  value={user.name}
                ></input>
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  value={user.email}
                ></input>
              </div>
              <div>
                <label htmlFor="password">password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={user.password}
                ></input>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                ></input>
              </div>
              <div>
                <label />
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
