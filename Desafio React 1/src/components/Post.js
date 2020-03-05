import React, { Component } from 'react';

import Comentarios from './Comentarios';

function Post({post}){
    return(
        <li className="post">
            <div className="headerPost">
                <img className="fotoPerfil" src={post.author.avatar}/>
                <div className="autorData">
                    <div className="autorPost">{post.author.name}</div>
                    <div className="dataPost">{post.date}</div>
                </div>
            </div>
            <div className="conteudo">{post.content}</div>
            <ul id="comentarios">
                {post.comments.map(comentarios => 
                <Comentarios
                key={comentarios.id}
                data={comentarios}
                />)}
            </ul>
        </li>
    );
}

export default Post;