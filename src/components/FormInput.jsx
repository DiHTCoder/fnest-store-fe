const FormInput = ({ name, label, type, defaultValue, size, placeholder, onchange, value }) => {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text capitalize text-sm">{label}</span>
            </label>
            <input
                value={value}
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`input input-bordered ${size} text-sm`}
                onChange={onchange}
            />
        </div>
    );
};

export default FormInput;
