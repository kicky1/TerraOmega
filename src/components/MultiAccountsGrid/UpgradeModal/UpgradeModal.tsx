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
  TextInput,
  Input,
  Tooltip,
  Button,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getUserDataProfile } from "@/app/utils/actions/hiveUsers";
import { upgradeFavor, upgradeStash } from "@/app/utils/actions/users";

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

interface Props {
  showUpgradePopup: boolean;
  setShowUpgradePopup: React.Dispatch<React.SetStateAction<boolean>>;

  selectedUpgradeRow: UserData;
  setInputAmount: (value: React.SetStateAction<string>) => void;
  inputAmount: string;
  selectedUpgradeName: string;
  setSelectedUpgradeName: (value: React.SetStateAction<string>) => void;
}

export default function UpgradeModal({ ...props }: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const upgradeAccount = () => {
    if (props.selectedUpgradeName == "stash size") {
      upgradeStash(
        props.selectedUpgradeRow.username,
        parseFloat(props.inputAmount)
      );
    } else {
      upgradeFavor(
        props.selectedUpgradeRow.username,
        parseFloat(props.inputAmount)
      );
    }

    props.setInputAmount("");
    props.setShowUpgradePopup(false);
  };

  return (
    <>
      <Modal
        opened={props.showUpgradePopup}
        onClose={() => props.setShowUpgradePopup(false)}
        centered
      >
        <Container>
          <Text size="md" weight={500}>
            Upgrade your {props.selectedUpgradeName}
          </Text>
          <Text size="xs" color="dimmed" mb={"md"}>
            (max $SCRAP :{" "}
            {(props.selectedUpgradeRow.hiveEngineScrap - 0.001).toFixed(3)})
          </Text>

          <Group>
            <Input
              placeholder="Amount"
              type="text"
              value={props.inputAmount}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => props.setInputAmount(e.target.value)}
            />

            <Button
              onClick={upgradeAccount}
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
          </Group>
        </Container>
      </Modal>
    </>
  );
}
