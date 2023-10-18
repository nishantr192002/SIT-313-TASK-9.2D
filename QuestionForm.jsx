import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Form, TextArea, Button, Grid, Container, Segment } from 'semantic-ui-react';

function Form2() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      tags,
      date: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'questions'), data);
      console.log('Data stored in Firestore.');
      alert('Question upload successful');

      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding Question! Try again');
    }
  };

  return (
    <Container className="question-form">
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment inverted style={{ background: 'gray' }}>
              <div className="centered-text">
                <p className="ft1">What do you want to ask or share</p>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form onSubmit={handleSubmit}>
              <h3 className="a">Title</h3>
              <Form.Input
                className="f"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <h3 className="a">Problem</h3>
              <TextArea
                className="ft3"
                placeholder="Describe your problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <h3 className="a">Tags</h3>
              <Form.Input
                className="ft5"
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <Button type="submit" className="button">
                Post
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Form2;