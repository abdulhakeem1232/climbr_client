import React, { useState } from 'react'
import CreatePost from '../../components/user/home/CreatePost'

function Post() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div>
            <CreatePost setIsLoading={setIsLoading} />
        </div>
    )
}

export default Post


