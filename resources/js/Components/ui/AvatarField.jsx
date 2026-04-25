export default function AvatarField({ value, onChange, error, resetKey }) {
    const preview = value ? URL.createObjectURL(value) : null;

    return (
        <div className="mb-5">
            <label className="block mb-2.5 text-sm font-medium">
                Avatar
            </label>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    {preview ? (
                        <Img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    )}
                </div>
                <div className="flex-1">
                    <input
                        key={resetKey}
                        type="file"
                        accept="image/jpg,image/jpeg,image/png,image/webp"
                        onChange={onChange}
                        className="block w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-slate-300 file:text-xs file:font-medium file:bg-white file:text-slate-600 hover:file:bg-slate-50 cursor-pointer"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                        JPG, PNG, WEBP — maks. 2MB
                    </p>
                </div>
            </div>
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
        </div>
    );
}