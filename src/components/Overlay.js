import {SparklesCore} from "@/components/ui/sparkles";

export default function Overlay() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}} className="z-50 w-full h-full text-purple-50">
            <a href="https://pmnd.rs/" className="absolute bottom-[5%] left-[5%] font-light text-xs md:text-lg ">
                Contact me at
                <br/>
                <span className="font-medium text-sm md:text-xl ">
                b.bernardus@redliber.com
                </span>
            </a>
            <div className="invisible md:visible absolute bottom-[5%] right-[5%]">
                <p className="font-extralight text-lg text-purple-50">
                    Contents to be added
                </p>
            </div>
            <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={2}
                particleDensity={10}
                className="w-full h-full z-40"
                particleColor="#FFFFFF"
            />
        </div>
    )
}