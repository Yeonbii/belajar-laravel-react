import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Alert from "@/Components/UI/Alert";
import AvatarField from "@/Components/UI/Form/AvatarField";
import InputField from "@/Components/UI/Form/InputField";
import PasswordField from "@/Components/UI/Form/PasswordField";

export default function UserForm() {
    const { flash } = usePage().props;
    const [submitCount, setSubmitCount] = useState(0);
    const [fileResetKey, setFileResetKey] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar: null,
    });

    const errorMessage =
        Object.keys(errors).length > 0
            ? "Ada inputan wajib yang belum diisi atau tidak valid."
            : null;

    function handleSubmit(e) {
        e.preventDefault();
        post("/dashboard/users", {
            forceFormData: true, // ← wajib ada kalau form punya file
            onSuccess: () => {
                reset();
                setFileResetKey((k) => k + 1); // ← naikkan supaya input file dibuat ulang
            },
            onFinish: () => setSubmitCount((c) => c + 1),
        });
    }

    return (
        <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Create User
            </h2>

            <Alert
                type="success"
                message={flash.success}
                submitCount={submitCount}
            />
            <Alert
                type="error"
                message={errorMessage}
                submitCount={submitCount}
            />

            <div className="p-4 border-2 border-slate-200 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <AvatarField
                        value={data.avatar}
                        onChange={(e) => setData("avatar", e.target.files[0])}
                        error={errors.avatar}
                        resetKey={fileResetKey}
                    />
                    <InputField
                        label="Name"
                        id="name"
                        placeholder="Your Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        required
                    />
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                        required
                    />
                    <PasswordField
                        label="Password"
                        id="password"
                        placeholder="Min. 8 karakter"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        required
                    />
                    <PasswordField
                        label="Confirm Password"
                        id="password_confirmation"
                        placeholder="Ulangi password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white bg-primary border border-transparent hover:bg-primary-dark focus:outline-2 focus:outline-offset-2 focus:outline-primary-dark shadow-xs font-bold rounded-lg text-xs px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
}