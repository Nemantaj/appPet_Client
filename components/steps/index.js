import { Steps, Popover, Typography } from "antd";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import React from "react";
import styles from "./index.module.css";

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const description = "You can hover on the dot.";

const CountSteps = (props) => {
  return (
    <ProgressBar
      percent={props.current}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    >
      <Step>
        {({ accomplished, index }) => (
          <div className={accomplished ? styles.stepA : styles.step}>
            <Typography.Text className={styles.stepText}>1/4</Typography.Text>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className={accomplished ? styles.stepA : styles.step}>
            <Typography.Text className={styles.stepText}>2/4</Typography.Text>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className={accomplished ? styles.stepA : styles.step}>
            <Typography.Text className={styles.stepText}>3/4</Typography.Text>
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className={accomplished ? styles.stepA : styles.step}>
            <Typography.Text className={styles.stepText}>4/4</Typography.Text>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default CountSteps;
