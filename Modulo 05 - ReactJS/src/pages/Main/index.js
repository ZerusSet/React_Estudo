/* eslint-disable eqeqeq */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: null,
        erro: false,
    };

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // Salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories != repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;
        try {
            const duplicado = repositories.find(dup => dup.name === newRepo);
            if (newRepo == '') {
                this.setState({
                    erro: true,
                });
                throw new Error('Campo de Nome não pode estar vazio');
            }
            if (duplicado) {
                this.setState({
                    erro: true,
                });
                throw new Error('Repositório Duplicado');
            }
            const response = await api.get(`repos/${newRepo}`);
            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                erro: false,
            });
        } catch (error) {
            this.setState({
                loading: false,
                erro: true,
            });
        }
    };

    render() {
        const { newRepo, loading, repositories, erro } = this.state;
        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} erro={erro}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <>
                    {erro == true ? <div id="dup">Algo deu Errado</div> : <></>}
                </>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
