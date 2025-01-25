import { styled } from "@mui/system"; // Import styled from @mui/system

const SelectButton = ({ children, selected, onClick }) => {
  // Using styled to create a custom button
  const StyledButton = styled("span")({
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px", // Combined padding for shorthand
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: (props) => (props.selected ? "gold" : ""), // Conditional background color
    color: (props) => (props.selected ? "black" : ""), // Conditional color
    fontWeight: (props) => (props.selected ? 700 : 500), // Conditional font weight
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    // margin: 5, // Uncomment if needed
  });

  return (
    <StyledButton onClick={onClick} selected={selected}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;
