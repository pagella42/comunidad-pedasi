import React, { Component } from 'react';

class CreatePost extends Component {
    render() {
        return (
            <div>
                <input type="text" name="postTitle" placeholder="Title"/>
                <input type="text" name="postText" placeholder="Text"/>
                <input type="text" name="postLocation" placeholder="Location"/>
                <button>Submit</button>
                {/* Pop up please review your post */}
            </div>
        );
    }
}

export default CreatePost;