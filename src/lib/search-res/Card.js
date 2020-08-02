import React from 'react'
import './style.scss'


const Card = (props)=> {
    return ( 
        <>
        <img src={props.thumbnail + "." + props.thumbnailExt} alt={props.name}/>
        {props.name}
        {props.urls.map(ur => <a href={ur.url} target="_blank" rel="noopener noreferrer"> {ur.type} </a>)}
        {props.description}
        {props.modified}
        </>
    )
}

export default Card;