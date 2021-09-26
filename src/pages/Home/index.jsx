import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useHistory, Redirect } from "react-router";

function Home({ authenticated }) {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <h1>
          KenzieHub
        </h1>
        <p>Organize seu portfólio de forma fácil e efetiva</p>
        <div>
          <Button
            onClick={() => handleNavigation("/signup")}
            whiteSchema="true"
          >
            {" "}
            Cadastre-se{" "}
          </Button>
          <Button onClick={() => handleNavigation("/login")}> Login </Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;