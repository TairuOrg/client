"use client";
import { useActiveStepsStore } from "@/hooks/useActiveSteps";
import PersonalInformation from "@/components/signup/PersonalInformation";
import AccountInformation from "@/components/signup/AccountInformation";
import TopBar from "@/components/dashboard/TopBar";
import Menu from "@/components/dashboard/Menu";

export default function CashierSignup() {
  const { active, current } = useActiveStepsStore();
  
  const currentStep = current();

  return (
    <div className="flex items-center">
      <div className="ml-10 items-center mr-[150px]">
        <Menu />
      </div>
      <div className="flex flex-col w-[60px] h-[200px] gap-[20px] items-center justify-center bg-teal-800 rounded-[20px] mt-10 ml-4">
        {[1, 2].map((step, index) => (
          <>
            <span
              key={index + 1}
              className={`flex flex-col items-center justify-center w-[40px] h-[40px] rounded-full bg-teal-50 text-[20px] ${
                active.includes(step) && "text-teal-600"
              }`}
            >
              {step}
            </span>
            {step !== 2 && (
              <span
                key={index}
                className="flex flex-col w-[2px] h-[50px] items-center border-[1px] bg-teal-50 rounded-full"
              ></span>
            )}
          </>
        ))}
      </div>

      <div className="flex flex-col items-center justify-start min-h-screen ml-0 mt-5px ">
        <TopBar />
        <div className="flex flex-row mt-5 w-full px-10 items-center">
          <div className="flex flex-col w-[700px] h-[580px] bg-teal-400 rounded-[20px] justify-center items-center gap-1 shadow-lg">
            {currentStep === 1 && <PersonalInformation />}
            {currentStep === 2 && <AccountInformation />}
          </div>
        </div>
      </div>
    </div>
  );
}
