import React, { useRef } from "react";
import { UserConsumer } from "../../utils/UserContext";
import "./imageModal.css";

function ImageModal() {

    const imgRef = useRef();

    return (
        <UserConsumer>
            {
                value => {
                    return (
                        value.imageModalOpen ? (
                            <div className="image-modal uk-flex uk-flex-middle uk-flex-center">
                                <div className="image-modal-wrapper uk-width-1-2@m">
                                    <div className="uk-modal-header">
                                        <h2>Update Avatar</h2>
                                        <p>Insert a url for your image.</p>
                                    </div>
                                    <div className="uk-modal-body uk-flex uk-width-1-1">
                                        <form className="uk-width-1-1">
                                            <div className="uk-width-1-1">
                                                <div className="uk-margin">
                                                    <label className="uk-form-label" htmlFor="user-avatar">image</label>
                                                    <div className="uk-form-controls">
                                                        <input
                                                            className="uk-input"
                                                            id="user-avatar"
                                                            type="url"
                                                            placeholder="https://www.site.com/image.png"
                                                            required={true}
                                                            ref={imgRef}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="uk-modal-footer uk-text-right">
                                        <button className="uk-button outline-btn uk-modal-close uk-margin-small-right" type="button" onClick={() => value.handleImageModal()}>Cancel</button>
                                        <button
                                            className="uk-button secondary-btn"
                                            type="button"
                                            onClick={(e) => {
                                                value.updateUserImage(e, value.info.id, {
                                                    image: imgRef.current.value
                                                })
                                            }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    )
                }
            }
        </UserConsumer>
    )
}

export default ImageModal;