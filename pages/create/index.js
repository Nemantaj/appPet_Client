import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Select, Input } from "antd";
import CountSteps from "../../components/steps";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import img1 from "../../assests/1.png";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.png";
import Image from "next/image";
import Script from "next/script";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import ChoosePlans from "../../components/plans/ChoosePlans";
import NoPincode from "../../components/plans/NoPincode";
import Head from "next/head";

const MButton = motion(Button);

const Create = () => {
  const current = useSelector((state) => state.plan.step);
  const plans = useSelector((state) => state.plan.plans);
  const [updatedPlans, setUpdatedPlans] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPincode, setIsPincode] = useState(false);
  const [plan, setPlan] = useState({});
  const [pet, setPet] = useState([]);

  useEffect(() => {
    loadBreeds();
  }, []);

  useEffect(() => {
    setUpdatedPlans(plans);
  }, [plans]);

  const loadBreeds = () => {
    fetch("https://app-pet-api-6jjd.vercel.app//get-breeds")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          console.log(data);
        }

        setBreeds(data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPlan = (user) => {
    setLoading(true);
    console.log(plans);
    fetch("https://app-pet-api-6jjd.vercel.app//create-plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedPlans, user: user }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          setLoading(false);
          return setError(true);
        }

        setIsPincode(data.isPincode);
        if (data.plan) {
          setPlan(data.plan);
          setPet(data.dog);
        }
        return setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return setError(true);
      });
  };

  return (
    <Fragment>
      <Head>
        <script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></script>
      </Head>
      <motion.div className={styles.stepDiv}>
        <CountSteps current={current} />
      </motion.div>
      {current <= 25 && <Step1 />}
      {current <= 50 && current >= 26 && <Step2 breeds={breeds} />}
      {current <= 75 && current >= 52 && (
        <Step3 createPlan={createPlan} loading={loading} />
      )}
      {current <= 100 && current >= 76 && isPincode && !loading && (
        <ChoosePlans plan={plan} pet={pet} />
      )}
      {current <= 100 && current >= 76 && !isPincode && !loading && (
        <NoPincode />
      )}
    </Fragment>
  );
};

export default Create;
