import {
  Card,
  Badge,
  Typography,
  Checkbox,
  Row,
  Col,
  Button,
  Divider,
} from "antd";
import styles from "./index.module.css";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";
import img1 from "../../assests/4.webp";

const PlansCard = (props) => {
  return (
    <Badge.Ribbon text="Fresh">
      <Card
        title={`Dog’s Meal Plan | ${props.plans.name} | ${props.plans.size.size}`}
        hoverable
        bordered={false}
        style={{ backgroundColor: "#FFF3E1" }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col md={24} lg={24} xl={12} style={{ marginTop: "5px" }}>
            <Card
              className={styles.card}
              bordered={true}
              style={{ position: "relative" }}
            >
              <div className={styles.trial}>
                <div className={styles.plansHeader}>
                  <Button
                    style={{ width: "90px", height: "60px" }}
                    shape="round"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      props.setPlan("trial");
                      props.setBill({
                        ...props.bill,
                        plan: {
                          name: "Trial Plan",
                          price: props.plans.size.price.trial,
                          size: props.plans.size.size,
                        },
                      });
                    }}
                    type={props.plan === "trial" ? "primary" : "dashed"}
                  />
                  <div className={styles.plansHeaderSub}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Trial Plan
                    </Typography.Title>
                    <Typography.Title
                      level={3}
                      style={{ margin: 0, color: "#F1B342" }}
                    >
                      &#8377;
                      {props.plans.size.price.trial}/ month
                    </Typography.Title>
                  </div>
                </div>
                <Divider />
                <div className={styles.plansBody}>
                  <Typography.Text>
                    This first box will contain 2 weeks’ worth of daily meals
                    for Dog. We’ve selected three fresh, balanced recipes (but
                    you’re welcome to mix it up!) and we’ll send them precisely
                    pre-portioned for a 50 lb, 4 year old German Shepherd Dog.
                  </Typography.Text>
                </div>
              </div>
              <div className={styles.imgDivCard}>
                <Image src={img1} layout="fill" objectFit="contain" />
              </div>
            </Card>
          </Col>
          <Col md={24} lg={24} xl={12}>
            <Card
              bordered={true}
              className={styles.card2}
              style={{ marginTop: "5px", position: "relative" }}
            >
              <div className={styles.trial}>
                <div className={styles.plansHeader}>
                  <Button
                    type={props.plan === "subs" ? "primary" : "dashed"}
                    style={{ width: "90px", height: "60px" }}
                    shape="round"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      props.setPlan("subs");
                      props.setBill({
                        ...props.bill,
                        plan: {
                          name: "Subscription Plan",
                          price: props.plans.size.price.subscription,
                          size: props.plans.size.size,
                        },
                      });
                    }}
                  />
                  <div className={styles.plansHeaderSub}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      Subscription Plan
                    </Typography.Title>
                    <Typography.Title
                      level={3}
                      style={{ margin: 0, color: "#F1B342" }}
                    >
                      &#8377;{props.plans.size.price.subscription} / month
                    </Typography.Title>
                  </div>
                </div>
                <Divider />
                <div className={styles.plansBody}>
                  <Typography.Text>
                    This first box will contain 2 weeks’ worth of daily meals
                    for Dog. We’ve selected three fresh, balanced recipes (but
                    you’re welcome to mix it up!) and we’ll send them precisely
                    pre-portioned for a 50 lb, 4 year old German Shepherd Dog.
                  </Typography.Text>
                </div>
              </div>
              <div className={styles.imgDivCard}>
                <Image src={img1} layout="fill" objectFit="contain" />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Badge.Ribbon>
  );
};

export default PlansCard;
