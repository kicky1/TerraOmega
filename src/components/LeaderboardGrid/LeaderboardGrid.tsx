import { useState } from "react";
import { Space, SimpleGrid, Pagination, Center, Title } from "@mantine/core";
import PodiumCard from "./PodiumCard/PodiumCard";
import { useQuery } from "react-query";
import {
  getLeaderboard,
  getUserBattlesData,
  getUserData,
} from "@/app/utils/actions/users";
import backgorund from "../../assets/backgorund.jpg";
import backgorund2 from "../../assets/backgorund2.jpg"

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
      <Title order={2}>Leaderboard</Title>
      <Space h="xl" />
      <SimpleGrid cols={3} pb={15} breakpoints={[{ maxWidth: "lg", cols: 1 }]}>
        <PodiumCard
          userData={leaderBoardData[0]}
          place={1}
          title={"Galactic Conqueror"}
          gradientColors={[backgorund.src]}
        />
        <PodiumCard
          userData={leaderBoardData[1]}
          place={2}
          title={"Cosmic Legend"}
          gradientColors={[backgorund.src]}
        />

        <PodiumCard
          userData={leaderBoardData[2]}
          place={3}
          title={"Intergalactic Hero"}
          gradientColors={[backgorund.src]}
        />
      </SimpleGrid>
      <SimpleGrid cols={2} pb={15} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {filteredData.map((card, index) => (
          <PodiumCard
            key={card.username}
            userData={card}
            place={index + 4 + (currentPage - 1) * pageSize}
            title={"Starship Captain"}
            gradientColors={[backgorund2.src]}
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
