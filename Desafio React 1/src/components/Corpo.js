import React, { Component } from 'react';

import Post from './Post';

class Corpo extends Component{
    state = {
        posts: [
        {
            id: 1,
            author: {
            name: "Le'Blanc",
            avatar: "https://vignette.wikia.nocookie.net/leagueoflegends/images/3/32/Champie_LeBlanc_profileicon.png/revision/latest?cb=20180617162359"
            },
            date: "04 Jun 2019",
            content: "Pessoal, alguém sabe se a ilha das sombras está contratando?",
            comments: [
            {
                id: 1,
                author: {
                name: "Elise",
                avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Elise_1.jpg"
                },
                content: "Que eu saiba pra você não amada"
            }
            ]
        },
        {
            id: 2,
            author: {
            name: "Janna",
            avatar: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Janna_13.jpg"
            },
            date: "17 Out 2019",
            content: "Alguém sabe onde conseguir um bom condicionador? Meus cabelos estão meio ressecados",
            comments: [
            {
                id: 1,
                author: {
                name: "Taric",
                avatar: "https://br.leagueoflegends.com/sites/default/files/styles/scale_xlarge/public/upload/taric_banner_top_insights.jpg?itok=XK5CmlSc"
                },
                content: "Eu particularmente nunca precisei fazer nada demais não"
            },
            {
                id: 2,
                author: {
                name: "Soraka",
                avatar: "https://www.maisesports.com.br/wp-content/uploads/2020/01/soraka-capa.jpeg"
                },
                content: "Só com rework da riot pra isso ai deixar de ser essa pedra ressecada querida!!! Bjos de rework"
            }
            ]
        }
        ]
    };
      

    render(){
        return (
            <div className="container" id="corpo">
                <ul id="posts">
                    {this.state.posts.map(post => 
                    <Post
                    key={post.id}
                    post={post}
                    />)}
                </ul>
            </div>
        );
    };
}

export default Corpo;