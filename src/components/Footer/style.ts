import { createStyles } from "@mantine/styles";

const useStyles = createStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 20,
  },
}));

export default useStyles;
