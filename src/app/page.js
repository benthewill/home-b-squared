import ThreeScene from "@/components/ThreeScene";
import Overlay from "@/components/Overlay";
import Image from "next/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import PopUp from "@/components/PopUp";
import BSquaredLogo from "@/components/BSquaredLogo";

export default function Home() {
  const professionItems = [
    "Writer",
    "Graphic Designer",
    "3D Modeler",
    "Game Dev",
    "Director",
  ];

  return (
    <main className="h-svh w-svw">
      {/*<p className="absolute z-50 text-9xl font-black">Welcome to b squared</p>*/}
      <Overlay />
      <div className="max-w-1/3 invisible absolute left-[5%] z-50 flex h-full w-auto flex-col content-center justify-center align-middle md:visible">
        {professionItems.map((item, index) => {
          return (
            <p key={item} className="w-full text-4xl font-bold text-zinc-50">
              {item}
            </p>
          );
        })}
      </div>
      <div className="invisible absolute right-[5%] z-50 flex h-full w-1/4 flex-col content-center justify-center align-middle md:visible">
        <p className="w-full text-right text-7xl font-black tracking-wide text-zinc-50">
          Bernardus
          <br />
          Bernard
        </p>
      </div>
      <ThreeScene />
      <div className="absolute left-[5%] top-[5%] z-50 h-[20px] w-[20px]   md:h-[50px] md:w-[50px]">
        <BSquaredLogo />
      </div>
      <div className="absolute right-[5%] top-[5%] z-50">
        <PopUp />
      </div>
    </main>
  );
}
