import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Select, Input } from "antd";
import CountSteps from "../../components/steps";
import styles from "./index.module.css";
import img1 from "../../assests/1.png";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.png";
import Image from "next/image";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";

const Step1 = (props) => {
  return (
    <motion.div className={styles.step1}>
      <div className={styles.imgDiv}>
        <Image src={img1} layout="fill" objectFit="contain" />
      </div>
      <Typography.Title level={1} style={{ fontFamily: "monst" }}>
        Create a plan for your dog.
      </Typography.Title>
      <Typography.Text
        style={{ fontFamily: "monst", fontSize: "20px", color: "#173B33" }}
      >
        Let’s determine your meal plan, recommended recipes, and weekly price!
      </Typography.Text>
      <Button
        type="primary"
        style={{
          marginTop: "30px",
          width: "100px",
          height: "50px",
          backgroundColor: "#F1B342",
          fontWeight: "bolder",
          fontFamily: "monst",
        }}
        shape="round"
        size="large"
        onClick={() => dispatch(planActions.setStep(35))}
      >
        Create
      </Button>
    </motion.div>
  );
};

export default Step1;
