"use client";

import { useEffect } from "react";
import useGoogleCallback from "@/hooks/useGoogleCallback";

export default function CallbackPage() {
    const { login } = useGoogleCallback();

    useEffect(() => {
        login()
    }, []);

    return <div className="h-screen flex w-full items-center justify-center text-center oapcity-60 animate-pulse flex-col gap-3 font-semibold text-brand">
        <div><img src="assets/images/spinning-circles.svg" width="30" height={30} /></div>
        PropertyXg
    </div>;
}
