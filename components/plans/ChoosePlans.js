import styles from "./index.module.css";
import { motion } from "framer-motion";
import { Button, Divider, Typography, message } from "antd";
import PlansCard from "./PlansCard";
import Billing from "./Billing";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";

const ChoosePlans = (props) => {
  const [plan, setPlan] = useState("");
  const [bill, setBill] = useState({ plan: {}, coupons: [] });
  const [loading, setLoading] = useState(false);
  const plans = useSelector((state) => state.plan.plans);
  const [messageApi, contextHolder] = message.useMessage();
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const payBills = (total) => {
    setLoading(true);
    const coupons = bill.coupons.map((doc) => {
      return { code: doc.code, discount: doc.amount };
    });
    fetch("https://app-pet-api-6jjd.vercel.app//create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
        email: plans.user.email,
        petId: props.pet._id,
        plan: bill.plan.name,
        planPrice: bill.plan.price,
        coupons,
        note: "Initial Plan",
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

        setOrderData(data.order);
        const cf = new Cashfree(data.order.payment_session_id);
        dispatch(planActions.setPlans({}));
        dispatch(planActions.setStep(0));
        cf.redirect();
      });
  };

  return (
    <motion.div>
      <Typography.Title level={1} style={{ marginTop: "100px" }}>
        Here's a plan for your dog.
      </Typography.Title>
      <Divider />
      <motion.div className={styles.plansGrid}>
        <PlansCard
          plans={props.plan}
          bill={bill}
          setBill={setBill}
          plan={plan}
          setPlan={setPlan}
        />
      </motion.div>
      {Object.keys(bill.plan).length > 0 && (
        <Fragment>
          <Typography.Title level={1} style={{ marginTop: "60px" }}>
            SubTotal
          </Typography.Title>
          <Divider />
          <Billing
            plan={plan}
            plans={props.plan}
            bill={bill}
            setBill={setBill}
            pay={payBills}
            loading={loading}
          />
        </Fragment>
      )}
      {contextHolder}
    </motion.div>
  );
};

export default ChoosePlans;
