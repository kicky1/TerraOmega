import { rem } from "@mantine/core";
import { createStyles } from "@mantine/styles";




const useStyles = createStyles((theme, gradientColors: string[] ) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
   
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(105),
      backgroundImage: theme.fn.linearGradient(
        0,
        gradientColors[1] ,
        gradientColors[0]    
      ),
    },
  },
  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
  badge: {
    borderColor: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[5],
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[5]
  }
}));

export default useStyles;
