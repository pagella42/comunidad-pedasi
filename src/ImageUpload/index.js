import React, { Component } from "react";
import storage from "../Firebase/index";

class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            url: "",
            progress: 0
        };
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            this.setState({image: image})
        }
    };

    handleUpload = () => {
        const { image } = this.state // Object destruction
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ url });
                    });
            }
        );
    };


    render() {
        return (
            <div>
                <div>
                    <progress value={this.state.progress} max="100"/>
                </div>
                <div>
                    <div>
                        <span>File</span>
                        <input type="file" onChange={this.handleChange} />
                    </div>
                    <div>
                        <input placeholder="file-path validate" type="text" />
                    </div>
                </div>
                <button onClick={this.handleUpload}>Upload</button>
                <img
                    src={this.state.url || "https://via.placeholder.com/400x300"}
                    alt="Uploaded Images"
                    height="300"
                    width="400"
                />
            </div>
        );
    }
}

export default ImageUpload;