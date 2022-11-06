import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    const placement = "top";
    const bgColor = "red.500";

    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: "Informe o código",
          placement,
          bgColor,
        });
      }

      await api.post("/polls/join", { code: code.toUpperCase() });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement,
        bgColor: "gray.500",
      });

      navigate("polls");
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data);
      switch (error.response?.data?.message) {
        case "Pool not found":
          toast.show({
            title: "Bolão não encontrado!",
            placement,
            bgColor,
          });
          break;
        case "You already joined this poll":
          toast.show({
            title: "Você já está nesse bolão!",
            placement,
            bgColor,
          });
          break;
        default:
          toast.show({
            title: "Oops... Tivemos um erro interno no servidor.",
            description:
              "Tente reiniciar o aplicativo ou entre em contato com o suporte",
            placement,
            bgColor,
          });
      }
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

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />
        <Button
          title="Buscar bolão"
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
