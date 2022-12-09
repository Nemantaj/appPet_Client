import { Typography, Button, Card, Spin, Result, Tag } from "antd";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../order/index.module.css";
import Link from "next/link";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);

  const router = useRouter();
  const { order_id } = router.query;

  const apiKey = "278827ad240a6189b8e496bcdd728872";
  const Secret = "87511d1ab284f52cfe0b544556e46cbff21cde4c";

  useEffect(() => {
    if (order_id !== undefined) {
      setLoading(true);
      setError(false);
      fetch("https://app-pet-api-6jjd.vercel.app//confirm-renew/" + router.query.order_id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOrder(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          console.log(err);
        });
    }
  }, [router.query]);

  return (
    <motion.div>
      {loading && <Spin size="default" />}
      {!loading && !error && Object.keys(order).length > 0 ? (
        <Fragment>
          {order.order_status === "PAID" && (
            <Card bordered={false}>
              <Result
                status="success"
                title="Your order has been confirmed!"
                subTitle={`OrderID :- ${order.order_id}`}
                extra={[
                  <Link href="/" legacyBehavior>
                    <Button type="primary" shape="round" key="console">
                      Home
                    </Button>
                  </Link>,
                  <Link href="/auth" legacyBehavior>
                    <Button key="buy" shape="round">
                      View Profile
                    </Button>
                  </Link>,
                ]}
              />
            </Card>
          )}
          {order.order_status === "EXPIRED" && (
            <Card bordered={false}>
              <Result
                status="error"
                title="Your order has expired!"
                subTitle={`OrderID :- ${order.order_id}`}
                extra={[
                  <Link href="/" legacyBehavior>
                    <Button type="primary" shape="round" key="console">
                      Home
                    </Button>
                  </Link>,
                  <Link href="/auth" legacyBehavior>
                    <Button key="buy" shape="round">
                      View Profile
                    </Button>
                  </Link>,
                ]}
              />
            </Card>
          )}
          {order.order_status === "ACTIVE" && (
            <Card bordered={false}>
              <Result
                status="info"
                title="Your order is cuurenlty active."
                subTitle={`OrderID :- ${order.order_id}`}
                extra={[
                  <Link href="/" legacyBehavior>
                    <Button type="primary" shape="round" key="console">
                      Home
                    </Button>
                  </Link>,
                  <Link href="/auth" legacyBehavior>
                    <Button key="buy" shape="round">
                      View Profile
                    </Button>
                  </Link>,
                ]}
              />
            </Card>
          )}
        </Fragment>
      ) : (
        <Card bordered={false}>
          <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={[
              <Link href="/" legacyBehavior>
                <Button type="primary" shape="round" key="console">
                  Home
                </Button>
              </Link>,
              <Link href="/auth" legacyBehavior>
                <Button key="buy" shape="round">
                  View Profile
                </Button>
              </Link>,
            ]}
          />
        </Card>
      )}
    </motion.div>
  );
};

export default Order;
