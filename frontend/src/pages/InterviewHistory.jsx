import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function InterviewHistory() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {

    loadInterviews();

  }, []);

  const loadInterviews = async () => {

    try {

      const response = await api.get("/interviews");

      setInterviews(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load interviews");

    }

  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Interview History</h1>

        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Role</th>
              <th>Experience</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {interviews.map((interview) => (

              <tr key={interview.id}>

                <td>{interview.role}</td>

                <td>{interview.experience}</td>

                <td>
                  {new Date(
                    interview.created_at
                  ).toLocaleDateString()}
                </td>

                <td>

                  <Link
                    to={`/interview/${interview.id}`}
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default InterviewHistory;