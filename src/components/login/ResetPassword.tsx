import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  Input,
  PinInput,
  PinInputField,
  HStack,
  VStack,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import {
  checkAdminEmail,
  checkPINCode,
  saveNewPassword,
} from "@/services/resetPassword";
import { checkPasscode, sendNewPassword } from "@/actions/checkPasscode";

const ModalStatus = {
  INITIAL: "Initial",
  PIN_SENT: "PIN sent",
  READY_TO_RESET_PASSWORD: "Ready to reset password",
  PASSWORD_RESET: "Password reset",
} as const;

type ModalStatusType = (typeof ModalStatus)[keyof typeof ModalStatus];
// TODO: REFACTOR INTO USING RHF
export default function ResetPassword({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<ModalStatusType>(ModalStatus.INITIAL);
  const [email, setEmail] = useState<string>("");
  const [PIN, setPIN] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false); // In case it doesn't match we won't allow the user to submit the form and we will show an error message below the confirmation input.
  const toast = useToast();

  const updateEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Restaurar contraseña</ModalHeader>
        <ModalCloseButton />

        <FormControl
          onSubmit={(evt: FormEvent<HTMLDivElement>) => {
            evt.preventDefault();
            const { description, notificationStatus, title, isError } =
              checkAdminEmail(email);

            toast({
              status: notificationStatus,
              title,
              description,
            });
            if (!isError) setStatus(ModalStatus.PIN_SENT);
          }}
        >
          <form>
            <VStack alignItems="flex-start" mx="5%" spacing="3">
              <FormLabel fontSize="lg">
                Ingrese su correo electrónico{" "}
              </FormLabel>
              <Input
                isDisabled={status !== ModalStatus.INITIAL}
                onChange={(e) => updateEmail(e.target.value)}
                type="email"
                placeholder="example@email.com"
                w="100%"
                borderColor="teal.900"
                isRequired
              />

              <Button
                onClick={(e) => {
                  console.log("enviando");
                }}
                type="submit"
                isDisabled={status !== ModalStatus.INITIAL}
                colorScheme="teal"
              >
                Guardar correo electrónico
              </Button>
            </VStack>
          </form>
        </FormControl>

        <FormControl
          onSubmit={(evt: FormEvent<HTMLDivElement>) => {
            evt.preventDefault();
            checkPasscode(PIN).then(({ body: { message }, error }) => {
              toast({
                title: message.title,
                description: message.description,
                status: message.notificationStatus,
              });
              if (!error) setStatus(ModalStatus.READY_TO_RESET_PASSWORD);
            });
          }}
        >
          <form>
            <VStack alignItems="flex-start" mx="5%" spacing="3">
              <FormLabel fontSize="lg">
                Ingrese el PIN que fue enviado
              </FormLabel>
              <HStack spacing="4">
                <PinInput
                  isDisabled={status !== ModalStatus.PIN_SENT}
                  size="lg"
                  onChange={(pinValue) => setPIN(pinValue)}
                >
                  <PinInputField borderColor="teal.900" />
                  <PinInputField borderColor="teal.900" />
                  <PinInputField borderColor="teal.900" />
                  <PinInputField borderColor="teal.900" />
                  <PinInputField borderColor="teal.900" />
                  <PinInputField borderColor="teal.900" />
                </PinInput>
              </HStack>
              <Button
                type="submit"
                isDisabled={status !== ModalStatus.PIN_SENT || PIN.length !== 6}
                colorScheme="teal"
              >
                Validar PIN
              </Button>
            </VStack>
          </form>
        </FormControl>

        <FormControl
          onSubmit={(e: FormEvent<HTMLDivElement>) => {
            e.preventDefault();
            sendNewPassword(email, newPassword).then(
              ({ body: { message }, error }) => {
                toast({
                  title: message.title,
                  description: message.description,
                  status: message.notificationStatus,
                });
                if (!error) setStatus(ModalStatus.PASSWORD_RESET);
                onClose()
              }
            );
          }}
        >
          <form>
            <VStack alignItems="flex-start" m="5%" spacing="3">
              <FormLabel fontSize="lg">Ingrese su nueva contraseña </FormLabel>
              <Input
                onChange={(e) => setNewPassword(e.target.value)}
                id="password"
                isDisabled={status !== ModalStatus.READY_TO_RESET_PASSWORD}
                type="password"
                borderColor="teal.900"
                placeholder="nueva contraseña"
                w="100%"
              />
              <Input
                isInvalid={newPassword !== confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setPasswordsMatch(newPassword === e.target.value);
                }}
                id="confirmPassword"
                isDisabled={
                  status !== ModalStatus.READY_TO_RESET_PASSWORD ||
                  newPassword.length === 0
                }
                type="password"
                borderColor="teal.900"
                placeholder="confirmar contraseña"
                w="100%"
              />

              <Button
                type="submit"
                isDisabled={!passwordsMatch}
                colorScheme="teal"
              >
                Restaurar contraseña
              </Button>
            </VStack>
          </form>
        </FormControl>
      </ModalContent>
    </Modal>
  );
}
