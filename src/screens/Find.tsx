import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handleJoinPoll() {
    try {
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Oops... Tivemos um erro interno no servidor.",
        description:
          "Tente reiniciar o aplicativo ou entre em contato com o suporte",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
