import { useState } from "react";
import { Space, SimpleGrid, Pagination, Center } from "@mantine/core";
import PodiumCard from "./PodiumCard/PodiumCard";
import { useQuery } from "react-query";
import {
  getLeaderboard,
  getUserBattlesData,
  getUserData,
} from "@/app/utils/actions/users";

interface UserData {
  attacks: number;
  balance: number;
  claims: number;
  cooldown: number;
  damage: number;
  defense: number;
  engineering: number;
  favor: number;
  health: number;
  hiveEngineScrap: number;
  hiveEngineStake: number;
  lastBattle: number;
  lastPayout: number;
  lastclaim: number;
  lastregen: number;
  minerate: number;
  registrationTime: number;
  scrap: number;
  username: string;
}

export default function LeaderboardGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data: leaderBoardData, isLoading: leaderBoardDataLoading } = useQuery(
    "leaderBoard",
    getLeaderboard,
    {
      refetchInterval: 60000,
    }
  );

  if (leaderBoardDataLoading || !leaderBoardData) {
    return <></>;
  }

  const filteredData = leaderBoardData
    .slice(3, -1)
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const pageCount = Math.ceil(leaderBoardData.length / pageSize);

  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      <SimpleGrid cols={3} pb={15} breakpoints={[{ maxWidth: "lg", cols: 1 }]}>
      <PodiumCard
          userData={leaderBoardData[0]}
          place={1}
          title={"Galactic Conqueror"}
          gradientColors={["https://i.imgur.com/BXgZ31l.jpg"]}
          />
        <PodiumCard
          userData={leaderBoardData[1]}
          place={2}
          title={"Cosmic Legend"}
          gradientColors={["https://i.imgur.com/C3Y3FD5.jpg"]}
          
          />

        <PodiumCard
          userData={leaderBoardData[2]}
          place={3}
          title={"Intergalactic Hero"}
          gradientColors={["https://i.imgur.com/MjdBSVR.jpg"]}
          
        />
      </SimpleGrid>
      <SimpleGrid cols={2} pb={15} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {filteredData.map((card, index) => (
          <PodiumCard
            key={card.username}
            userData={card}
            place={index + 4 + (currentPage - 1) * pageSize}
            title={"Starship Captain"}
            gradientColors={["https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80", "#0D47A1ac"]}
            />
        ))}
      </SimpleGrid>
      <Pagination
        style={{ alignSelf: "center" }}
        color={"dark"}
        variant="outline"
        radius={10}
        value={currentPage}
        onChange={setCurrentPage}
        total={pageCount}
        withControls
        pt={25}
        position="center"
      />
      <Space h="xl" />
    </>
  );
}
