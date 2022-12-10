import {
  Divider,
  Typography,
  message,
  Card,
  List,
  VirtualList,
  Tag,
  Button,
  Spin,
} from "antd";
import { motion } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import RenewModal from "../../components/RenewModal";
import { PlusOutlined } from "@ant-design/icons";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";
import Head from "next/head";
import DetailsModal from "../../components/DetailsModal";

const Home = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({ plan: {}, coupons: [] });
  const [exp, setExp] = useState(null);
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isAuth) {
      router.push("/auth");
    }
  }, [isAuth]);

  useEffect(() => {
    if (userId && token) {
      loadUserData();
      loadTours();
    }
  }, [userId]);

  const loadTours = () => {
    setLoading(true);
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/get-orders/" + userId, {
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
        setOrders(data.orders);
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
  };

  const loadUserData = () => {
    fetch("https://app-pet-api-6jjd-fhyky08wd-nemantaj.vercel.app/user/" + userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          return messageApi.open({
            type: "error",
            content: "An error occured while fetching user.",
            duration: 5,
          });
        }
        setUser(data.payload);
      })
      .catch((err) => {
        return messageApi.open({
          type: "error",
          content: "An error occured while fetching user.",
          duration: 5,
        });
      });
  };

  const newPlan = () => {
    dispatch(planActions.setStep(0));
    dispatch(
      planActions.setPlans({
        user: {
          email: user.email,
          address: user.address,
          pincode: user.pincode.toString(),
          mobile: user.mobile.toString(),
          name: user.name,
        },
        dog: [],
      })
    );
    router.push("/create");
  };

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={styles.orderHeader}>
          <Typography.Title>My Plans</Typography.Title>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#F2674B" }}
            icon={<PlusOutlined />}
            onClick={newPlan}
          >
            Plan
          </Button>
        </div>
        <Divider />
        <motion.div className={styles.con}>
          {loading ? (
            <Spin />
          ) : (
            orders.length > 0 &&
            orders.map((doc) => {
              let exp = new Date(doc.createdAt);
              if (doc.plan.type !== "Subscription Plan") {
                exp.setDate(exp.getDate() + 8);
              } else {
                exp.setDate(exp.getDate() + 31);
              }
              return (
                <Card
                  bordered={false}
                  style={{
                    maxWidth: "550px",
                    width: "100%",
                    padding: 0,
                    backgroundColor: "#F2674B",
                  }}
                  hoverable={true}
                  actions={[
                    <Button
                      shape="round"
                      onClick={() => {
                        setDetail(doc);
                        setOpen(true);
                      }}
                    >
                      Details
                    </Button>,

                    <Button
                      type="primary"
                      style={{ backgroundColor: "#173B33" }}
                      shape="round"
                      disabled={
                        doc.breed !== null &&
                        doc.breed.size.hasOwnProperty("price")
                          ? false
                          : true
                      }
                      onClick={() => {
                        setBill({
                          coupons: [],
                          plan: {
                            name: "Subscription Plan",
                            price: doc.breed.size.price.subscription,
                            size: doc.breed.size.size,
                          },
                        });
                        setExp(doc.plan.expiresAt);
                        setPlan(doc);
                        showModal();
                      }}
                    >
                      {doc.plan.planType === "Subscription Plan"
                        ? "Renew"
                        : "Buy Subscription"}
                    </Button>,
                  ]}
                >
                  <motion.div className={styles.listItem}>
                    <div className={styles.orderHeader}>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, color: "#fff" }}
                      >
                        {doc.plan.planType}
                      </Typography.Title>
                      {/* <Tag color="magenta">
                        INR {doc.orderDetails.order_amount}
                      </Tag> */}
                    </div>
                    <Divider
                      style={{
                        padding: 0,
                        marginTop: 10,
                        backgroundColor: "#fff",
                      }}
                    />
                    <div className={styles.orderHeader}>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, color: "#fff" }}
                      >
                        EXPIRES
                      </Typography.Title>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0, color: "#fff" }}
                      >
                        {new Date(doc.plan.expiresAt).toLocaleDateString()}
                      </Typography.Title>
                    </div>
                  </motion.div>
                </Card>
              );
            })
          )}
        </motion.div>
        {contextHolder}
      </motion.div>
      {exp !== null && plan !== null && (
        <RenewModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          bill={bill}
          setBill={setBill}
          exp={exp}
          plan={plan}
        />
      )}
      {detail !== null && (
        <DetailsModal
          open={open}
          handleCancel={() => setOpen(false)}
          detail={detail}
        />
      )}
    </Fragment>
  );
};

export default Home;
