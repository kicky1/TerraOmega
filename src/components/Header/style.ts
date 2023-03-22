import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === "dark" ? "#072c33" : "#072f37",
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
