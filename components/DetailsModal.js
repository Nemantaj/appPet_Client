import {
  Descriptions,
  Divider,
  Typography,
  Input,
  Button,
  Spin,
  message,
  Modal,
  Card,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useInput from "../hooks/useInputPrice";
import { useSelector } from "react-redux";
import styles from "../pages/home/index.module.css";

const DetailsModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/plan-details/" + props.detail._id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          setLoading(false);
          return messageApi.open({
            type: "error",
            content: "An error occured while fetching orders.",
            duration: 5,
          });
        }
        console.log(data);
        setOrders(data.payload);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return messageApi.open({
          type: "error",
          content: "An error occured while fetching orders.",
          duration: 5,
        });
      });
  }, [props.detail]);

  return (
    <Modal
      title="Details"
      open={props.open}
      footer={false}
      onCancel={props.handleCancel}
    >
      <motion.div>
        <Typography.Title level={3}>
          {props.detail.plan.planType}
        </Typography.Title>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Expires At</Typography.Text>
          <Typography.Text>
            {new Date(props.detail.plan.expiresAt).toLocaleDateString()}
          </Typography.Text>
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Renewed At</Typography.Text>
          <Typography.Text>
            {new Date(props.detail.plan.renewedAt).toLocaleDateString()}
          </Typography.Text>
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Breed</Typography.Text>
          <Typography.Text>
            {props.detail.breed.name + " | " + props.detail.breed.size.size}
          </Typography.Text>
        </div>
        {/* <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Gender</Typography.Text>
          <Typography.Text>{props.detail.gender}</Typography.Text>
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Weight</Typography.Text>
          <Typography.Text>{props.detail.weight} KG</Typography.Text>
        </div> */}

        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <div className={styles.orderHeader}>
          <Typography.Text>Cost</Typography.Text>
          <Typography.Text>
            INR{" "}
            {props.detail.plan.planType === "Subscription Plan"
              ? props.detail.breed.size.price.subscription + " / Month"
              : props.detail.breed.size.price.trial + " / Week"}
          </Typography.Text>
        </div>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
        <Card bordered={false} style={{ backgroundColor: "#F2674B" }}>
          <Typography.Title level={5} style={{ margin: 0, color: "#fff" }}>
            Doggo's name is {props.detail.name},
          </Typography.Title>
          <Divider
            style={{ marginTop: 10, marginBottom: 10, backgroundColor: "#fff" }}
          />
          <Typography.Title level={5} style={{ margin: 0, color: "#fff" }}>
            {props.detail.gender === "female" ? "She" : "He"} is{" "}
            {props.detail.age} {props.detail.ageMetric}s old and weights{" "}
            {props.detail.weight} Kg.
          </Typography.Title>
          {props.detail.medicalCondition !== "" && (
            <Fragment>
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                }}
              />
              <Typography.Title level={5} style={{ margin: 0, color: "#fff" }}>
                Medical Condition :- &nbsp; {props.detail.medicalCondition},
              </Typography.Title>
            </Fragment>
          )}
          {props.detail.vet !== "" && (
            <Fragment>
              <Divider
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                }}
              />
              <Typography.Title level={5} style={{ margin: 0, color: "#fff" }}>
                VET :- &nbsp; {props.detail.vet}.
              </Typography.Title>
            </Fragment>
          )}
        </Card>
        <Typography.Title level={3} style={{ marginTop: 50 }}>
          Payments
        </Typography.Title>
        {loading ? (
          <Spin />
        ) : (
          orders.length > 0 &&
          orders.map((doc) => {
            return (
              <Fragment>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <div className={styles.orderHeader}>
                  <Typography.Text>Date</Typography.Text>
                  <Typography.Text>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </Typography.Text>
                </div>
                <div className={styles.orderHeader}>
                  <Typography.Text>orderId</Typography.Text>
                  <Typography.Text>{doc.orderDetails.order_id}</Typography.Text>
                </div>
                <div className={styles.orderHeader}>
                  <Typography.Text>Payment</Typography.Text>
                  <Typography.Text>
                    INR {doc.orderDetails.order_amount}
                  </Typography.Text>
                </div>
              </Fragment>
            );
          })
        )}
      </motion.div>
      {contextHolder}
    </Modal>
  );
};

export default DetailsModal;
