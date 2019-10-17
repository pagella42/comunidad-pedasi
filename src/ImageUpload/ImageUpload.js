import React, { Component } from 'react';
import { storage } from '../Firebase';

class ImageUpload extends Component {
    constructor() {
        super()
        this.state = {
            image: null,
            url: "",
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            let image = { ...this.state.image }
            image = e.target.files[0]
            this.setState({ image: image })
        }
    }

    handleUpload = () => {
        const { image } = this.state
        // .ref is referencing to our bucket in firebase
        // .put is to upload the image. put returns a task function
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // Upload task has an event listener and three functions 
        // Demonstrate progress ...
        const progress = (snapshot) => {} 
        // Demonstrate error ...
        const error = (error) => console.log(error)
        // Complete function ...
        const complete = () => {
            storage.ref('images')
            .child(image.name)
            .getDownloadURL() // returns promise
            .then(url => {
                console.log(url)
                this.props.saveUrl(url)
                alert("Image saved.")
            })
        }

        uploadTask.on('state_changed', progress, error, complete)
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    placeholder="file"
                    onChange={this.handleChange}
                    accept="image/*"
                    capture="environment"
                />
                {this.state.image ? <button onClick={this.handleUpload}>Upload</button> : <br /> }
                <br/>
                
            </div>
        );
    }
}

export default ImageUpload;