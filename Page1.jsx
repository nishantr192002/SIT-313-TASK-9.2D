import React, { useState } from 'react';
import { Container, Grid, Button, Segment } from 'semantic-ui-react'; // Import Semantic UI components
import Page1 from './Page2';
import Form2 from './QuestionForm';
import Form1 from './ArticleForm';

function PostPage() {
  const [postType, setPostType] = useState('question');

  const handlePostTypeChange = (newPostType) => {
    setPostType(newPostType);
  };

  return (
    <Container className="post-page background">
      <Grid>
        <Grid.Row>
          <Grid.Column width={16} className="Post">
            <Page1 postType={postType} setPostType={handlePostTypeChange} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} className="Post">
            {postType === 'question' ? <Form2 /> : null}
            {postType === 'article' ? <Form1 /> : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default PostPage;
