import { BackIcon, Container, Logo, BackButton } from "./style";

import logoImg from "@assets/logo.png";
import { Loading } from "@components/Loading";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {

  const navigation = useNavigation()

  function handleGoBack(){
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
      {/* <Loading /> */}
    </Container>
  );
}
