import React, { Component } from "react";
class TheCodeOfConduct extends Component {

  

  render() {
    
    return this.props.terms?(
      <div id='terms' style={{position:"absolute", backgroundColor: 'rgba(0,80,80,0.7)'}}>
        <div>
          1. DON'T provide confidential or other proprietary information. If
          there's any question in your mind, err on the side of keeping silent.
        </div>

        <div>
          2. DO identify yourself by name and, when relevant, your role, when
          you discuss your company or matters relating to it.
        </div>

        <div>
          3. DON'T write in the first person plural (e.g. "we", "us", "our").
          Make it clear you speak for yourself and not on behalf of your firm.
        </div>

        <div>
          4. DO be mindful that whatever you publish will be public for a long
          time, possibly for your entire career.
        </div>

        <div>
          5. DON'T violate copyright, fair use, or financial disclosure laws.
          When you quote somebody, link back to the source if possible.
        </div>

        <div>
          6. DO make certain that your online profiles and related content are
          consistent with how you wish to present yourself to colleagues and
          clients.
        </div>

        <div>
          7. DON'T assume that posting anonymously will keep your true identity
          secret if you publish inappropriate comments and content.
        </div>

        <div>
          8. DO take personal responsibility for the content that you publish on
          blogs, wikis, or any other public forum.
        </div>

        <div>
          9. DON'T forget that your firm's brand is represented by its people
          and what you publish will inevitably reflect on that brand.
        </div>

        <div>
          10. DO your best to add value by providing worthwhile information and
          perspective rather than mere opinion and bluster.
        </div>
        <button onClick={this.props.toggleTerms}>Confirm</button>
      </div>
    ):null;
  }
}
export default TheCodeOfConduct;
