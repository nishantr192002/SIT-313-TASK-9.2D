import React, { useState } from 'react';
import { Container, Header, Input, List, Button, Form, TextArea } from 'semantic-ui-react';
import './QuestionsHomePage.css';

function QuestionsHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to learn React?',
      content: 'I want to learn React. Any tips?',
      date: '2023-10-01',
      tag: 'React',
    },
    {
      id: 2,
      title: 'JavaScript frameworks',
      content: 'What are some popular JavaScript frameworks?',
      date: '2023-09-15',
      tag: 'JavaScript',
    },
    // Add more questions with date and tag properties
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: 'Enter your question content here...',
    date: 'YYYY-MM-DD',
    tag: '',
  });

  // Filter questions based on search query, date, and tag
  const filteredQuestions = questions.filter((question) => {
    const titleMatches = question.title.toLowerCase().includes(searchQuery.toLowerCase());
    const dateMatches = question.date.includes(searchQuery);
    const tagMatches = question.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatches || dateMatches || tagMatches;
  });

  // Handle question deletion
  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  // Handle question expansion
  const handleExpandQuestion = (questionId) => {
    setSelectedQuestion(questionId);
  };

  // Default values for content and date
  const defaultContent = 'Enter your question content here...';
  const defaultDate = 'YYYY-MM-DD';

  // Handle form submission to add a new question
  const handleAddQuestion = () => {
    const nextId = Math.max(...questions.map((question) => question.id), 0) + 1;
    const newQuestionWithId = { ...newQuestion, id: nextId };
    setQuestions([...questions, newQuestionWithId]);

    // Clear the form fields and reset to default content and date
    setNewQuestion({
      title: '',
      content: defaultContent,
      date: defaultDate,
      tag: '',
    });
  };

  return (
    <Container className="questions-home">
      <Header as="h1">Questions Home Page</Header>

      {/* Search bar */}
      <Input
        icon="search"
        iconPosition="left"
        fluid
        placeholder="Search questions by title, date, or tag..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display filtered questions */}
      <List relaxed>
        {filteredQuestions.map((question) => (
          <List.Item key={question.id}>
            <List.Content>
              <List.Header
                as="a"
                onClick={() => handleExpandQuestion(question.id)}
              >
                {question.title}
              </List.Header>
              {selectedQuestion === question.id && (
                <List.Description>
                  {question.content}
                  <Button
                    color="red"
                    content="Delete"
                    onClick={() => handleDeleteQuestion(question.id)}
                  />
                </List.Description>
              )}
              <List.Description>Date: {question.date}</List.Description>
              <List.Description>Tag: {question.tag}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>

      {/* Add a new question form */}
      <div className="add-question">
        <Header as="h2">Add a New Question</Header>
        <Form>
          <Form.Field>
            <label>Title:</label>
            <input
              type="text"
              placeholder="Enter question title..."
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Content:</label>
            <TextArea
              placeholder="Enter your question content here..."
              value={newQuestion.content}
              onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              onFocus={() => {
                if (newQuestion.content === defaultContent) {
                  setNewQuestion({ ...newQuestion, content: '' });
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Date:</label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={newQuestion.date}
              onChange={(e) => setNewQuestion({ ...newQuestion, date: e.target.value })}
              onFocus={() => {
                if (newQuestion.date === defaultDate) {
                  setNewQuestion({ ...newQuestion, date: '' });
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Tag:</label>
            <input
              type="text"
              placeholder="Enter question tag..."
              value={newQuestion.tag}
              onChange={(e) => setNewQuestion({ ...newQuestion, tag: e.target.value })}
            />
          </Form.Field>
          <Button
            type="button"
            color="teal"
            content="Add Question"
            onClick={handleAddQuestion}
          />
        </Form>
      </div>
    </Container>
  );
}

export default QuestionsHomePage;