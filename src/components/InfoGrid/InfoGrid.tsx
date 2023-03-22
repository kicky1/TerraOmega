import { Container, Title, Accordion, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const questionData = [
  {
    title: "What is Terra Omega and what is it used for?",
    question:
      "Terra Omega is a web application that allows users to manage their accounts for the Hive blockchain game, Terracore. It has various functions, including the ability to collect $SCRAP, attack opponents, and view detailed player data.",
    value: "q1",
  },
  {
    title: "How do I log in?",
    question:
      "To log in, you must have a Hive Keychain wallet with updated keys for the account you want to use. Without these keys, you cannot log in.",
    value: "q2",
  },
  {
    title: "Do I need a subscription to use Terra Omega?",
    question:
      "Yes, Terra Omega is a subscription-based application. To access all of its features, you need to purchase a monthly subscription. However, without a subscription, you can still use the application to filter opponents and view their $SCRAP.",
    value: "q3",
  },
  {
    title: "Is the information in the tables updated regularly?",
    question:
      "Yes, the information is updated continuously every 30 seconds. However, please note that there is always a possibility that a player may collect their $SCRAP before your attack, and the table may not have enough time to reflect the updated information.",
    value: "q4",
  },
  {
    title: "How do I find the best opponent to attack?",
    question:
      "To find the most suitable opponent to attack on Terra Omega, go to the Table tab, enter your nickname, and click on the Calculate button. The system will then select the most appropriate opponent for you to attack.",
    value: "q5",
  },
  {
    title: "How do I attack another player?",
    question:
      "To attack another player, go to the Table tab and click on the sword button in the Attack column for the opponent you want to attack. This will send a request to the keychain, and a popup will appear allowing you to select the account you want to use for the attack.",
    value: "q6",
  },
  {
    title: "How do I check the account details of a player?",
    question:
      "To view the account details of a specific player on Terra Omega, go to the Table tab and click on the row for that player. A popup will then appear with the details, including the amount of $SCRAP they have collected and when their stash is full.",
    value: "q7",
  },
  {
    title: "How do I load my accounts?",
    question:
      "To load your accounts on Terra Omega, go to the Accounts tab and type in the account names separated by commas.",
    value: "q8",
  },
  {
    title: "How do I collect my $SCRAP?",
    question:
      "To collect your $SCRAP on Terra Omega, go to the Accounts tab, load your account, and click on the Claim Scrap button. This will send a message to Hive Keychain allowing you to make the request.",
    value: "q9",
  },
];

export function InfoGrid() {
  const { classes } = useStyles();
  return (
    <Container size="md" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        {questionData.map((item) => {
          return (
            <Accordion.Item
              className={classes.item}
              value={item.value}
              key={item.value}
            >
              <Accordion.Control
                sx={{
                  overflow: "hidden",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </Accordion.Control>
              <Accordion.Panel>{item.question}</Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}
