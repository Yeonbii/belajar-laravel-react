import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputField from "@/Components/ui/InputField";
import PasswordField from "@/Components/ui/PasswordField";
import Alert from "@/Components/ui/Alert";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [submitCount, setSubmitCount] = useState(0);
    const { flash } = usePage().props;

    function handleSubmit(e) {
        e.preventDefault();
        post("/login", {
            onError: () => reset("password"),
            onFinish: () => setSubmitCount((c) => c + 1),
        });
    }

    return (
        <>
            <Head title="Login" />
            <GuestLayout>
                <Alert
                    type="error"
                    message={flash.error}
                    submitCount={submitCount}
                />

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />
                    <PasswordField
                        label="Password"
                        id="password"
                        placeholder="Min. 8 karakter"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="text-white bg-primary border border-transparent hover:bg-primary-dark focus:outline-2 focus:outline-offset-2 focus:outline-primary-dark shadow-xs font-bold rounded-lg text-xs px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? "Memproses..." : "Login"}
                    </button>
                </form>
            </GuestLayout>
        </>
    );
}