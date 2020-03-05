import React, { Component } from 'react';

function Comentarios({data}){
    return(
        <li className="comentario">
            <img className="fotoComentario" src={data.author.avatar}/>
            <div className="autorComentario">
                <b>{data.author.name}</b> {data.content}
            </div>
        </li>
    );
}

export default Comentarios;