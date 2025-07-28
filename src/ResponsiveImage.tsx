import { Box } from "@mui/material";
import { ResponsiveImageProps } from "./Types/types";

const ResponsiveImage = ({src, alt, id, roundedBorder}: ResponsiveImageProps) => {
  return (
    <Box
      sx={{
        width: "4rem", // Full width container
        maxWidth: "600px", // Max width for larger screens
        margin: "0 auto", // Center the container horizontally
        overflow: "hidden", // Hide any overflow
        display: "block",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        id={id}
        sx={{
          borderRadius: roundedBorder ? "5rem" : null,
          width: "100%", // Make image responsive
          height: "auto", // Maintain aspect ratio
          display: "block", // Remove any inline spacing below
          objectFit: "cover", // Optional: Cover the entire container
        }}
      />
    </Box>
  );
};

export default ResponsiveImage;
