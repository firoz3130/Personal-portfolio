import React, { useState } from "react";
import emailjs from 'emailjs-com';
import FormField from "../FormField";
import SuccessAlert from "../SuccessAlert";


const ScheduleCallModal = ({ isOpen, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_FAZ, event.target, process.env.NEXT_PUBLIC_EMAILJS_USERID)
      .then((result) => {
        console.log(result.text);
        setShowAlert(true);
        const autoReplyTemplateParams = {
          to_name: event.target.from_name.value,
          user_email: event.target.to_name.value,
        };
        emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_CLIENT, autoReplyTemplateParams, process.env.NEXT_PUBLIC_EMAILJS_USERID)
          .then((result) => {
            console.log("Auto-reply sent:", result.text);
          }, (error) => {
            console.log("Auto-reply error:", error.text);
          });
      }, (error) => {
        console.log(error.text);
        alert("An error occurred, please try again.");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-black p-6 rounded-lg w-11/12 max-w-lg text-center">
        <span className="absolute top-3 right-3 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4">Schedule a call with us to discuss your project requirements.</h2>
        <form id="scheduleCallForm" className="space-y-4" onSubmit={handleFormSubmit}>
          <FormField label="Name:" type="text" id="from_name" name="from_name" required={true} />
          <FormField label="Email:" type="email" id="to_name" name="to_name" required={true} />
          <FormField label="Preferred Date:" type="date" id="date" name="date" required={true} />
          <FormField label="Preferred Time:" type="time" id="time" name="time" required={true} />
          <FormField label="Message:" type="textarea" id="message" name="message" />

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
        </form>

        {showAlert && (
          <SuccessAlert onClose={() => {
            setShowAlert(false);
            onClose();
          }} />
        )}
      </div>
    </div>
  );
};

export default ScheduleCallModal;
