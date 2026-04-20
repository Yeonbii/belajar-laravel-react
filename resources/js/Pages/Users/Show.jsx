// import Layout from "./Layout";
import Layout from "@/Layout";
import { Head } from "@inertiajs/react";

export default function Welcome({ user }) {
    return (
        // <Layout>
        //   <Head title="Welcome" />
        //   <h1>Welcome</h1>
        //   <p>Hello <span className="text-blue-500 font-semibold ">{user.name}</span>, welcome to your first Inertia app!</p>
        // </Layout>

        // Karena Component Head agak bikin risih jadi mending dikeluarkan begini wkkkk
        <>
            <Head title="Welcome" />
            <Layout>
                <h1>Welcome</h1>
                <p>
                    Hello <span className="text-blue-500 font-semibold italic">{user.name}</span>, welcome to your first Inertia app!
                </p>
            </Layout>
        </>
    );
}
