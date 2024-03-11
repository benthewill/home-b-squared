import ThreeScene from "@/components/ThreeScene";
import Overlay from "@/components/Overlay";
import Image from 'next/image'


export default function Home() {
    return (
        <main className="h-svh">
            {/*<p className="absolute z-50 text-9xl font-black">Welcome to b squared</p>*/}
            <Overlay/>
            <div className=" w-1/4 h-full flex flex-col justify-center align-middle content-center absolute z-50 left-[5%]">
                <p className="font-black text-5xl w-full">
                    Writer
                    <br/>
                    Graphic Designer
                    <br/>
                    3D Modeler
                    <br/>
                    Game Developer
                    <br/>
                    Director
                    <br/>
                    <span className="bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-300 text-transparent bg-clip-text">
                        Creator
                    </span>
                </p>
            </div>
            <div className="w-1/4 h-full flex flex-col justify-center align-middle content-center absolute z-50 right-[5%]">
                <p className="font-extrabold text-5xl w-full text-right">
                    Bernardus<br/>
                    Bernard
                </p>
            </div>
            <ThreeScene/>
            <Image
                src="/ben2_logo_white.png"
                width={50}
                height={50}
                className="absolute top-[5%] left-[5%]"
            />
        </main>
    );
}
