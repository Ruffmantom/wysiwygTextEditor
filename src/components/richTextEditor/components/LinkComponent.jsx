import React from 'react';

const LinkComponent = (props) => {
    console.log("hit Link component: ",props)
    const { url, label } = props.contentState.getEntity(props.entityKey).getData();
    return <a className="formatted_link" href={url} style={{color:"blue",textDecoration:"underline"}}>{label || props.children}</a>;
}

export default LinkComponent;
