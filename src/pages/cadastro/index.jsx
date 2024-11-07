import { useNavigate  } from "react-router-dom";
import { MdAccountCircle, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleCadastro, SubtitleCadastro, ContaText, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
      try {
          const { data } = await api.post('/users', {
              nome: formData.nome,
              email: formData.email, 
              senha: formData.senha, 
          })
  
            if (data && data.id) {
              navigate('/login')
            }
  
          alert('Ocorreu um erro ao criar a conta. Tente novamente mais tarde.')
      } catch (e) {
          console.error('Erro ao cadastrar:', e)
          alert('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
      }
  }

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você <br/>aprender com experts, dominar as principais tecnologias
                 e entrar <br/>mais rápido nas <br/>empresas mais<br/> desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleCadastro>Comece agora grátis.</TitleCadastro>
                <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <Input placeholder="Nome Completo" leftIcon={<MdAccountCircle />} name="nome" control={control} />

                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}

                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}

                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <ContaText>Já tenho conta.</ContaText>
                    <CriarText>Fazer login.</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }