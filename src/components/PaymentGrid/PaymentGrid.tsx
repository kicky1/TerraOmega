import {
  Space,
  Text,
  Button,
  Group,
  Select,
  Card,
  Center,
  Container,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";

import useStyles from "./style";
import { payForSubscription } from "@/app/utils/actions/payment";

export default function PaymentGrid() {
  const { classes, theme } = useStyles();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const countValue = (value: number) => {
    switch (value) {
      case 1:
        return 3 * value * 1;
      case 6:
        return 3 * value * 0.9;
      case 12:
        return 3 * value * 0.8;
      default:
        return 1;
    }
  };

  const discountValue = (value: string) => {
    switch (value) {
      case "1":
        return null;
      case "6":
        return "  (10% discount)";
      case "12":
        return "  (20% discount)";
      default:
        return null;
    }
  };

  return (
    <>
      <Space h="xl" />
      <Space h="xl"/>
      <Center>
        <Container size={"xs"}>
          <Card withBorder p="xl" radius={10} className={classes.card}>
            <Text size="xl" weight={500}>
              Payment details
            </Text>
            <Text size="lg" color="dimmed" mb="xs">
              In order to activate your subscription, you need to provide your
              username and choose a subscription period. 
            </Text>  
            <Text size="lg" color="dimmed" mb="lg">
              Once you have done
              that, we will verify that your payment is accurate and then
              proceed to activate your account.
            </Text>
            <Container pt={10}>
              <TextInput
              label="Hive username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
              <Select
                label="Subscription period"
                clearable
                pt={15}
                pb={5}
                data={[
                  { value: "1", label: "1 month" },
                  { value: "6", label: "6 months" },
                  { value: "12", label: "12 months" },
                ]}
                placeholder="Pick subscription period"
                onChange={setSelectedValue}
              />
              <Select
                label="Payment method"
                clearable
                pt={15}
                pb={5}
                data={[{ value: "HBD", label: "SWAP.HBD" }]}
                placeholder="Pick payment method"
                onChange={setSelectedMethod}
              />
              {selectedValue && selectedMethod && username && (
                <>
                  <Space h="xs" />
                  <Group>
                    <Text fz={"md"}>
                      <Text span fw={400} inherit>
                        Total{" "}
                      </Text>
                      : {countValue(parseInt(selectedValue)).toFixed(3)}{" "}
                      SWAP.HBD
                      <Text
                        fz={"lg"}
                        span
                        fw={600}
                        inherit
                        component="span"
                        c={"teal"}
                      >
                        {discountValue(selectedValue)}
                      </Text>
                    </Text>
                  </Group>
                  <Button
                    mt={25}
                    onClick={() => {
                      const amount = parseFloat(
                        countValue(parseInt(selectedValue)).toFixed(3)
                      );
                      payForSubscription({ username, amount });
                    }}
                    styles={(theme: any) => ({
                      root: {
                        backgroundColor: "#0a3d47",
                        "&:not([data-disabled])": theme.fn.hover({
                          backgroundColor: theme.fn.darken("#072f37", 0.05),
                        }),
                      },
                    })}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Container>
          </Card>
        </Container>
      </Center>
      <Space h="xl" />
    </>
  );
}
