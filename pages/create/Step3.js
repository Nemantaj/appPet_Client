import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Select, Input, Spin } from "antd";
import CountSteps from "../../components/steps";
import styles from "./index.module.css";
import img1 from "../../assests/1.png";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.png";
import Image from "next/image";
import useInput from "../../hooks/useInputPrice";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";
import { useSelector } from "react-redux";

const MButton = motion(Button);

const Step3 = (props) => {
  const plans = useSelector((state) => state.plan.plans);

  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: nameClear,
    setInput: setName,
  } = useInput((value) => value !== "", "");

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
    inputValue: pincodeValue,
    error: pincodeError,
    isValid: pincodeValid,
    inputHandler: pincodeHandler,
    blurHandler: pincodeBlur,
    clearInput: pincodeClear,
    setInput: setPincode,
  } = useInput((value) => value.length > 5, 0);

  const {
    inputValue: addressValue,
    error: addressError,
    isValid: addressValid,
    inputHandler: addressHandler,
    blurHandler: addressBlur,
    clearInput: addressClear,
    setInput: setAddress,
  } = useInput((value) => value !== "", "");

  const {
    inputValue: mobileValue,
    error: mobileError,
    isValid: mobileValid,
    inputHandler: mobileHandler,
    blurHandler: mobileBlur,
    clearInput: mobileClear,
    setInput: setMobile,
  } = useInput((value) => value.length >= 10, "");

  useEffect(() => {
    if (Object.keys(plans).length > 0 && plans.hasOwnProperty("user")) {
      setName(plans.user.name);
      setEmail(plans.user.email);
      setPincode(plans.user.pincode);
      setAddress(plans.user.address);
      setMobile(plans.user.mobile);
    }
  }, []);

  return (
    <motion.div
      className={styles.step2}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.imgDivStep2}>
        <Image src={img3} layout="fill" objectFit="contain" />
      </div>
      <Typography.Title level={3} style={{ fontFamily: "monst" }}>
        Tell us about yourself.
      </Typography.Title>
      <motion.div className={styles.dogStep1}>
        <div className={nameError ? styles.inputs1Error : styles.inputs1}>
          <Typography.Text
            style={{ fontSize: "15px", marginBottom: 5, fontWeight: "bold" }}
          >
            Your Name
          </Typography.Text>
          <Input
            placeholder="name"
            size="large"
            style={{
              fontSize: "15px",
              margin: 0,
              padding: 5,
              textAlign: "center",
              maxWidth: "200px",
            }}
            type="text"
            bordered={false}
            value={nameValue}
            onChange={nameHandler}
            onBlur={nameBlur}
          />
        </div>
      </motion.div>
      {nameValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={emailError ? styles.inputs1Error : styles.inputs1}>
            <Typography.Text
              style={{ fontSize: "15px", marginBottom: 5, fontWeight: "bold" }}
            >
              Your Email
            </Typography.Text>
            <Input
              placeholder="email"
              size="large"
              style={{
                fontSize: "15px",
                margin: 0,
                padding: 5,
                textAlign: "center",
                maxWidth: "200px",
              }}
              type="text"
              bordered={false}
              value={emailValue}
              onChange={emailHandler}
              onBlur={emailBlur}
            />
          </div>
        </motion.div>
      )}
      {nameValid && emailValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={pincodeError ? styles.inputs1Error : styles.inputs1}>
            <Typography.Text
              style={{ fontSize: "15px", marginBottom: 5, fontWeight: "bold" }}
            >
              Your Pincode
            </Typography.Text>
            <Input
              placeholder="pincode"
              size="large"
              style={{
                fontSize: "15px",
                margin: 0,
                padding: 5,
                textAlign: "center",
                maxWidth: "200px",
              }}
              type="number"
              bordered={false}
              value={pincodeValue}
              onChange={pincodeHandler}
              onBlur={pincodeBlur}
            />
          </div>
        </motion.div>
      )}
      {nameValid && emailValid && pincodeValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={mobileError ? styles.inputs1Error : styles.inputs1}>
            <Typography.Text
              style={{ fontSize: "15px", marginBottom: 5, fontWeight: "bold" }}
            >
              Your Number
            </Typography.Text>
            <Input
              placeholder="number"
              size="large"
              style={{
                fontSize: "15px",
                margin: 0,
                padding: 5,
                textAlign: "center",
                maxWidth: "200px",
              }}
              type="number"
              bordered={false}
              value={mobileValue}
              onChange={mobileHandler}
              onBlur={mobileBlur}
            />
          </div>
        </motion.div>
      )}
      {nameValid && emailValid && mobileValid && pincodeValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={addressError ? styles.inputs2Error : styles.inputs2}>
            <Typography.Text
              style={{ fontSize: "15px", marginBottom: 5, fontWeight: "bold" }}
            >
              Your Address
            </Typography.Text>
            <Input
              placeholder="address"
              size="large"
              style={{
                fontSize: "15px",
                margin: 0,
                padding: 5,
                textAlign: "center",
                maxWidth: "300px",
              }}
              type="text"
              bordered={false}
              value={addressValue}
              onChange={addressHandler}
              onBlur={addressBlur}
            />
          </div>
        </motion.div>
      )}
      {nameValid &&
        emailValid &&
        mobileValid &&
        pincodeValid &&
        addressValid && (
          <MButton
            type="primary"
            style={{
              marginTop: "40px",

              height: "50px",
              backgroundColor: "#F1B342",
              fontWeight: "bolder",
              fontFamily: "monst",
            }}
            shape="round"
            size="large"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => {
              const copy = {
                ...plans,
                user: {
                  name: nameValue,
                  email: emailValue,
                  address: addressValue,
                  mobile: mobileValue,
                  pincode: pincodeValue,
                },
              };
              dispatch(planActions.setPlans(copy));
              console.log("Checking pincode validity");
              props.createPlan({
                name: nameValue,
                email: emailValue,
                address: addressValue,
                mobile: mobileValue,
                pincode: pincodeValue,
              });
              dispatch(planActions.setStep(100));
            }}
          >
            {props.loading ? <Spin /> : "Continue"}
          </MButton>
        )}
    </motion.div>
  );
};

export default Step3;
