import { motion } from "framer-motion";
import { Input, Card, Button, Typography, Divider, message, Spin } from "antd";
import styles from "./index.module.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import useInput from "../../hooks/useInputPrice";

import { useState, useEffect } from "react";
import { dispatch } from "../../store";
import { authActions } from "../../store/slices/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Auth = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      if (isAuth) {
        router.push("/home");
      }
    }
  }, [isAuth]);

  const {
    inputValue: emailValue,
    error: emailError,
    isValid: emailValid,
    inputHandler: emailHandler,
    blurHandler: emailBlur,
    clearInput: emailClear,
    setInput: setEmail,
  } = useInput(
    (value) =>
      value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    ""
  );

  const {
    inputValue: passValue,
    error: passError,
    isValid: passValid,
    inputHandler: passHandler,
    blurHandler: passBlur,
    clearInput: passClear,
    setInput: setPass,
  } = useInput((value) => value !== "", "");

  const auth = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd.vercel.app//login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue, pass: passValue }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          setLoading(false);
          return messageApi.open({
            type: "error",
            content: data.msg,
            duration: 10,
          });
        }

        setLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        dispatch(
          authActions.setAuth({
            userId: data.userId,
            name: data.name,
            token: data.token,
          })
        );
        return messageApi.open({
          type: "success",
          content: "Login Successfull!",
          duration: 10,
        });
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: err.msg,
          duration: 10,
        });
      });
  };

  return (
    <motion.div
      className={styles.auth}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.imgDivlogo}>
        <img
          src="https://kukur.co/images/logo/123.png"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* <Typography.Title level={2} style={{ margin: 0 }}>Welcome!</Typography.Title> */}
      <Typography.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
        Please log in to continue.
      </Typography.Text>
      <Card hoverable={true} bordered={false} className={styles.login}>
        <div className={styles.loginCard}>
          <div>
            <Typography.Text>Email</Typography.Text>
            <Input
              style={{ marginTop: 7 }}
              type="text"
              placeholder="email"
              size="large"
              onBlur={emailBlur}
              onChange={emailHandler}
              value={emailValue}
            />
          </div>
          <div>
            <Typography.Text>Password</Typography.Text>
            <Input.Password
              size="large"
              placeholder="password"
              style={{ marginTop: 7 }}
              onBlur={passBlur}
              onChange={passHandler}
              value={passValue}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={auth}
            disabled={emailValid && passValid ? false : true}
            style={{ marginTop: "10px", backgroundColor: "#4B277E" }}
          >
            {loading ? <Spin /> : "Login"}
          </Button>
          <Link href="/forgot" legacyBehavior>
            <Button
              type="text"
              shape="round"
              size="large"
              style={{
                color: "#F2674B",
                width: "fit-content",
                alignSelf: "flex-end",
              }}
            >
              Forgot Password
            </Button>
          </Link>
          <Divider />
        </div>
        <div className={styles.loginSub}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            New to kukur.co
          </Typography.Title>
          <Link href="/create" legacyBehavior>
            <Button
              type="default"
              shape="round"
              size="large"
              style={{ color: "#F2674B", borderColor: "#F2674B" }}
            >
              Build your plan
            </Button>
          </Link>
        </div>
      </Card>
      {contextHolder}
    </motion.div>
  );
};

export default Auth;
