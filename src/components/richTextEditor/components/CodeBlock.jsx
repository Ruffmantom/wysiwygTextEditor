import React from 'react'

export default function CodeBlock(props) {
  return (
    <pre className='code_block'>
      <code>{props.code.trim()}</code>
    </pre>
  )
}