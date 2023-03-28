import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  notificationContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
  },

  header: {
    whiteSpace: "nowrap",
    height: "auto",
  },
}));

export default useStyles;
