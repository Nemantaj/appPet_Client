import {
  Descriptions,
  Divider,
  Typography,
  Input,
  Button,
  Spin,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import useInput from "../../hooks/useInputPrice";

const Billing = (props) => {
  const [total, setTotal] = useState(0);
  const [expiry, setExpiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: nameClear,
    setInput: setName,
  } = useInput((value) => value !== "", "");

  useEffect(() => {
    let totals;
    if (props.bill.coupons.length > 0) {
      const couponTotal = props.bill.coupons.reduce((a, b) => a + b.amount, 0);
      console.log(couponTotal);
      totals = props.bill.plan.price - couponTotal;
    } else {
      totals = props.bill.plan.price;
    }
    setTotal(totals);

    if (props.plan === "trial") {
      let exp = new Date();
      exp.setDate(exp.getDate() + 8);
      setExpiry(exp);
    } else {
      let exp = new Date();
      exp.setDate(exp.getDate() + 31);
      setExpiry(exp);
    }
  }, [props.bill]);

  const addPromo = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/promo/" + nameValue)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          setLoading(false);
          return messageApi.open({
            type: "error",
            content: "This coupon code is either invalid or has expired",
            duration: 5,
          });
        }
        console.log("here");
        const copy = { ...props.bill };
        const index = copy.coupons.findIndex((doc) => {
          return doc._id.toString() === data.payload._id.toString();
        });
        console.log("here");
        if (index < 0) {
          console.log(index);
          const coupons = [...copy.coupons, data.payload];
          copy.coupons = coupons;
          props.setBill(copy);
          console.log(index);
        }
        setLoading(false);
        nameClear();
        return messageApi.open({
          type: "success",
          content: "Coupon code successfully added",
          duration: 5,
        });
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: "This coupon code is either invalid or has expired",
          duration: 5,
        });
      });
  };

  return (
    <Fragment>
      {/* <Descriptions size="small" bordered>
        <Descriptions.Item label="Plans" >
          {props.bill.plan.name} | {props.bill.plan.size}
        </Descriptions.Item>
        <Descriptions.Item label="Expires">{}</Descriptions.Item>
        <Descriptions.Item label="Amount">
          &#8377;{props.bill.plan.price}
        </Descriptions.Item>
      </Descriptions> */}
      <div className={styles.subTotal}>
        <div className={styles.subTitle}>
          <Typography.Text>Plan</Typography.Text>
          <Typography.Title level={5}>
            {props.bill.plan.name} | {props.bill.plan.size}
          </Typography.Title>
        </div>
        <div className={styles.subTitle}>
          <Typography.Text>Expiry</Typography.Text>
          <Typography.Title level={5}>
            {new Date(expiry).toLocaleDateString()}
          </Typography.Title>
        </div>
        <div className={styles.subTitle}>
          <Typography.Text>Amount</Typography.Text>
          <Typography.Title level={5}>
            &#8377;{props.bill.plan.price}
          </Typography.Title>
        </div>
      </div>
      <Divider />
      <div className={styles.subTotal}>
        <div className={styles.subTitle}>
          <Typography.Text>Code</Typography.Text>
          {props.bill.coupons.length > 0 &&
            props.bill.coupons.map((doc) => {
              return <Typography.Title level={5}>{doc.code}</Typography.Title>;
            })}
        </div>
        <div className={styles.subTitle}>
          <Typography.Text>Discount</Typography.Text>
          {props.bill.coupons.length > 0 &&
            props.bill.coupons.map((doc) => {
              return (
                <Typography.Title level={5}>
                  -&#8377;{doc.amount}
                </Typography.Title>
              );
            })}
        </div>
      </div>
      {/* <Descriptions size="small" bordered>
        {props.bill.coupons.length > 0 &&
          props.bill.coupons.map((doc) => {
            return (
              <Fragment>
                <Descriptions.Item label="Code">{doc.code}</Descriptions.Item>
                <Descriptions.Item label="Discount">
                  &#8377; {doc.amount}
                </Descriptions.Item>
              </Fragment>
            );
          })}
      </Descriptions> */}
      <Input.Group compact style={{ marginTop: "25px" }}>
        <Input
          style={{ width: "250px" }}
          onChange={nameHandler}
          onBlue={nameBlur}
          value={nameValue}
        />
        <Button
          type="primary"
          onClick={addPromo}
          disabled={nameValid ? false : true}
        >
          {loading ? <Spin /> : "Submit"}
        </Button>
      </Input.Group>
      <Divider />
      <motion.div className={styles.grandTotal}>
        <motion.div
          layout
          className={styles.checkoutBar}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className={styles.grandText}>
            <Typography.Text style={{ margin: 0, color: "#fff" }}>
              Total
            </Typography.Text>{" "}
            -
            <Typography.Title level={3} style={{ margin: 0, color: "#fff" }}>
              &#8377;{total}
            </Typography.Title>
          </div>
          |
          <Button
            type="primary"
            style={{
              height: "50px",
              backgroundColor: "#F2674B",
              fontWeight: "bolder",
              fontFamily: "monst",
            }}
            shape="round"
            size="large"
            onClick={() => props.pay(total)}
          >
            {props.loading ? <Spin /> : "Checkout"}
          </Button>
        </motion.div>
      </motion.div>
      {contextHolder}
    </Fragment>
  );
};

export default Billing;
