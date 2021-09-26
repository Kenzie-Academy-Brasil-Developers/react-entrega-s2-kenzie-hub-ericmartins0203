import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AnimationContainer, Content, Background, Container } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory, Redirect } from "react-router-dom";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório!"),
    name: yup.string().required("Campo obrigatório!"),
    bio: yup
      .string()
      .min(8, "Faça uma breve descrição!")
      .required("Faça uma breve descrição!"),
    course_module: yup.string().required("Campo obrigatório!"),
    contact: yup.string().required("Campo obrigatório!"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 digitos")
      .required("Campo obrigatório!"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = ({
    name,
    email,
    password,
    bio,
    contact,
    course_module,
  }) => {
    const user = { email, password, name, bio, contact, course_module };
    api
      .post("/users", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, tente outro email"));
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1> Cadastro </h1>
            <Input
              register={register}
              name="name"
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome completo"
              error={errors.name?.message}
            ></Input>
            <Input
              register={register}
              name="contact"
              icon={FiUser}
              label="Contato"
              placeholder="Seu contato"
              error={errors.contact?.message}
            ></Input>
            <Input
              register={register}
              name="bio"
              icon={FiUser}
              label="biografia"
              placeholder="Escreva um pouco sobre você"
              error={errors.bio?.message}
            ></Input>
            <Input
              register={register}
              name="course_module"
              icon={FiUser}
              label="Modulo do curso"
              placeholder="Primeiro módulo (Introdução ao Frontend)"
              error={errors.name?.message}
            ></Input>
            {/*  "Primeiro módulo (Introdução ao Frontend)"
"Segundo módulo (Frontend Avançado)"
"Terceiro módulo (Introdução ao Backend)"
"Quarto módulo (Backend Avançado)" */}
            <Input
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              error={errors.email?.message}
            ></Input>
            <Input
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              error={errors.password?.message}
            ></Input>
            <Input
              register={register}
              name="passwordConfirm"
              icon={FiLock}
              label="Confirmação de senha"
              placeholder="Confirmação da senha"
              type="password"
              error={errors.passwordConfirm?.message}
            ></Input>

            <Button type="submit"> Enviar </Button>
            <p>
              Já tem ma conta? <Link to="/login">Faça seu login.</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
