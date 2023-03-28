import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === "dark" ? "#062329" : "#062329",
    border: 0,
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.4)",
  },

  subheader: {
    backgroundColor: theme.colorScheme === "dark" ? "#062329" : "#062329",
    border: 0,
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    "&:active": theme.activeStyles,
  },
}));

export default useStyles;
