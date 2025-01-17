import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Authenticator} from '@aws-amplify/ui-react';
import { createProduct } from '../graphql/mutations.js';
import config from '../aws-exports.js';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const NewProductForm = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({ name: "", description: "", image: "", price: "", featured : false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!productDetails.name || !productDetails.price) return
            await API.graphql(graphqlOperation(createProduct, { input: productDetails }))
            setProductDetails({ name: "", description: "", image: "", price: "", featured: false });
            setImage(null);
        } catch (err) {
            console.log('error creating product:', err)
        }
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setProductDetails({ ...productDetails, image: url });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="form-container">
            <Authenticator>
            {({ signOut, user }) => (
                <section>
                    <header className="form-header">
                    <button className='signout-btn-add' onClick={signOut}>SignOut</button>
                    <h1>Hello {user?.username}</h1>
                        <h3>Add New Product</h3>
                    </header>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleImageUpload(e)} />}

                        </div>
                        <div className="form-group">
                            <div className="form-label">
                                <p><label htmlFor="name">Name</label></p>
                                <p><input
                                    name="name"
                                    type="text"
                                    placeholder="Type the name"
                                    value={productDetails.name}
                                    onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="form-group">
                                <p><label htmlFor="description">Description</label></p>
                                <p><textarea
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description of the product"
                                    value={productDetails.description}
                                    onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                                    required
                                /></p>
                            </div>
                           
                            <div className='form-label'>
                                <p><label htmlFor="price">Price (HUF)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price of the product (HUF)"
                                        value={productDetails.price}
                                        onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Featured?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={productDetails.featured}
                                        onChange={() => setProductDetails({ ...productDetails, featured: !productDetails.featured })}
                                    />
                                </p>
                            </div>
                            <div className="form-submit-btn">
                                <button className="click-btn " type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
                 )}
            </Authenticator>
        </section>
    )
}

export default NewProductForm