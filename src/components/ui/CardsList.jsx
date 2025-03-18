/* eslint-disable react/prop-types */
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const CardsList = ({ title, items }) => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">{title}</h2>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4">
        {items.map((item) => (
          <MDBCol key={item.id}>
            <MDBCard className="h-100">
              <MDBCardImage src={item.image} alt={item.title} position="top" />
              <MDBCardBody>
                <MDBCardTitle>{item.title}</MDBCardTitle>
                <MDBCardText>{item.description}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default CardsList;
