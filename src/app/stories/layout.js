export const runtime = "edge";
export const viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

import StoriesNavBar from "@/components/StoriesNavBar";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/SpotLight";
import Image from "next/image";

export default function StoriesLayout({ children }) {
  const d = new Date();
  const currentYear = d.getFullYear();

  return (
    <div className={"w-svh h-svh bg-black"}>
      <StoriesNavBar />
      <Spotlight
        className="-top-40 left-0 z-20 md:-top-20 md:left-60"
        fill="white"
      />
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={5}
        className="absolute left-0 top-0 z-0 h-full w-full"
        particleColor="#FFFFFF"
      />
      <div className="bg-grid-small-zinc-50/[0.1] w-full bg-black antialiased">
        <div className="w-svh mx-auto flex h-auto max-w-4xl flex-col rounded-md p-4 text-zinc-100  md:justify-start md:p-0">
          {children}
        </div>
      </div>

      <div className="mx-auto mt-32 flex max-w-4xl flex-col border-t-[0.5px] border-t-zinc-400 border-opacity-50 text-zinc-100">
        <div className="mx-0 flex flex-col justify-start gap-10 p-12 px-4 md:mx-auto md:w-full md:max-w-4xl md:flex-row md:justify-between  md:px-10 md:py-12">
          <Image
            src="/logo/ben2_logo_white.png"
            className="invisible md:visible"
            alt="B Squared Logo"
            sizes="30px"
            style={{
              width: "75px",
              height: "75px",
            }}
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <p className="text-left text-3xl font-medium md:text-right md:text-lg">
              Ben
            </p>
            <p className="text-left text-sm font-thin md:text-right">
              Bernardus Bernard
              <br />
              b.bernardus@redliber.com
            </p>
          </div>
        </div>
        <div className="mx-auto mb-4 font-thin md:mb-10">
          <footer>
            {" "}
            <small>
              &copy; Copyright {currentYear}, Bernardus Bernard. All Rights
              Reserved.
            </small>{" "}
          </footer>
        </div>
      </div>
    </div>
  );
}
