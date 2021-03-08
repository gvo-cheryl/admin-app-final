import {
  NativeSelect,
  TextField,
  Table,
  TableCell,
  TableRow,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Title from "../component/Title";

function AddContainer({ category, assets, classes, history }) {
  const [assetDetail_id, setAssetDetailId] = useState(assets[0].assetDetail_id);
  const [name, setName] = useState(assets[0].name);
  const [type, setType] = useState("COMPANY");
  const [laptop, setLaptop] = useState();
  const [monitor, setMonitor] = useState();
  const [keyboard, setKeyboard] = useState();
  const [cable, setCable] = useState();
  const [charger, setCharger] = useState();
  const [herb, setHerb] = useState();
  const [etc, setEtc] = useState();
  const assetList = [
    {
      assetDetail_id,
      name,
      [type.toLowerCase()]: [
        {
          id: 0,
          name: "LAPTOP",
          brand: laptop,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "MONITOR",
          brand: monitor,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "KEYBOARD",
          brand: keyboard,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "CABLE",
          brand: cable,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "CHARGER",
          brand: charger,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "HERB",
          brand: herb,
          type: type,
          count: 0,
        },
        {
          id: 0,
          name: "ETC",
          brand: etc,
          type: type,
          count: 0,
        },
      ],
    },
  ];
  console.log(type);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(history);
    axios.post("/assetlist/register", { asset: assetList }).then((res) => {
      window.location.replace("/assetList");
    });
  };

  const onChangeAssetDetailId = (e) => {
    setAssetDetailId(e.target.value.substring(0, 1));
    setName(e.target.value.substring(2, e.target.value.length));
  };

  const onChangeType = (e) => {
    setType(e.target.value.toUpperCase());
  };

  const onChangeLapTop = (e) => {
    setLaptop(e.target.value);
  };

  const onChangeMonitor = (e) => {
    setMonitor(e.target.value);
  };

  const onChangeKeyboard = (e) => {
    setKeyboard(e.target.value);
  };
  const onChangeCable = (e) => {
    setCable(e.target.value);
  };
  const onChangeCharger = (e) => {
    setCharger(e.target.value);
  };
  const onChangeHerb = (e) => {
    setHerb(e.target.value);
  };
  const onChangeEtc = (e) => {
    setEtc(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Title>ADD</Title>

      <Table>
        <TableRow>
          <TableCell align="center">NAME</TableCell>
          <TableCell align="center">TYPE</TableCell>
          {category.map((detail, index) => (
            <TableCell
              align="center"
              key={index}
              id={index + "." + detail.name}
            >
              {detail.name}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell align="center" rowSpan={2}>
            <NativeSelect
              labelid="name"
              id="name"
              onChange={(e) => onChangeAssetDetailId(e)}
              selected
            >
              {assets.map((row, index) => (
                <option value={row.assetDetailId} key={index}>
                  {row.assetDetail_id + "." + row.name}
                </option>
              ))}
            </NativeSelect>
          </TableCell>
          <TableCell>
            <NativeSelect
              labelid="name"
              id="type"
              onChange={(e) => onChangeType(e)}
              selected
            >
              <option value="Company">Company</option>
              <option value="Personal">Personal</option>
            </NativeSelect>
          </TableCell>
          <TableCell align="center">
            <TextField
              id="laptop"
              defaultValue=""
              onChange={(e) => onChangeLapTop(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="monitor"
              defaultValue=""
              onChange={(e) => onChangeMonitor(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="keyboard"
              defaultValue=""
              onChange={(e) => onChangeKeyboard(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="cable"
              defaultValue=""
              onChange={(e) => onChangeCable(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="charger"
              defaultValue=""
              onChange={(e) => onChangeCharger(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="herb"
              defaultValue=""
              onChange={(e) => onChangeHerb(e)}
            />
          </TableCell>
          <TableCell align="center">
            <TextField
              id="etc"
              defaultValue=""
              onChange={(e) => onChangeEtc(e)}
            />
          </TableCell>
        </TableRow>
      </Table>
      <div style={{ marginTop: 40, marginLeft: 500 }}>
        <Button
          align="center"
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          add
        </Button>
      </div>
    </form>
  );
}

export default AddContainer;
