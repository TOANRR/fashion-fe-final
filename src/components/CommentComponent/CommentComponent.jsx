import React from 'react'

const CommentComponent = (props) => {
    const { dataHref } = props
    return (
        <div class="fb-comments" data-href={dataHref} data-width="" data-numposts="5"></div>)
}

export default CommentComponent