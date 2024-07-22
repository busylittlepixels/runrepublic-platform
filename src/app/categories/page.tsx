import { Logo } from "./../_components/universal/logo";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";


export default async function CategoryIndex({ params }: { params: { cateogory?: string; categorySlug?: string }}) {
    const catSlug = params?.categorySlug ? params?.categorySlug : 'latest';

    return(
        <React.Fragment>
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-muted/90 px-4 py-2 backdrop-blur lg:h-[60px] lg:px-6">
          <Logo />
          <div>
         
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
         
        </div>
        </header>
        <main className="flex-1">
        <h1>I&apos;m a categories index - {catSlug? catSlug : 'Asshole'}</h1>

        <Link href="/categories/kertslerrgs">
            Tesht
        </Link>
        </main>
    </React.Fragment>
  );
}
