import { Fragment, useEffect, useState } from "react";
import { Layout, Typography, Button, Dropdown } from "antd";
const { Header } = Layout;
import Image from "antd";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import {
  UserOutlined,
  MenuOutlined,
  LeftOutlined,
  LoginOutlined,
  DownOutlined,
} from "@ant-design/icons";
import useWindowWide from "../../hooks/useWindowWide";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";
import Link from "next/link";
import { authActions } from "../../store/slices/authSlice";

const lists = [
  { label: "Reviews", key: "1" },
  { label: "About Us", key: "2" },
  { label: "FAQ", key: "3" },
];

const Headers = () => {
  const [scroll, setScroll] = useState(false);
  const currentWidth = useWindowWide(660);
  const router = useRouter();
  const steps = useSelector((state) => state.plan.step);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.name);

  //Function to determine if user has scrolled
  const changeNavbarStyles = () => {
    if (window.scrollY >= 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarStyles);
    return () => {
      window.removeEventListener("scroll", changeNavbarStyles);
    };
  }, []);

  const backCreate = () => {
    if (steps === 35) {
      dispatch(planActions.setStep(0));
    } else if (steps === 70) {
      dispatch(planActions.setStep(35));
    } else if (steps === 100) {
      dispatch(planActions.setStep(70));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    return dispatch(authActions.revokeAuth());
  };

  const items = [
    {
      label: (
        <Button
          type="primary"
          shape="round"
          style={{ backgroundColor: "#4B277E" }}
          icon={<LoginOutlined />}
          onClick={logout}
        >
          Logout
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow:
          "0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%)",
      }}
    >
      <div className="container">
        <motion.div className={styles.header}>
          {steps > 0 && router.pathname === "/create" ? (
            <Button
              // type="primary"
              shape="circle"
              className={currentWidth ? styles.marginLeft : ""}
              icon={<LeftOutlined />}
              onClick={backCreate}
            />
          ) : (
            <div></div>
          )}
          <motion.div
            className={
              currentWidth
                ? scroll
                  ? `${styles.logo} ${styles.logoStatic}`
                  : `${styles.logo} ${styles.logoScroll}`
                : scroll
                ? `${styles.logo} ${styles.logoMobileStatic}`
                : `${styles.logo} ${styles.logoMobileScroll}`
            }
            layout
            transition={{ duration: 1, type: "spring" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{scale: 1.2}}
            onClick={() => {
              if (router.pathname === "/create") {
                return;
              } else {
                router.push("/create");
              }
            }}
          >
            <img src="https://kukur.co/images/logo/123.png" />
          </motion.div>
          <div>
            {router.pathname !== "/auth" && !isAuth && (
              <Link href="/auth" legacyBehavior>
                <Button
                  type="primary"
                  shape="circle"
                  style={{ backgroundColor: "#4B277E" }}
                  icon={<LoginOutlined />}
                />
              </Link>
            )}
            {isAuth && (
              <Dropdown.Button
                menu={{
                  items,
                }}
                trigger={["click"]}
                icon={<DownOutlined />}
                onClick={() => {
                  if (router.pathname === "/home") {
                    return;
                  } else {
                    router.push("/home");
                  }
                }}
              >
                {username}
              </Dropdown.Button>
            )}
          </div>
        </motion.div>
      </div>
    </Header>
  );
};

export default Headers;
