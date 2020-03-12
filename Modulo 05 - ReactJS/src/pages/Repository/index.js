import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './style';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
        filtroEstado: 'open',
    };

    async componentDidMount() {
        this.filtroEstado('open');
    }

    async filtroEstado(estado) {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                /* Trazer apenas uma quantia de informações */
                params: {
                    state: estado,
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    }

    render() {
        const { repository, issues, loading } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList onSubmit={this.handleSearch}>
                    <div className="barraPesquisa">
                        <h3>Filtros de Estado</h3>
                        <div>
                            <button
                                type="button"
                                onClick={() => this.filtroEstado('open')}
                            >
                                OPEN
                            </button>
                            <button
                                type="button"
                                onClick={() => this.filtroEstado('closed')}
                            >
                                CLOSED
                            </button>
                            <button
                                type="button"
                                onClick={() => this.filtroEstado('all')}
                            >
                                ALL
                            </button>
                        </div>
                    </div>

                    {issues.map(issue => (
                        <li>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                    <span className="issueState">
                                        {issue.state}
                                    </span>
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}
