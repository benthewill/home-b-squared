"use client";
import { useSpring, animated } from "@react-spring/web";
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  Spacer,
  Chip,
  Link,
} from "@nextui-org/react";
import { Waypoint } from "react-waypoint";
import React, { useState } from "react";

export default function StoryTextContent({
  storyPremise,
  parsedContent,
  storyDraft,
  dateCreated,
  storyID,
  storyNote,
}) {
  const [inView, setInview] = useState(false);

  const premiseTransition = useSpring({
    delay: 1000,
    to: {
      y: !inView ? 24 : 0,
      opacity: !inView ? 0 : 1,
    },
  });

  const contentTransition = useSpring({
    delay: 2000,
    to: {
      y: !inView ? 24 : 0,
      opacity: !inView ? 0 : 1,
    },
  });

  const noteArray = storyNote.split("\n");

  return (
    <Waypoint onEnter={() => setInview(true)}>
      <div className="flex flex-col">
        <animated.div style={premiseTransition}>
          <Card
            isBlurred
            shadow="lg"
            radius="sm"
            className="bg-gradient-to-bl from-black to-zinc-800 p-0 tracking-wide text-zinc-100 md:w-3/4 md:p-4"
          >
            <CardBody>
              <p className="text-xl font-bold md:text-2xl">{storyPremise}</p>
            </CardBody>
            <CardFooter>
              <p className="text-medium text-right font-thin">Premise</p>
            </CardFooter>
          </Card>
          <div className="mt-10 flex flex-row gap-6">
            <Button
              color="warning"
              variant="shadow"
              radius="sm"
              className="md:text-medium h-8 p-0 px-4 text-xs font-bold text-zinc-900 md:p-4 md:px-4"
              as={Link}
              href={`/stories/slides/${storyID}`}
            >
              Presentation Mode
            </Button>
            <Button
              color="default"
              variant="shadow"
              radius="sm"
              className="md:text-medium h-8 p-0 px-4 text-xs font-bold text-zinc-900 md:p-4 md:px-4"
              as={Link}
              href={`#personal-note`}
            >
              Personal Notes
            </Button>
          </div>
        </animated.div>
        <Spacer y={10} />
        <animated.div
          style={contentTransition}
          className="mt-2 flex w-full flex-col pl-0 md:w-3/4 md:pl-4"
        >
          {parsedContent.map((line, index) => {
            return (
              <div key={index}>
                <p className="text-lg font-light tracking-wide md:text-xl">
                  {line}
                </p>
                <Spacer y={6} />
              </div>
            );
          })}
          <div className="my-6 w-3/4 pl-0 md:pl-0" id="personal-note">
            <p className="text-2xl font-extrabold tracking-wide text-zinc-100 md:text-5xl">
              Personal Note
            </p>
          </div>
          {noteArray.map((line, index) => {
            return (
              <div key={index}>
                <p className="text-lg font-light tracking-wide md:text-xl">
                  {line}
                </p>
                <Spacer y={6} />
              </div>
            );
          })}
          <div className="mt-16 w-full justify-end">
            <Chip
              radius="sm"
              size="lg"
              variant="flat"
              color="default"
              className="justify-end"
            >
              <p className="font-medium">
                draft #{storyDraft} - {dateCreated}
              </p>
            </Chip>
          </div>
        </animated.div>
      </div>
    </Waypoint>
  );
}
