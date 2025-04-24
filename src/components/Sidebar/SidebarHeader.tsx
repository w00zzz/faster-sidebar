import Box from "@mui/material/Box";

interface SidebarHeaderProps {
  isExpanded: boolean;
  logoPath?: string;
}

const SidebarHeader = ({ isExpanded, logoPath }: SidebarHeaderProps) => (
    <Box // Box contenedor del logo de la aplicacion
          sx={{
            width: "100%",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent:  "center",
            padding: isExpanded ? "0 24px" : "0",
            backgroundColor: "rgb(255, 255, 255)",
            borderBottom: "1px solid rgba(145, 158, 171, 0.2)",
          }}
        >
          <Box // Box reservado exclusivamente para la imagen
            component="img"
            src={ isExpanded ?logoPath :"small_"+logoPath}
            sx={{
              height: "60px",
            }}
          ></Box>
        </Box>
);

export default SidebarHeader;