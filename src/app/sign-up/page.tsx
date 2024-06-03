"use client";
import React from "react";
import { useState } from "react";
import Step1 from "./Step1";

export default function AdminSignup() {
  const [activeStep, setActiveStep] = useState([1]);
  console.log(activeStep);
  return (
    <div className="flex flex-col gap-[40px] items-center justify-center min-h-screen bg-teal-50">
      {/* Stepper */}
      <div className="flex flex-row w-[670px] h-[60px] gap-[20px] items-center justify-center bg-teal-800 rounded-[20px]">
        {[1, 2, 3].map((step) => (
          <>
            <span
              key={step}
              className={`flex flex-row items-center justify-center w-[40px] h-[40px] rounded-full bg-teal-50 text-[20px] ${
                activeStep.includes(step) && "text-teal-600"
              }`}
            >
              {step}
            </span>
            {step !== 3 && (
              <span className="flex flex-row w-[50px] items-center border-[1px] bg-teal-50 rounded-full"></span>
            )}
          </>
        ))}
      </div>
      {/* Main form */}
      <div className="flex flex-col flex-wrap w-[670px] h-[500px] bg-teal-800 rounded-[20px] justify-center content-center gap-4">
        {(activeStep[activeStep.length - 1] === 1 && (
          <Step1 activeStep={activeStep} setActiveStep={setActiveStep} />
        )) ||
          (activeStep[activeStep.length - 1] === 2 && <h1>hola</h1>) ||
          (activeStep[activeStep.length - 1] === 3 && <h2>hola 2</h2>)}
      </div>
    </div>
  );
}
