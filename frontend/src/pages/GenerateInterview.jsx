import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function GenerateInterview() {

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await api.post(
  "/generate-interview",
  {
    role,
    experience,
    skills: skills
      .split(",")
      .map(skill => skill.trim())
  }
);

console.log(response.data);

// Save interview session
localStorage.setItem(
  "currentInterview",
  JSON.stringify(response.data)
);
console.log("API RESPONSE:", response.data);

setQuestions(
  response.data.questions || []
);

localStorage.setItem(
  "currentInterview",
  JSON.stringify(response.data)
);

navigate("/interview-session");


    } catch (error) {

      console.error(error);

      alert("Failed to generate interview");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Generate Interview</h1>

        <form onSubmit={handleGenerate}>

          <div>
            <label>Role</label>
            <br />

            <input
              type="text"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Experience</label>
            <br />

            <input
              type="text"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            />
          </div>

          <br />

          <div>
            <label>Skills</label>
            <br />

            <input
              type="text"
              placeholder="Python,Docker,AWS"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
            />
          </div>

          <br />

          <button type="submit">
            Generate Interview
          </button>

        </form>

        <br />

        {loading && (
          <p>Generating questions...</p>
        )}

        {questions && questions.length > 0 && (

          <div>

            <h2>
              Generated Questions
            </h2>

            <ol>

              {questions.map(
                (question, index) => (

                  <li key={index}>
                    {question}
                  </li>

                )
              )}

            </ol>

          </div>

        )}

      </div>
    </>
  );
  
}

export default GenerateInterview;

