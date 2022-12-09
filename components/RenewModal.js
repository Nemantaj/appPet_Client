import {
  Descriptions,
  Divider,
  Typography,
  Input,
  Button,
  Spin,
  message,
  Modal,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import styles from "./plans/index.module.css";
import { motion } from "framer-motion";
import useInput from "../hooks/useInputPrice";
import { useSelector } from "react-redux";

const RenewModal = (props) => {
  const [total, setTotal] = useState(0);
  const [expiry, setExpiry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

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
      let exp = new Date(props.exp);
      exp.setDate(exp.getDate() + 8);
      setExpiry(exp);
    } else {
      let exp = new Date(props.exp);
      exp.setDate(exp.getDate() + 31);
      setExpiry(exp);
    }
  }, [props.bill]);

  const addPromo = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd.vercel.app//promo/" + nameValue)
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

  const payBills = () => {
    setLoading(true);
    const coupons = props.bill.coupons.map((doc) => {
      return { code: doc.code, discount: doc.amount };
    });
    console.log({
      amount: total,
      note: "Renew",
      coupons,
    });
    fetch("https://app-pet-api-6jjd.vercel.app//renew-plan/" + props.plan._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        amount: total,
        note: "Renew",
        coupons,
      }),
    })
      .then((res) => {
        console.log(res);
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

        // dispatch(planActions.setPlans({}));

        const cf = new Cashfree(data.order.payment_session_id);
        cf.redirect();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      title="Renew Plan"
      open={props.isModalOpen}
      onOk={payBills}
      onCancel={props.handleCancel}
    >
      <Divider />
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
      <div className={styles.subTotal}>
        <div className={styles.subTitle}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Total
          </Typography.Title>
        </div>
        <div className={styles.subTitle}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            -&#8377;{total}
          </Typography.Title>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
};

export default RenewModal;
