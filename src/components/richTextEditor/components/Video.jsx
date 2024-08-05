import React from 'react'

export default function Video(props) {
    return <video controls src={props.src} />;
}