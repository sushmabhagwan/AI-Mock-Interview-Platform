import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function InterviewSession() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("currentInterview")
    );

    if (data) {
      setQuestions(data.questions || []);
    }

  }, []);

  const handleEvaluate = async () => {

    if (!answer.trim()) {

      alert("Please enter an answer");

      return;
    }

    setLoading(true);

    try {

      const response = await api.post(
        "/evaluate-answer",
        {
          question: questions[currentIndex],
          answer: answer
        }
      );

      console.log("Evaluation Response:");
      console.log(response.data);

      if (!response.data.success) {

        alert(
          response.data?.error?.error?.message ||
          "Evaluation failed. Please try again."
        );

        setLoading(false);

        return;
      }

      setEvaluation(response.data);

    } catch (error) {

      console.error(error);

      alert("Evaluation failed");

    } finally {

      setLoading(false);
    }
  };

  const nextQuestion = () => {

    setAnswer("");

    setEvaluation(null);

    setCurrentIndex(
      (prev) => prev + 1
    );
  };

  const finishInterview = () => {

    localStorage.removeItem(
      "currentInterview"
    );

    navigate("/results");
  };

  if (questions.length === 0) {

    return (
      <>
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h2>No interview found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Mock Interview</h1>

        <h3>
          Question {currentIndex + 1}
          {" / "}
          {questions.length}
        </h3>

        <p>
          {questions[currentIndex]}
        </p>

        <textarea
          rows="8"
          cols="80"
          value={answer}
          placeholder="Type your answer here..."
          onChange={(e) =>
            setAnswer(e.target.value)
          }
        />

        <br />
        <br />

        <button
          onClick={handleEvaluate}
          disabled={loading}
        >
          {
            loading
              ? "Evaluating..."
              : "Evaluate Answer"
          }
        </button>

        {evaluation && (

          <div style={{ marginTop: "20px" }}>

            <h3>Score</h3>

            <p>
              {evaluation.score}/10
            </p>

            <h3>Feedback</h3>

            <p>
              {evaluation.feedback}
            </p>

            <br />

            {currentIndex <
              questions.length - 1 ? (

              <button
                onClick={nextQuestion}
              >
                Next Question
              </button>

            ) : (

              <button
                onClick={finishInterview}
              >
                Finish Interview
              </button>

            )}

          </div>

        )}

      </div>
    </>
  );
}

export default InterviewSession;