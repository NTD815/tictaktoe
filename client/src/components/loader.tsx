"use client";

import Image from "next/image";

export default function Loader() {
    return (
        <div className="w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
            <Image src="Spinner.svg" alt="spinner" width={100} height={100}></Image>
        </div>
    );
}