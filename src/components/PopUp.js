"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/react";
import { navigateToPitches } from "../app/actions";
import { useState } from "react";

export default function PopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isIncorrect, setIncorrect] = useState(false);
  const [useErrorMessage, setErrorMessage] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    const pass = e.target.pitchesPassword.value;

    if (pass === "robby") {
      await navigateToPitches();
    } else {
      setIncorrect(true);
      setErrorMessage("Incorrect Pass Phrase");
    }
  }

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="shadow">
        Story Pitches
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={"blur"}
        className={"bg-slate-800"}
      >
        <ModalContent className="text-zinc-100">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Story Pitches
              </ModalHeader>
              <form onSubmit={onSubmit}>
                <ModalBody>
                  <p>
                    These stories are currently not open for public. Please
                    input the pass phrase.
                  </p>
                  <Input
                    name="pitchesPassword"
                    id="pitchesPassword"
                    type="text"
                    label="Pass Phrase"
                    variant="bordered"
                    className="max-w-xs"
                    isInvalid={isIncorrect}
                    errorMessage={useErrorMessage}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="faded" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="secondary" type="submit">
                    Enter
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
