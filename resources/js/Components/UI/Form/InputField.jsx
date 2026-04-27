export default function InputField({
    label,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
}) {
    return (
        <div className="mb-5">
            <label htmlFor={id} className="block mb-2.5 text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`border-2 bg-slate-50 text-sm rounded block w-full px-3 py-2.5 shadow-xs focus:outline-primary ${
                    error ? "border-red-400" : "border-slate-300"
                }`}
                placeholder={placeholder}
                // ← tidak pakai required di sini, validasi sepenuhnya dari Laravel
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
}