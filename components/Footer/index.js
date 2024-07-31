import React, { useState } from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";
import ScheduleCallModal from "../../components/ScheduleCall";

const Footer = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-2xl font-bold">Contact.</h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
              LET&apos;S WORK
            </h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
              TOGETHER
            </h1>
            <Button type="primary" onClick={openModal}>Schedule a call</Button>
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-sm font-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
        Copyright ©️ &nbsp;   
        <Link href="http://www.github.com/firoz3130">
          <a className="underline underline-offset-1">Firos K</a>
        </Link> &nbsp;®️ 
      </h1>
      <ScheduleCallModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Footer;
