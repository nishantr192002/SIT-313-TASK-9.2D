import React from 'react';
import { Segment, Radio } from 'semantic-ui-react';
// import './Page2.css';

function PostTypeSelector({ postType, setPostType }) {
  return (
    <div>
      <Segment inverted style={{ background: 'gray' }}>
        <h2>New Post</h2>
      </Segment>
      <label>Select Post Type: </label>
      <Radio
        className='question'
        label="Question "
        name="postType"
        value="question"
        checked={postType === 'question'}
        onChange={() => setPostType('question')}
        style={{ margin: '10px 10px' }} // Add spacing using the style prop
      />
      <Radio
        className='article'
        label="Article"
        name="postType"
        value="article"
        checked={postType === 'article'}
        onChange={() => setPostType('article')}
        style={{ margin: '10px 10px' }} // Add spacing using the style prop
      />
    </div>
  );
}

export default PostTypeSelector;
