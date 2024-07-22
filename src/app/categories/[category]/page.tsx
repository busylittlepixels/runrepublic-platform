import { Logo } from "./../../_components/universal/logo";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Category({ params }: { params: { category?: string; categorySlug?: string }}) {
    const catSlug = params?.category ? params?.category : 'latest';
    console.log(params);
    return(
    <React.Fragment>
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-muted/90 px-4 py-2 backdrop-blur lg:h-[60px] lg:px-6">
            <Logo />
            <div className="flex gap-2">
                <Link href="/login">
                    <Button variant="outline" className="w-full">
                    Login
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                </Link>
            </div>
        </header>
        <main className="flex-1">
            <h1>I&apos;m a category single page ex:  - {catSlug? catSlug : 'Nutsacks'}</h1>
        </main>
    </React.Fragment>
    ); 
};