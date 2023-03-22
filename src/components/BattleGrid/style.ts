import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  notificationContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
  },
}));

export default useStyles;
