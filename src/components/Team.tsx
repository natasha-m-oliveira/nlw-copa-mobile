import { HStack } from "native-base";
import CountryFlag from "react-native-country-flag";

import { Input } from "./Input";

interface Props {
  code: string;
  points?: number;
  openToPoll: boolean;
  position: "left" | "right";
  onChangeText: (value: string) => void;
}

export function Team({
  code,
  points,
  openToPoll,
  position,
  onChangeText,
}: Props) {
  return (
    <HStack alignItems="center">
      {position === "left" && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={12}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        placeholder={String(points ? points : 0)}
        onChangeText={onChangeText}
        isReadOnly={!isNaN(points) || !openToPoll}
      />

      {position === "right" && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
