import { motion } from "framer-motion";
import { Typography, Button, Card, Divider } from "antd";
import styles from "./index.module.css";

const NoPincode = (props) => {
  return (
    <motion.div className={styles.noPincode}>
      <Card bordered={false} hoverable={true}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Sorry, your pincode is not deliverable at the moment. We will get back
          to you soon.
        </Typography.Title>
        <Divider />
        <div className={styles.pinButton}>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#F2674B" }}
          >
            Back to home
          </Button>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#4B277E" }}
          >
            Login
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default NoPincode;
