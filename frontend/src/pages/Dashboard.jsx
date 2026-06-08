import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        total_interviews: 0,
        total_answers: 0,
        average_score: 0,
        highest_score: 0,
        lowest_score: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await api.get("/dashboard");

            console.log(response.data);

            setStats(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>

                <h1>Dashboard</h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Total Interviews</h3>

                        <h2>
                            {stats.total_interviews}
                        </h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Total Answers</h3>

                        <h2>
                            {stats.total_answers}
                        </h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Average Score</h3>

                        <h2>
                            {stats.average_score}
                        </h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Highest Score</h3>

                        <h2>
                            {stats.highest_score}
                        </h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Lowest Score</h3>

                        <h2>
                            {stats.lowest_score}
                        </h2>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;