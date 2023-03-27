import { useQuery } from "react-query";
import { getUsersData } from "@/app/utils/actions/users";
import { Space, Text, Group, Image, Card, Grid, Avatar, SimpleGrid, Badge } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getStatsData } from "@/app/utils/actions/stats";
import useStyles from "./style";


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

interface Props {
  userData: UserData
  place: number
  title: string
  gradientColors: string[]
}

export default function PodiumCard({...props}: Props) {
  const { classes, theme } = useStyles(props.gradientColors);
  const isMobile = useMediaQuery("(max-width: 960px)");

  console.log(props.userData)

  return (
    <>
             <Card
             withBorder
             p="lg"
             radius={10}
             className={classes.card}
             key={props.userData.username}
             
           >
            <Grid grow>
              <Grid.Col span={8}>
              <Group spacing={40}>
        <Avatar 
          src={
            props.userData.username
            ? `https://images.hive.blog/u/${props.userData.username}/avatar`
            : null} 
            alt={props.userData.username} radius="md" 
            size={'lg'}/>
        <div>
          <Text fz="md">{props.userData.username}</Text>
          <Text fz="sm" c="dimmed">
            {props.title}
          </Text>
        </div>
      </Group>
              </Grid.Col>
              <Grid.Col span={4}>
              <Group position="right">
              <Badge sx={(theme) => ({padding: 10})} 

              className={classes.badge}
               size="lg" 
               radius="sm"
                variant="outline">{props.place}</Badge>
            </Group>
              </Grid.Col>
            </Grid>

           </Card>           
    </>
  );
}
