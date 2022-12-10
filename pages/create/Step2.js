import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Typography, Select, Input, Divider, Option } from "antd";
import CountSteps from "../../components/steps";
import styles from "./index.module.css";
import img1 from "../../assests/1.png";
import img2 from "../../assests/2.jpg";
import img3 from "../../assests/3.png";
import Image from "next/image";
import useInput from "../../hooks/useInputPrice";
import { dispatch } from "../../store";
import { planActions } from "../../store/slices/stepSlice";
import { useSelector } from "react-redux";

const MButton = motion(Button);

const Step2 = (props) => {
  const [gender, setGender] = useState("female");
  const [metric, setMetric] = useState("year");
  const [breed, setBreed] = useState("");
  const [condition, setCondition] = useState("");
  const plans = useSelector((state) => state.plan.plans);

  useEffect(() => {
    if (Object.keys(plans).length > 0 && plans.dog.length > 0) {
      setName(plans.dog[0].name);
      setAge(plans.dog[0].age);
      setWeight(plans.dog[0].weight);
      setBreed(plans.dog[0].breed);
      setGender(plans.dog[0].gender);
      setMetric(plans.dog[0].ageMetric);
    }
  }, []);

  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: nameClear,
    setInput: setName,
  } = useInput((value) => value !== "", "");

  const {
    inputValue: ageValue,
    error: ageError,
    isValid: ageValid,
    inputHandler: ageHandler,
    blurHandler: ageBlur,
    clearInput: ageClear,
    setInput: setAge,
  } = useInput((value) => value !== "", "");

  const {
    inputValue: weightValue,
    error: weightError,
    isValid: weightValid,
    inputHandler: weightHandler,
    blurHandler: weightBlur,
    clearInput: weightClear,
    setInput: setWeight,
  } = useInput((value) => value !== "", "");

  const {
    inputValue: vetValue,
    error: vetError,
    isValid: vetValid,
    inputHandler: vetHandler,
    blurHandler: vetBlur,
    clearInput: vetClear,
    setInput: setVet,
  } = useInput((value) => value !== "", "");

  return (
    <motion.div
      className={styles.step2}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.imgDivStep2}>
        <Image src={img2} layout="fill" objectFit="contain" />
      </div>
      <Typography.Text style={{ fontFamily: "monst" }} italic>
        Time to tell us about Dog (the best part!) This will only take ~2 mins.
      </Typography.Text>
      <motion.div className={`${styles.dogStep1} ${styles.wrap}`}>
        <Typography.Text style={{ fontSize: "20px", marginBottom: 5 }}>
          Your dog name is:-
        </Typography.Text>
        <div className={nameError ? styles.inputsError : styles.inputs}>
          <Input
            placeholder="name"
            size="large"
            style={{
              width: 150,
              fontSize: "20px",
              margin: 0,
              padding: 5,
              textAlign: "center",
            }}
            type="text"
            bordered={false}
            value={nameValue}
            onChange={nameHandler}
            onBlur={nameBlur}
          />
        </div>
      </motion.div>

      {nameValid && (
        <motion.div
          className={`${styles.dogStep1} ${styles.wrap}`}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={gender === "" ? styles.inputsError : styles.inputs}>
            <Select
              style={{ width: 90 }}
              bordered={false}
              options={[
                { value: "female", label: "She" },
                { value: "male", label: "He" },
              ]}
              size="large"
              value={gender}
              onChange={(value) => setGender(value)}
            ></Select>
          </div>
          <Typography.Text style={{ fontSize: "20px", marginBottom: 5 }}>
            is
          </Typography.Text>
          <div className={ageError ? styles.inputsError : styles.inputs}>
            <Input
              placeholder="age"
              size="large"
              style={{
                width: 65,
                fontSize: "20px",
                margin: 0,
                padding: 5,
                textAlign: "center",
              }}
              type="number"
              bordered={false}
              value={ageValue}
              onChange={ageHandler}
              onBlur={ageBlur}
            />
          </div>
          <div className={metric === "" ? styles.inputsError : styles.inputs}>
            <Select
              value={metric}
              onChange={(value) => setMetric(value)}
              style={{ width: 100 }}
              options={[
                { value: "year", label: "Years" },
                { value: "month", label: "Months" },
                { value: "week", label: "Weeks" },
              ]}
              bordered={false}
              size="large"
            ></Select>
          </div>
          <Typography.Text style={{ fontSize: "20px", marginBottom: 5 }}>
            old,
          </Typography.Text>
        </motion.div>
      )}

      {nameValid && ageValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={weightError ? styles.inputs3Error : styles.inputs3}>
            <Typography.Text style={{ fontSize: "20px" }}>
              Weight
            </Typography.Text>
            <Input
              placeholder="weight"
              size="large"
              style={{
                fontSize: "20px",
                margin: 0,
                padding: 5,
                textAlign: "center",
                width: "100px",
              }}
              type="number"
              bordered={false}
              value={weightValue}
              onChange={weightHandler}
              onBlur={weightBlur}
            />
          </div>
        </motion.div>
      )}
      {nameValid && ageValid && weightValid && (
        <motion.div
          className={styles.dogStep1}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={breed === "" ? styles.inputs3Error : styles.inputs3}>
            <Typography.Text style={{ fontSize: "20px" }}>
              Breed
            </Typography.Text>
            <Select
              defaultValue="breed"
              bordered={false}
              options={
                props.breeds.length > 0 &&
                props.breeds.map((doc) => {
                  return { value: doc._id, label: doc.name };
                })
              }
              size="large"
              value={breed}
              onChange={(value) => setBreed(value)}
              style={{minWidth: "150px"}}
            ></Select>
          </div>
        </motion.div>
      )}
      {nameValid &&
        ageValid &&
        weightValid &&
        (breed !== "" || breed !== "select") && (
          <motion.div
            className={styles.dogStep1}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div
              className={
                condition === "" ? styles.inputs3Error : styles.inputs3
              }
            >
              <Typography.Text style={{ fontSize: "20px" }}>
                Condition
              </Typography.Text>{" "}
              <Select
                defaultValue="condition"
                options={[
                  { value: "skinny", label: "Skinny" },
                  { value: "good", label: "Just Right" },
                  { value: "round", label: "Great" },
                  { value: "fat", label: "Chunky" },
                ]}
                bordered={false}
                size="large"
                value={condition}
                onChange={(value) => setCondition(value)}
                style={{minWidth: "150px"}}
              ></Select>
            </div>
          </motion.div>
        )}
      {nameValid &&
        ageValid &&
        weightValid &&
        (breed !== "" || breed !== "select") && (
          <motion.div
            className={styles.dogStep1}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className={vetError ? styles.inputs3Error : styles.inputs3}>
              <Typography.Text style={{ fontSize: "20px" }}>
                VET
              </Typography.Text>{" "}
              <Input
                placeholder="Vet"
                size="large"
                style={{
                  fontSize: "20px",
                  margin: 0,
                  padding: 5,
                  textAlign: "center",
                  width: "100px",
                }}
                bordered={false}
                value={vetValue}
                onChange={vetHandler}
                onBlur={vetBlur}
              />
            </div>
          </motion.div>
        )}
      {nameValid &&
        ageValid &&
        metric !== "" &&
        gender !== "" &&
        weightValid &&
        breed !== "" && (
          <MButton
            type="primary"
            style={{
              marginTop: "40px",

              height: "50px",
              backgroundColor: "#F1B342",
              fontWeight: "bolder",
              fontFamily: "monst",
            }}
            shape="round"
            size="large"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => {
              const copy = {
                ...plans,
                dog: [
                  {
                    name: nameValue,
                    age: ageValue,
                    weight: weightValue,
                    gender: gender,
                    breed: breed,
                    condition: condition,
                    ageMetric: metric,
                    vet: vetValue,
                  },
                ],
              };
              dispatch(planActions.setPlans(copy));
              dispatch(planActions.setStep(70));
            }}
          >
            Continue
          </MButton>
        )}
    </motion.div>
  );
};

export default Step2;
