import React, { Component } from 'react';
import { storage } from '../Firebase';
import { withTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';


class ImageUpload extends Component {
    constructor() {
        super()
        this.state = {
            image: null,
            url: "",
            loading: false,
        }
    }

    handleChange = async (e) => {
        if (e.target.files[0]) {
            let image = { ...this.state.image }
            image = e.target.files[0]
            this.setState({loading: true})
            await this.setState({ image: image })
            this.handleUpload()

        }
    }


    handleUpload = () => {
        const { image } = this.state
        // .ref is referencing to our bucket in firebase
        // .put is to upload the image. put returns a task function
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // Upload task has an event listener and three functions 
        // Demonstrate progress ...
        const progress = (snapshot) => { }
        // Demonstrate error ...
        const error = (error) => console.log(error)
        // Complete function ...
        const complete = () => {
            storage.ref('images')
                .child(image.name)
                .getDownloadURL() // returns promise
                .then(url => {
                    this.props.saveUrl(url)
                    this.setState({loading:false})
                })
        }

        uploadTask.on('state_changed', progress, error, complete)
    }

    render() {
        const { t, i18next } = this.props
        return (
            <div>
                <input
                    type="file"
                    placeholder={t("file")}
                    onChange={this.handleChange}
                    
                />
                {this.state.loading ?
                    <div>Loading Image ...</div>
                    : <div></div>
                }
                <br />

            </div>
        );
    }
}

export default withTranslation('translation')(ImageUpload);