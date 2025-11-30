const Input = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">{label}</label>
        <input
            {...props}
            className="input bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600"
        />
    </div>
);

export default Input;
