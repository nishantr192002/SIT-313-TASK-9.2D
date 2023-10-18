import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Form, Button, List, Header } from 'semantic-ui-react';
import './QuestionList.css'; // Import your custom CSS for additional styling

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionList = [];
      querySnapshot.forEach((doc) => {
        questionList.push({ id: doc.id, ...doc.data() });
      });
      setQuestions(questionList);
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const handleExpand = (id) => {
    if (expandedQuestions.includes(id)) {
      setExpandedQuestions((prevExpanded) => prevExpanded.filter((qid) => qid !== id));
    } else {
      setExpandedQuestions((prevExpanded) => [...prevExpanded, id]);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const isTitleMatch = !filterTitle || question.title.toLowerCase().includes(filterTitle.toLowerCase());
    const isTagsMatch = !filterTags || question.tags.includes(filterTags);

    const isDateMatch = !filterDate || isSameDate(question.date.toDate(), new Date(filterDate));

    return isTitleMatch && isTagsMatch && isDateMatch;
  });

  return (
    <div className="question-list-container">
      <Header as="h2" textAlign="center">Questions</Header>
      <div className="filter-container">
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="search"
              iconPosition="left"
              placeholder="Filter by title"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
            />
            <Form.Input
              fluid
              icon="tags"
              iconPosition="left"
              placeholder="Filter by tags"
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              type="date"
              placeholder="Filter by date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Form.Group>
          <Button fluid primary>
            Filter
          </Button>
        </Form>
      </div>
      <List divided relaxed>
        {filteredQuestions.map((question) => (
          <List.Item key={question.id}>
            <Header as="h3">Title: {question.title}</Header>
            {expandedQuestions.includes(question.id) && (
              <List.List>
                <List.Item>
                  <strong>Date:</strong> {question.date.toDate().toLocaleString()}
                </List.Item>
                <List.Item>
                  <strong>Description:</strong> {question.description}
                </List.Item>
                <List.Item>
                  <strong>Tags:</strong> {question.tags}
                </List.Item>
              </List.List>
            )}
            <div className="button-container">
              <Button
                primary
                onClick={() => handleExpand(question.id)}
              >
                {expandedQuestions.includes(question.id) ? "Collapse" : "Expand"}
              </Button>
              <Button
                negative
                onClick={() => handleDelete(question.id)}
              >
                Delete
              </Button>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default QuestionList;