import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebase';
import { Container, Form, TextArea, Button, Input, Label, Segment } from 'semantic-ui-react';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState(''); // Store the image URL

  const uploadImage = () => {
    if (imageUpload === null) {
      alert("Please select an image to upload.");
      return;
    }
  
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => getDownloadURL(imageRef))
      .then((downloadURL) => {
        setImageURL(downloadURL); // Set the download URL in the state
        alert('Image Uploaded');
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the form values, including the image URL
    const data = {
      title,
      abstract,
      articleText,
      tags,
      image: imageURL, // Store the image URL, not the File object
    };

    try {
      // Add the data to a Firestore collection
      await addDoc(collection(db, 'articles'), data);
      console.log('Data stored in Firestore');

      // Reset the form fields
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImageUpload(null);
      setImageURL(''); // Reset the image URL
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <Container className='article-form'>
      <Segment inverted style={{ background: 'gray' }}>
        <div className='centered-text'>
          <p className='ft1'>What do you want to ask or share</p>
        </div>
      </Segment>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <Input
            type='text'
            placeholder='Enter a descriptive title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Upload Image</label>
          <Input
            type='file'
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <Button onClick={uploadImage}>Upload Image</Button>
        </Form.Field>

        <Form.Field>
          <label>Abstract</label>
          <TextArea
            placeholder='Enter a 1-paragraph abstract'
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Article Text</label>
          <TextArea
            placeholder='Enter the article text'
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Tags</label>
          <Input
            type='text'
            placeholder='Please add up to 3 tags to describe what your article is about'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Field>

        <Button type='submit' className='button'>
          Post
        </Button>
      </Form>
    </Container>
  );
}

export default ArticleForm;