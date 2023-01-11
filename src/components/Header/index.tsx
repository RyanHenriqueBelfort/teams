import { BackIcon, Container, Logo, BackButton } from "./style";

import logoImg from "@assets/logo.png";
import { Loading } from "@components/Loading";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  return (
    <Container>
      {showBackButton && (
        <BackButton>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
      {/* <Loading /> */}
    </Container>
  );
}
