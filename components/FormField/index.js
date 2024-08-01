const FormField = ({ label, type, id, name, required = false }) => {
    return (
      <div>
        <label htmlFor={id} className="block text-left">{label}</label>
        {type === 'textarea' ? (
          <textarea id={id} name={name} className="w-full px-4 py-2 border rounded-md" required={required}></textarea>
        ) : (
          <input type={type} id={id} name={name} className="w-full px-4 py-2 border rounded-md" required={required} />
        )}
      </div>
    );
  };
  
  export default FormField;