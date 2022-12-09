import { Breadcrumb, Layout, Menu, theme, Typography } from "antd";
const { Header, Content, Footer } = Layout;
import styles from "./index.module.css";
import Headers from "./Header";
import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../../store";
import { authActions } from "../../store/slices/authSlice";

const TopBar = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("token") || "";
      const userId = localStorage.getItem("userId") || "";
      const name = localStorage.getItem("name") || "";
      console.log(token + userId + name);

      if (token !== "" && userId !== "" && name !== "") {
        dispatch(authActions.setAuth({ token, userId, name }));
      }
    }
  }, []);

  return (
    <Fragment>
      <Header
        style={{
          top: 0,
          zIndex: 1,
          width: "100",
          backgroundColor: "#173B33",
          height: "30px",
        }}
      >
        {/* <Typography.Text>
          You’ve been gifted 20% off your first purchase! REDEEM NOW
        </Typography.Text> */}
      </Header>
      <Headers />
      <div className="container">
        <div className={styles.content}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default TopBar;
