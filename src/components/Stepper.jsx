import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import "./css/Tracker.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AlertMessage } from "./AlertMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Order Placed",
    "Order Confirmed",
    "Order Prepared",
    "Out for Delivery",
    "Completed",
  ];
}

export default function VerticalLinearStepper({ orderId }) {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [orderData, setOrderData] = useState(null);

  const getOrderData = async () => {
    const data = await axios.get(
      `/api/order/${orderId}`
    );
    setOrderData({ ...data.data.data });
  };

  useEffect(() => {
    console.log("order data da status", orderData?.status);
    if (orderData?.status === 4) {
      setTimeout(() => {
        localStorage.setItem("orderId", null);
        history.push("/");
      }, 3000);
    } else {
      getOrderData();
    }
  }, [orderData]);

  const iconArr = [
    <AssignmentTurnedInIcon />,
    <DoneAllIcon />,
    <FastfoodIcon />,
    <LocalShippingIcon />,
    <EmojiEmotionsIcon />,
  ];

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <div className="container">
              <div
                className="container-left"
                style={
                  index === orderData?.status
                    ? {
                        color: "green",
                        fontSize: "1.7rem",
                        transition: "all 0.5s ease-in-out",
                      }
                    : { color: "grey" }
                }
              >
                {iconArr[index]}
              </div>
              <div className="container-right">
                <Typography
                  className={
                    index === orderData?.status ? "label-green" : "label-grey"
                  }
                >
                  {label}
                </Typography>
                <Typography className="time">
                  {orderData?.status === index
                    ? new Date(orderData?.createdAt).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    : null}
                </Typography>
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
      {orderData?.status === 4 ? (
        <AlertMessage message="Thank you for ordering with us😋" />
      ) : null}
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
