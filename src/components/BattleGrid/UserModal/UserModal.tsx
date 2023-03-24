import { useQuery } from "react-query";
import {
  Space,
  Text,
  Grid,
  Image,
  Group,
  Modal,
  Select,
  Avatar,
  Badge,
  Container,
  Skeleton,
  Divider,
} from "@mantine/core";
import React, { useEffect } from "react";
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
  attacks: number;
  claims: number;
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
  // userBattlesData: any;
  battleUsername: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
  selectedValue: string | null;
}

export default function UserModal({ ...props }: Props) {
  const {
    data: userHiveData,
    isLoading,
    refetch,
    isFetching,
  } = useQuery(["userHive"], () => getUserDataProfile(props.battleUsername), {
    enabled: false,
  });

  const isMobile = useMediaQuery("(max-width: 767px)");
  // const userRobbingData = useMemo(() => {
  //   if (!props.userBattlesData) {
  //     return [];
  //   }
  //   let filteredData = props.userBattlesData.filter((user: UserBattleData) => !user.attacked.includes(props.battleUsername));
  //   return filteredData;
  // }, [props.userBattlesData]);

  // const userRobbedData = useMemo(() => {
  //   if (!props.userBattlesData) {
  //     return [];
  //   }
  //   let filteredData = props.userBattlesData.filter((user: UserBattleData) => user.attacked.includes(props.battleUsername));
  //   return filteredData;
  // }, [props.userBattlesData]);

  useEffect(() => {
    if (props.battleUsername) {
      refetch();
    }
  }, [props.battleUsername, refetch]);

  if (isLoading || isFetching || !userHiveData) {
    return (
      <>
        <Modal
          opened={props.showPopup}
          onClose={props.handlePopupClose}
          centered
          size="lg"
        >
          <Container>
            <Grid grow>
              <Skeleton height={600} mt={6} width="100%" radius="sm" />
            </Grid>
          </Container>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal
        opened={props.showPopup}
        onClose={props.handlePopupClose}
        centered
        size="lg"
      >
        <Container>
          <Grid grow>
            <Grid.Col span={6}>
              <Group>
                <Avatar
                  radius="lg"
                  size="xl"
                  src={`https://images.hive.blog/u/${props.selectedRow.username}/avatar`}
                />
                <div style={{ flex: 1 }}>
                  <Text size="lg" weight={500}>
                    {userHiveData.result.name}{" "}
                    <Badge
                      size="lg"
                      sx={(theme: any) => ({ padding: 5 })}
                      ml={5}
                      radius="sm"
                      color="gray"
                      variant="outline"
                    >
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
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/7944/7944561.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Damage{" "}
                  </Text>
                  : {props.selectedRow.damage}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/9936/9936736.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Defense{" "}
                  </Text>
                  : {props.selectedRow.defense}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/2061/2061956.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Engineering{" "}
                  </Text>
                  : {props.selectedRow.engineering}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/9219/9219138.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Attacks{" "}
                  </Text>
                  : {props.selectedRow.attacks}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1350/1350541.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Scrap{" "}
                  </Text>
                  :{" "}
                  {props.selectedRow.scrap
                    ? props.selectedRow.scrap.toFixed(2)
                    : 0}{" "}
                  /{" "}
                  {props.selectedRow.hiveEngineStake
                    ? (props.selectedRow.hiveEngineStake + 1.0).toFixed(2)
                    : 0}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={"https://cdn-icons-png.flaticon.com/512/584/584052.png"}
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Scrap on HE
                  </Text>
                  :{" "}
                  {props.selectedRow.hiveEngineScrap
                    ? props.selectedRow.hiveEngineScrap.toFixed(2)
                    : 0}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/2597/2597143.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Favor
                  </Text>
                  :{" "}
                  {props.selectedRow.favor
                    ? props.selectedRow.favor.toFixed(2)
                    : 0}
                </Text>
              </Group>
              <Space h="sm" />
              <Group>
                <Image
                  maw={45}
                  mah={45}
                  fit="contain"
                  src={
                    "https://cdn-icons-png.flaticon.com/512/2171/2171382.png"
                  }
                />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Claims{" "}
                  </Text>
                  : {props.selectedRow.claims}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
          <Space h="xl" />
          <Divider size="xs" />
          <Space h="xl" />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Stash will be full in:{" "}
            </Text>
            {props.selectedRow.minerate ? (
              <>
                {(() => {
                  const minutesRemaining = Math.floor(
                    (props.selectedRow.hiveEngineStake -
                      props.selectedRow.scrap) /
                      (props.selectedRow.minerate * 60)
                  );
                  const hoursRemaining = Math.floor(minutesRemaining / 60);
                  const minutesAfterHours = minutesRemaining % 60;
                  const daysRemaining = Math.floor(hoursRemaining / 24);
                  const hoursAfterDays = hoursRemaining % 24;
                  const timeRemaining = [];
                  if (daysRemaining > 0) {
                    timeRemaining.push(
                      `${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`
                    );
                  }
                  if (hoursAfterDays > 0) {
                    timeRemaining.push(
                      `${hoursAfterDays} hour${hoursAfterDays > 1 ? "s" : ""}`
                    );
                  }
                  if (minutesAfterHours > 0) {
                    timeRemaining.push(
                      `${minutesAfterHours} minute${
                        minutesAfterHours > 1 ? "s" : ""
                      }`
                    );
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
              />
              {props.selectedValue && (
                <>
                  <Space h="xs" />
                  <Group>
                    <Image
                      maw={45}
                      mah={45}
                      fit="contain"
                      src={
                        "https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"
                      }
                    />
                    <Text fz={"lg"}>
                      <Text span fw={500} inherit>
                        Scrap from {props.selectedValue}h
                      </Text>
                      :{" "}
                      {props.selectedRow.minerate && props.selectedValue
                        ? (
                            props.selectedRow.minerate *
                            3600 *
                            parseInt(props.selectedValue)
                          ).toFixed(4)
                        : 0}
                    </Text>
                  </Group>
                </>
              )}
              <Space h="xl" />
              {/* <Text fz={"lg"}>
                <Text span fw={500}>
                  Data from last 100 space battles
                </Text>
              </Text>
              <Space h="xs" />
              <Group>
                <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/4828/4828069.png"} />
                <Text fz={"lg"}>
                  <Text span fw={500} inherit>
                    Total gain:{" "}
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
                  </Group> */}
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>
          </Grid>
        </Container>
      </Modal>
    </>
  );
}
