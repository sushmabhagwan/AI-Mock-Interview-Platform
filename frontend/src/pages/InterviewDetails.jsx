import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function InterviewDetails() {

  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  useEffect(() => {

    loadInterview();

  }, []);

  const loadInterview = async () => {

    try {

      const response = await api.get(
        `/interviews/${id}`
      );

      setInterview(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load interview");

    }

  };

  if (!interview) {

    return <h2>Loading...</h2>;

  }

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Interview Details</h1>

        <p>
          <strong>Role:</strong>{" "}
          {interview.role}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {interview.experience}
        </p>

        <h2>Questions</h2>

        <ol>

          {interview.questions.map(
            (question, index) => (

              <li key={index}>
                {question}
              </li>

            )
          )}

        </ol>

      </div>
    </>
  );
}

export default InterviewDetails;