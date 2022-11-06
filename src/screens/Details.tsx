import { useState, useEffect } from "react";
import { Share } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PollCardPros } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { EmptyMyPollList } from "../components/EmptyMyPollList";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";

interface RouteParams {
  id: string;
}

enum Options {
  "GUESSES" = "Meus Palpites",
  "RANKING" = "Ranking do grupo",
}

export function Details() {
  const [optionSelected, setOptionSelected] = useState<Options>(
    Options.GUESSES
  );
  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PollCardPros>(
    {} as PollCardPros
  );

  const toast = useToast();
  const route = useRoute();

  const { id } = route.params as RouteParams;

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);
      setPollDetails(response.data);
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

  async function handleCodeChare() {
    Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeChare}
      />
      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Meus palpites"
              isSelected={optionSelected === Options.GUESSES}
              onPress={() => setOptionSelected(Options.GUESSES)}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === Options.RANKING}
              onPress={() => setOptionSelected(Options.RANKING)}
            />
          </HStack>

          <Guesses pollId={pollDetails.id} code={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  );
}
