import { rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: `url("https://i.imgur.com/C3Y3FD5.jpg")`,
    },
  },

  header: {
    whiteSpace: "nowrap",

    textAlign: "left",
  },

  notificationContainer: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
  },
}));

export default useStyles;
