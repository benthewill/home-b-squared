"use client";

import { createClient } from "@/utils/client";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ScrollShadow,
  Badge,
  Link,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useSpring, animated, to } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import number from "leva/src/components/Number";
import { useGesture } from "react-use-gesture";
import { ReflectAdapter as wheelApi } from "next/dist/server/web/spec-extension/adapters/reflect";
import { Waypoint } from "react-waypoint";

export default function StoryCard({ item }) {
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  const [inView, setInview] = useState(false);
  const domTarget = useRef(null);
  const [useMisc, setMisc] = useState(item.misc ? false : true);

  const cardTransition = useSpring({
    delay: 200,
    to: {
      y: !inView ? 24 : 0,
      opacity: !inView ? 0 : 1,
    },
  });

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 8, tension: 350, friction: 40 },
    }),
  );

  useGesture(
    {
      onDrag: ({ active, offset: [x, y] }) =>
        api({ rotateX: 0, rotateY: 0, scale: active ? 1 : 1.025 }),
      // onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api({
          scale: 1.025,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } },
  );

  return (
    <Waypoint onEnter={() => setInview(true)}>
      <animated.div
        ref={domTarget}
        style={{
          transform: "perspective(600px)",
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
          ...cardTransition,
        }}
        className="min-h-unit-md m-2 max-w-sm md:m-4"
      >
        <Card
          className={`h-full bg-gradient-to-tl text-zinc-100 ${useMisc ? "border-[0.5px] border-amber-100 border-opacity-50 from-zinc-950 to-zinc-700 hover:from-zinc-800 hover:to-zinc-600" : "border-[1px] border-amber-400 border-opacity-100 from-zinc-800 to-zinc-600 shadow-lg shadow-amber-600 hover:from-zinc-700 hover:to-zinc-500 md:shadow-xl"}`}
        >
          <CardHeader className="flex px-4 pb-2 pt-2 md:px-6 md:pb-3 md:pt-5">
            <div className="flex w-full flex-col gap-2 md:gap-4">
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-wrap-reverse justify-end gap-2.5">
                  {item.genres.map((genreItem) => {
                    return (
                      <Chip
                        key={genreItem}
                        radius="sm"
                        variant="light"
                        className="font-thin text-zinc-200"
                        size="sm"
                      >
                        {genreItem}
                      </Chip>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {useMisc ? (
                  <> </>
                ) : (
                  <p className="w-full text-xs tracking-wide text-amber-400">
                    {item.misc}
                  </p>
                )}
                <p className="text-4xl font-extrabold tracking-wide text-zinc-100">
                  {item.title}
                </p>
                <p className="text-lg">
                  {item.stage.charAt(0).toUpperCase() + item.stage.slice(1)} -{" "}
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4 pb-4 md:px-6 md:pb-6">
            <p className="text-sm font-light tracking-wide md:text-lg">
              {item.premise}
            </p>
          </CardBody>
          <Divider className="bg-zinc-100 bg-opacity-40" />
          <CardFooter className="flex w-full flex-wrap gap-4 px-4 py-4 md:px-6 md:py-6">
            <Button
              color="warning"
              variant="shadow"
              className="md:text-medium text-sm font-bold text-zinc-900 "
              as={Link}
              href={`stories/slides/${item.story_id}`}
            >
              Presentation
            </Button>
            <Button
              variant="shadow"
              className="md:text-medium text-sm font-bold"
              as={Link}
              href={`stories/texts/${item.story_id}`}
            >
              Text
            </Button>
          </CardFooter>
        </Card>
      </animated.div>
    </Waypoint>
  );
}
