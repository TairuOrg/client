"use client";
import React, { useEffect } from "react";
import VerificationCode from "./VerificationCode";
import { useActiveStepsStore } from "@/hooks/useActiveSteps";
import PersonalInformation from "./PersonalInformation";
import { useSearchParams, useRouter } from "next/navigation";
export default function AdminSignup() {
  const { active, current } = useActiveStepsStore();
  const activeStep = current();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    if (!searchParams.has("step")) {
      router.replace("?step=1");
    }
    // If the user hardcodes the URL, and it's not the same as the current step, it will redirect to the first step
    if(searchParams.get("step") !== activeStep.toString()) {
      router.replace("?step=1");
    }
  }, [activeStep, router, searchParams]);
  const currentStep = Number(searchParams.get("step")) || 1; // if by any reason the step is not a number, it will default to 1, shouldn't fallback to this, but just in case

  return (
    <div className="flex flex-col gap-[40px] items-center justify-center min-h-screen bg-teal-50">
      {/* Stepper */}
      <div className="flex flex-row w-[670px] h-[60px] gap-[20px] items-center justify-center bg-teal-800 rounded-[20px]">
        {[1, 2, 3].map((step, index) => (
          <>
            <span
              key={index + 1}
              className={`flex flex-row items-center justify-center w-[40px] h-[40px] rounded-full bg-teal-50 text-[20px] ${
                active.includes(step) && "text-teal-600"
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
        {(currentStep === 1 && <VerificationCode />) ||
          (currentStep === 2 && <PersonalInformation />) ||
          (currentStep === 3 && <h2>hola 2</h2>)}
      </div>
    </div>
  );
}
