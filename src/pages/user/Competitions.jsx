import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCompetitions } from "../../api/endpoints/competitions/user-competition";
import NavBar from "../../components/user/NavBar";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const response = await fetchCompetitions();
        const formattedCompetitions = response.data.competitions.map(
          (comp) => ({
            id: comp._id,
            title: comp.name,
            image: comp.image[0],
            description: comp.description,
            category: comp.category || [],
            date: comp.date || "",
            place: comp.place || "N/A",
            duration: comp.duration || 0,
          })
        );
        setCompetitions(formattedCompetitions);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    getCompetitions();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container py-5 mt-8">
        <h2 className="text-center mb-4">Competitions</h2>
        <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {competitions.map((comp) => (
            <MDBCol key={comp.id}>
              <MDBCard className="h-100">
                <MDBCardImage
                  src={comp.image}
                  alt={comp.title}
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle>{comp.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Category:</strong>{" "}
                    {comp.category.length ? comp.category.join(", ") : "N/A"}{" "}
                    <br />
                    <strong>Date:</strong>{" "}
                    {comp.date ? new Date(comp.date).toDateString() : "N/A"}{" "}
                    <br />
                    <strong>Place:</strong> {comp.place} <br />
                    <strong>Duration:</strong> {comp.duration} days <br />
                    <strong>Description:</strong>{" "}
                    {comp.description || "No description available."}
                  </MDBCardText>
                  <Link to={`/competition/${comp.id}`}>
                    <MDBBtn color="primary">View</MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </div>
    </>
  );
};

export default Competitions;
