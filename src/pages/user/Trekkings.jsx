import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrekkings } from "../../api/endpoints/trekkings/user-trekking";
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

const Trekkings = () => {
  const [trekkings, setTrekkings] = useState([]);

  useEffect(() => {
    const getTrekkings = async () => {
      try {
        const response = await fetchTrekkings();
        const formattedTrekkings = response.data.trekking.map((trek) => ({
          id: trek._id,
          title: trek.name,
          image: trek.image,
          description: trek.description,
          location: trek.place || "Unknown",
          difficulty: trek.difficulty || "N/A",
          duration: trek.trekDuration || "Unknown",
          distance: trek.trekDistance || 0,
          date: trek.startDate || "",
          cost: trek.costPerPerson || 0,
          maxParticipants: trek.maxParticipants || "N/A",
          registeredParticipants: trek.registeredParticipants || 0,
        }));
        setTrekkings(formattedTrekkings);
      } catch (error) {
        console.error("Error fetching trekkings:", error);
      }
    };
    getTrekkings();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container py-5 mt-8">
        <h2 className="text-center mb-4">Trekkings</h2>
        <MDBRow className="row-cols-1 row-cols-md-3 g-4">
          {trekkings.map((trek) => (
            <MDBCol key={trek.id}>
              <MDBCard className="h-100">
                <MDBCardImage
                  src={trek.image}
                  alt={trek.title}
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle>{trek.title}</MDBCardTitle>
                  <MDBCardText>
                    <strong>Location:</strong> {trek.location} <br />
                    <strong>Difficulty:</strong> {trek.difficulty} <br />
                    <strong>Distance:</strong> {trek.distance} km <br />
                    <strong>Duration:</strong> {trek.duration} <br />
                    <strong>Date:</strong>{" "}
                    {trek.date ? new Date(trek.date).toDateString() : "N/A"}{" "}
                    <br />
                    <strong>Cost per Person:</strong> ₹{trek.cost} <br />
                    <strong>Max Participants:</strong> {trek.maxParticipants}{" "}
                    <br />
                    <strong>Registered Participants:</strong>{" "}
                    {trek.registeredParticipants} <br />
                    <strong>Description:</strong>{" "}
                    {trek.description || "No description available."}
                  </MDBCardText>
                  <Link to={`/trekking/${trek.id}`}>
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

export default Trekkings;
