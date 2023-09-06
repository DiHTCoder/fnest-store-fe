const FormInput = ({ name, label, type, defaultValue, size, placeholder }) => {
    return (
        <div className="form-control">
            <label htmlFor={name} className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`input input-bordered input-primary ${size}`}
            />
        </div>
    );
};

export default FormInput;
