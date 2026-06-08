import Navbar from "../components/Navbar";

function Dashboard() {

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>

                <h1>Dashboard</h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px"
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
                        <h2>1</h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Total Results</h3>
                        <h2>1</h2>
                    </div>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "20px",
                            width: "200px"
                        }}
                    >
                        <h3>Average Score</h3>
                        <h2>4</h2>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;