import {
  Space,
} from "@mantine/core";
import React from "react";

import { Subscription } from "./Subscription/Subscription";

export default function SubscriptionGrid() {
  const functionalitiesData = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/9030/9030641.png",
      title: "Attack Profitability Analysis",
      description:
        "This feature allows you to analyze which player attacks will result in the most $SCRAP earnings. This way, you can prioritize your attacks and focus on the most profitable targets.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9219/9219138.png",
      title: "Web-Based Attack System",
      description:
        "With Web-Based Attack System, you can attack opponents directly from the website. This simplifies the process of attacking and enables you to start earning more $SCRAP quickly and easily.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/8040/8040933.png",
      title: "User Information Access",
      description:
        "Clicking on a table row provides you with more information about each user. This includes details such as when a player's stash will be full and access to a mining calculator to help you plan your strategy.",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/2171/2171382.png",
      title: "Multi-Accounts Managment",
      description:
        "This feature makes it easy to load accounts and manage everyone. This saves you time and helps you earn more $SCRAP in less time. Simply load your accounts into the system and let the tool handle the rest.",
    },
  ];

  return (
    <>
      <Space h="xl" />
      <div>
        <Subscription
          supTitle={"Subscription"}
          description={
            "The powerful tool designed for crypto gamers who want to maximize their earnings in the Terracore. Tool offers a range of features that will help you stay ahead of the competition and earn more $SCRAP."
          }
          data={functionalitiesData}
        />
      </div>
      <Space h="xl" />
    </>
  );
}
