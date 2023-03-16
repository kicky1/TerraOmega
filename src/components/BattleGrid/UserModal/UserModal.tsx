import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData } from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton, Avatar, Badge, Container, Image } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconShieldCheckeredFilled, IconSword } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { getUserDataProfile } from "@/app/utils/actions/hiveUsers";

interface UserData {
  username: string;
  damage: number;
  defense: number;
  engineering: number;
  scrap: number;
  registrationTime: number;
  favor: number;
  hiveEngineScrap: number;
  hiveEngineStake: number;
  minerate: number;
}

interface UserBattleData {
  id: string;
  username: string;
  attacked: string;
  scrap: number;
  timestamp: number;
}

interface Props {
  showPopup: boolean;
  handlePopupClose: () => void;
  selectedRow: UserData;
  userBattlesData: any;
  battleUsername: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  selectedValue: string | null;
}

export default function UserModal({ ...props }: Props) {
  const { data: userHiveData, isLoading } = useQuery(["userHive"], () => getUserDataProfile(props.battleUsername), {});
  const isMobile = useMediaQuery('(max-width: 767px)');
  const userRobbingData = useMemo(() => {
    if (!props.userBattlesData) {
      return [];
    }
    let filteredData = props.userBattlesData.filter((user: UserBattleData) => !user.attacked.includes(props.battleUsername));
    return filteredData;
  }, [props.userBattlesData]);

  const userRobbedData = useMemo(() => {
    if (!props.userBattlesData) {
      return [];
    }
    let filteredData = props.userBattlesData.filter((user: UserBattleData) => user.attacked.includes(props.battleUsername));
    return filteredData;
  }, [props.userBattlesData]);

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(userHiveData);

  return (
    <>
      <Modal opened={props.showPopup} onClose={props.handlePopupClose} centered size="lg">
        <Container>
          <Grid grow>
            <Grid.Col span={6}>
              <Group>
                <Avatar radius="lg" size="xl" src={userHiveData.result.metadata.profile.profile_image} />
                <div style={{ flex: 1 }}>
                  <Text size="lg" weight={500}>
                    {userHiveData.result.name}{" "}
                    <Badge size="lg" sx={(theme) => ({ padding: 5 })} ml={5} radius="sm" color="gray" variant="outline">
                      {userHiveData.result.reputation.toFixed()}
                    </Badge>
                  </Text>
                </div>
              </Group>
            </Grid.Col>
          </Grid>
          <Space h="xl" />
          <Grid grow>
            <Grid.Col span={isMobile ? 12 : 6}>
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/7944/7944561.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Damage{" "}
                  </Text>
                  : {props.selectedRow.damage}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/9936/9936736.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Defense{" "}
                  </Text>
                  : {props.selectedRow.defense}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/2061/2061956.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Engineering{" "}
                  </Text>
                  : {props.selectedRow.engineering}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/1350/1350541.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Scrap{" "}
                  </Text>
                  : {props.selectedRow.scrap ? props.selectedRow.scrap.toFixed(2) : 0} / {props.selectedRow.hiveEngineStake + 1 ? props.selectedRow.hiveEngineStake.toFixed(2) + 1 : 0}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/584/584052.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    HE Balance
                  </Text>
                  : {props.selectedRow.hiveEngineScrap ? props.selectedRow.hiveEngineScrap.toFixed(2) : 0}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/2597/2597143.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Favor
                  </Text>
                  : {props.selectedRow.favor ? props.selectedRow.favor.toFixed(2) : 0}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
          <Space h="xl" />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Stash will be full in:{" "}
            </Text>
            {props.selectedRow.minerate ? (
              <>
                {(() => {
                  const minutesRemaining = Math.floor((props.selectedRow.hiveEngineStake - props.selectedRow.scrap) / (props.selectedRow.minerate * 60));
                  const hoursRemaining = Math.floor(minutesRemaining / 60);
                  const minutesAfterHours = minutesRemaining % 60;
                  const daysRemaining = Math.floor(hoursRemaining / 24);
                  const hoursAfterDays = hoursRemaining % 24;
                  const timeRemaining = [];
                  if (daysRemaining > 0) {
                    timeRemaining.push(`${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`);
                  }
                  if (hoursAfterDays > 0) {
                    timeRemaining.push(`${hoursAfterDays} hour${hoursAfterDays > 1 ? "s" : ""}`);
                  }
                  if (minutesAfterHours > 0) {
                    timeRemaining.push(`${minutesAfterHours} minute${minutesAfterHours > 1 ? "s" : ""}`);
                  }
                  return timeRemaining.join(", ");
                })()}
              </>
            ) : (
              0
            )}
          </Text>
          <Space h="xl" />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Mining calculator
            </Text>
          </Text>
          <Grid grow>
            <Grid.Col span={isMobile ? 12 : 6}>
              <Select
                clearable
                pt={5}
                pb={5}
                data={[
                  { value: "1", label: "1h" },
                  { value: "4", label: "4h" },
                  { value: "8", label: "8h" },
                  { value: "12", label: "12h" },
                ]}
                placeholder="Pick time"
                onChange={props.setSelectedValue}
                sx={{ zIndex: 100 }}
              />
              {props.selectedValue && (
                <>
                  <Text fz={"lg"}>
                    <Text span fw={500} inherit>
                      Scrap from {props.selectedValue}h
                    </Text>
                    : {props.selectedRow.minerate && props.selectedValue ? (props.selectedRow.minerate * 3600 * parseInt(props.selectedValue)).toFixed(4) : 0}
                  </Text>
                </>
              )}
              <Space h="xl" />
              <Text fz={"lg"}>
                <Text span fw={500}>
                  Info from last 20 space battles
                </Text>
              </Text>
              <Space h="xs" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/4828/4828069.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Total scraped:{" "}
                  </Text>
                  <>
                    {(() => {
                      const totalScrap = userRobbingData.reduce((total: number, value: { scrap: number }) => total + value.scrap, 0);
                      return totalScrap.toFixed(2);
                    })()}
                  </>
                </Text>
              </Group>
              <Space h="lg" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/2936/2936762.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Total loss:{" "}
                  </Text>
                  <>
                    {(() => {
                      const totalScrap = userRobbedData.reduce((total: number, value: { scrap: number }) => total + value.scrap, 0);
                      return totalScrap.toFixed(2);
                    })()}
                  </>
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
          </Grid>
        </Container>
      </Modal>
    </>
  );
}