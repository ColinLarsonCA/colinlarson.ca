import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Crumbs } from "common";
import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
  Typography,
} from "@mui/material";
import { PackingListSection, describeItem, standardList } from "packing";
import { useStoredPackingList } from "packing/useStoredPackingList";
import { useLocalStorage } from "hooks/useLocalStorage";

const PREFIX = "PackingList";
const classes = {
  content: `${PREFIX}-content`,
  actions: `${PREFIX}-actions`,
  lists: `${PREFIX}-lists`,
};
const StyledPage = styled("div")(({ theme }) => ({
  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "500px",
  },
  [`& .${classes.actions}`]: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  },
  [`& .${classes.lists}`]: {
    width: "100%",
  },
}));

export function PackingList() {
  const [hideChecked, setHideChecked] = useLocalStorage(
    "hide_packing_list_checked_items",
    false
  );
  const { packingList, setPackingList } = useStoredPackingList();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [changed, setChanged] = useState(Date.now());
  const markChanged = () => setChanged(Date.now());
  const setItemPacked = (
    sectionIndex: number,
    itemIndex: number,
    packed: boolean
  ) => {
    packingList.sections[sectionIndex].items[itemIndex].packed = packed;
    setPackingList(packingList);
    markChanged();
  };
  const clearChecks = () => {
    packingList.sections.forEach((section) => {
      section.items.forEach((item) => (item.packed = false));
    });
    setPackingList(packingList);
    markChanged();
  };
  const loadExampleList = () => {
    setPackingList(standardList);
    markChanged();
  };
  const quantityHidden = (section: PackingListSection) => {
    if (!hideChecked) {
      return 0;
    }
    return section.items.filter((item) => item.packed).length;
  };
  return (
    <StyledPage>
      <Crumbs
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/packing", label: "Packing List" },
        ]}
      />
      <div className={classes.content}>
        <div className={classes.actions}>
          <FormControlLabel
            control={
              <Switch
                checked={hideChecked}
                onChange={(_, checked) => setHideChecked(checked)}
              />
            }
            label="Hide checked"
          />
          <Button variant="contained" onClick={() => clearChecks()}>
            Clear checks
          </Button>
          <Button variant="text" onClick={() => loadExampleList()}>
            Load example list
          </Button>
        </div>
        <div className={classes.lists}>
          {packingList.sections.map((section, sectionIndex) => {
            const numHidden = quantityHidden(section);
            return (
              <div key={`section-${sectionIndex}`}>
                <List subheader={<ListSubheader>{section.name}</ListSubheader>}>
                  {section.items.map((item, itemIndex) => {
                    if (hideChecked && item.packed) {
                      return null;
                    }
                    return (
                      <ListItem
                        key={`item-${sectionIndex}.${itemIndex}`}
                        secondaryAction={
                          <Checkbox
                            edge="end"
                            checked={item.packed}
                            onChange={(_, checked) =>
                              setItemPacked(sectionIndex, itemIndex, checked)
                            }
                          />
                        }
                      >
                        <ListItemText primary={describeItem(item)} />
                      </ListItem>
                    );
                  })}
                </List>
                {numHidden > 0 && (
                  <Typography variant="caption">
                    + {numHidden} hidden items
                  </Typography>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </StyledPage>
  );
}
