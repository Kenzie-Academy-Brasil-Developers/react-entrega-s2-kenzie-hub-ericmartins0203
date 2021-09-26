import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { Container, Content, Background, InputContainer } from "./styles";
import api from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Dashboard({ authenticated, setAuthenticated }) {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
  );

  const [user] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:user")) || ""
  );

  const [tech, setTech] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório!"),
    status: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function loadTechs() {
    api
      .get(`/users/${user.id}`)
      .then((response) => setTech(response.data.techs))
      .catch((err) => console.log(err));
  }

  function addTechs({ title, status }) {
    const data = {
      title: title,
      status: status,
    };
    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Baerer ${token}`,
        },
      })
      .then((response) => setTech(...tech, data))
      .catch((err) => console.log(err));
  }

  function delTechs({ arg }) {
    api
      .delete(`/users/techs/${arg}`, {
        headers: {
          Authorization: `Baerer ${token}`,
        },
      })
      .then((response) => loadTechs());
  }

  useEffect(() => {
    loadTechs();
  }, [tech]);

  const Logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <button className="deslogar" onClick={() => Logout()}>
        Deslogar
      </button>
      <Content>
        <h2>Bem vindo, {user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Contato do usuário: {user.contact}</p>
        <p>Módulo do curso: {user.course_module}</p>
        <div>
          <h3>Um pouco sobre mim:</h3>
          <p>{user.bio}</p>
        </div>
        <hr />

        <div>
          <h3>Minhas tecnologias:</h3>
          {tech.length > 0 &&
            tech.map((item) => {
              const arg = item.id;
              return (
                <li key={item.id}>
                  <p>
                    Tec.: {item.title} - Nível: {item.status}
                  </p>
                  <button className="del" onClick={() => delTechs({ arg })}>
                    x
                  </button>
                </li>
              );
            })}
          <details>
            <summary>Adicionar tecnologia</summary>
            <InputContainer onSubmit={handleSubmit(addTechs)}>
              <h4>Adicionar tecnologia</h4>
              <input
                placeholder="Nome da tecnologia"
                {...register("title")}
              ></input>
              <select name="nível" {...register("status")}>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
              <button type="submit" title="Adicionar tecnologia">
                +
              </button>
            </InputContainer>
          </details>
        </div>
        <hr />

        <div>
          <h3>Meus trabalhos:</h3>
          {user.works.length > 0 &&
            user.works.map((item) => {
              return (
                <li key={item.id}>
                  Tecnologia: {item.title} - Nível: {item.status}
                </li>
              );
            })}
        </div>
        <hr />
      </Content>
      <Background />
    </Container>
  );
}

export default Dashboard;
