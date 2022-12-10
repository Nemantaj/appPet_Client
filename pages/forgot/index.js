import styles from "../auth/index.module.css";
import { motion } from "framer-motion";
import { Input, Card, Button, Typography, Divider, message, Spin } from "antd";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import useInput from "../../hooks/useInputPrice";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Forgot = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
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
    inputValue: codeValue,
    error: codeError,
    isValid: codeValid,
    inputHandler: codeHandler,
    blurHandler: codeBlur,
    clearInput: codeClear,
    setInput: setCode,
  } = useInput((value) => value !== "", 0);

  const {
    inputValue: passValue,
    error: passError,
    isValid: passValid,
    inputHandler: passHandler,
    blurHandler: passBlur,
    clearInput: passClear,
    setInput: setPass,
  } = useInput((value) => value !== "", "");

  const getCodes = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/get-codes/" + emailValue)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          setLoading(false);
          return messageApi.open({
            type: "error",
            content: data.msg,
            duration: 5,
          });
        }

        setLoading(false);
        setStep(2);
        return messageApi.open({
          type: "success",
          content: "Sent Successfully!",
          duration: 5,
        });
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: err.msg,
          duration: 5,
        });
      });
  };

  const validateCodes = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/validate-codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailSaved: emailValue, code: codeValue }),
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
            duration: 5,
          });
        }

        setLoading(false);
        setStep(3);
        codeClear();
        setToken(data.token);
        return messageApi.open({
          type: "success",
          content: "Validated!",
          duration: 5,
        });
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: err.msg,
          duration: 5,
        });
      });
  };

  const reset = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        token: token,
        pass: passValue,
      }),
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
            duration: 5,
          });
        }

        setLoading(false);
        messageApi.open({
          type: "success",
          content: "Validated!",
          duration: 5,
        });
        router.push("/auth");
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: err.msg,
          duration: 5,
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
        Reset yout password.
      </Typography.Text>
      <Card hoverable={true} bordered={false} className={styles.login}>
        {step === 1 && (
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

            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={emailValid ? false : true}
              onClick={getCodes}
              style={{ marginTop: "10px", backgroundColor: "#4B277E" }}
            >
              {loading ? <Spin /> : "Get recovery codes"}
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className={styles.loginCard}>
            <div>
              <Typography.Text>Enter code</Typography.Text>
              <Input
                style={{ marginTop: 7 }}
                type="number"
                placeholder="email"
                size="large"
                onBlur={codeBlur}
                onChange={codeHandler}
                value={codeValue}
              />
            </div>

            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={codeValid ? false : true}
              onClick={validateCodes}
              style={{ marginTop: "10px", backgroundColor: "#4B277E" }}
            >
              {loading ? <Spin /> : "Validate"}
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className={styles.loginCard}>
            <div>
              <Typography.Text>Enter new password</Typography.Text>
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ marginTop: 7 }}
                type="text"
                placeholder="password"
                size="large"
                onBlur={passBlur}
                onChange={passHandler}
                value={passValue}
              />
            </div>

            <Button
              type="primary"
              shape="round"
              size="large"
              disabled={passValid ? false : true}
              onClick={reset}
              style={{ marginTop: "10px", backgroundColor: "#4B277E" }}
            >
              {loading ? <Spin /> : "Reset"}
            </Button>
          </div>
        )}
      </Card>
      {contextHolder}
    </motion.div>
  );
};

export default Forgot;
