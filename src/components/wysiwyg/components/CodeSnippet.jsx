import React from 'react'

export default function CodeSnippet({ code }) {
    return (
        <div className='code_snippet_container'>
            <pre className='code_snippet_pre'>
                <code className='code_snippet_code'>
                    {code}
                </code>
            </pre>
        </div>
    )
}
