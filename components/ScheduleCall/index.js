import React from "react";
import emailjs from 'emailjs-com';

const ScheduleCallModal = ({ isOpen, onClose }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Send email to yourself with form data
    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_FAZ, event.target,process.env.NEXT_PUBLIC_EMAILJS_USERID)
      .then((result) => {
          console.log(result.text);
          alert("Thank you very much. We will contact you soon.");

          // Send acknowledgment email to the user
          const autoReplyTemplateParams = {
            to_name: event.target.from_name.value,
            user_email: event.target.to_name.value,
          };
          console.log(autoReplyTemplateParams);
          emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_FOR_CLIENT, autoReplyTemplateParams, process.env.NEXT_PUBLIC_EMAILJS_USERID)
            .then((result) => {
                console.log("Auto-reply sent:", result.text);
            }, (error) => {
                console.log("Auto-reply error:", error.text);
            });

          onClose();
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
          <div>
            <label htmlFor="from_name" className="block text-left">Name:</label>
            <input type="text" id="from_name" name="from_name" className="w-full px-4 py-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="to_name" className="block text-left">Email:</label>
            <input type="email" id="to_name" name="to_name" className="w-full px-4 py-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="date" className="block text-left">Preferred Date:</label>
            <input type="date" id="date" name="date" className="w-full px-4 py-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="time" className="block text-left">Preferred Time:</label>
            <input type="time" id="time" name="time" className="w-full px-4 py-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-left">Message:</label>
            <textarea id="message" name="message" className="w-full px-4 py-2 border rounded-md"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCallModal;
