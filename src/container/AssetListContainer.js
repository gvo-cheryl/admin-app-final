import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import Title from "../component/Title";
import axios from "axios";
import { useSelector } from "react-redux";
import AddContainer from "./AddContainer";

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(5),
    fontSize: "10pt",
  },
  root: {
    fontSize: "10px",
  },
  table: {
    fontSize: "10pt",
  },
}));

function useConnect() {
  const { response } = useSelector((state) => state.User);
  const member = response.rData.member;
  const [assets, setAssets] = useState([]);
  const [category, setCategory] = useState([]);
  const [row, setRow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (member.memberType === "TOP") {
      axios
        .post("/assetlist", { withCredentials: true }, {})
        .then((response) => {
          setAssets(response.data.rData.assetList);
          setCategory(response.data.rData.assetList[0].personal.slice(0, 7));
        });
    } else if (member.memberType === "ADMIN") {
      axios.post("/assetone", { adminId: member.adminId }).then((response) => {
        setAssets(response.data.rData.assetList);
        setCategory(response.data.rData.assetList[0].personal.slice(0, 7));
      });
    }

    for (var i = 0; i < assets.length; i++) {
      if (assets[i].company.length > 6) setRow(true);
      if (assets[i].personal.length > 6) setRow(true);
    }

    setLoading(false);
  }, [member.adminId, member.memberType]);

  return [assets, category, loading, row];
}

function AssetList(props) {
  const { loginSuccess } = useSelector((state) => state.User);
  const classes = useStyles();
  const [assets, category, loading] = useConnect();
  const [add, setAdd] = useState("");

  useEffect(() => {
    setAdd("");
  }, [setAdd]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(assets);
    axios.post("/assetlist/update", { assets: assets }).then((response) => {
      if (response.data.rCode === "SUCCESS") {
        alert("수정완료");
      } else {
        alert("ERROR");
      }
      props.history.push("/assetList");
    });
  };

  const addHandler = (e) => {
    setAdd(
      <AddContainer category={category} assets={assets} classes={classes} />
    );
  };

  const onChangeCompanyBrand = (e, index, memberIndex) => {
    assets[memberIndex].company[index].brand = e.target.value;
    console.log(e.target.value);
  };

  const onChangePersonalBrand = (e, index, memberIndex) => {
    assets[memberIndex].personal[index].brand = e.target.value;
    console.log(e.target.value);
  };

  return (
    <div className={classes.body}>
      <form onSubmit={onSubmit}>
        <Title>Asset List</Title>
        {loading ? (
          <div> Loading...</div>
        ) : (
          <TableContainer className={classes.root}>
            <Table size="small" className={classes.table}>
              <TableRow>
                <TableCell align="center" rowSpan={2}>
                  NAME
                </TableCell>
                <TableCell align="center" rowSpan={2}>
                  TYPE
                </TableCell>

                <TableCell align="center" colSpan={7}>
                  CATEGORY <br />
                  (brand/count)
                </TableCell>
                {/* <TableCell align="center" rowSpan={2}>
                  COUNT
                </TableCell> */}
              </TableRow>
              <TableRow>
                {category.map((detail, index) => (
                  <TableCell key={index} id={index + ".category"}>
                    {detail.name}
                  </TableCell>
                ))}
              </TableRow>
              {assets.map((row, memberIndex) => (
                <TableBody key={memberIndex}>
                  <TableRow>
                    <TableCell rowSpan={2} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">Company</TableCell>
                    {row.company.slice(0, 7).map((detail, index) => (
                      <TableCell align="center">
                        {index < 7 && (
                          <TextField
                            key={index}
                            defaultValue={detail.brand}
                            size="small"
                            id="company"
                            align="center"
                            onChange={(e) =>
                              onChangeCompanyBrand(e, index, memberIndex)
                            }
                          />
                        )}
                        {row.company.map((detail, index) => {})}
                        {row.company.length > 7 ? (
                          <TextField
                            key={index + 7}
                            defaultValue={row.company[index + 7].brand}
                            size="small"
                            id="company"
                            align="center"
                            onChange={(e) =>
                              onChangeCompanyBrand(e, index + 7, memberIndex)
                            }
                          />
                        ) : (
                          <div></div>
                        )}
                      </TableCell>
                    ))}

                    {/* <TableCell align="center">
                      {companyCount(memberIndex)}
                    </TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Personal</TableCell>
                    {row.personal.slice(0, 7).map((detail, index) => (
                      <TableCell align="center">
                        {index < 7 && (
                          <TextField
                            key={index}
                            defaultValue={detail.brand}
                            size="small"
                            id="company"
                            align="center"
                            onChange={(e) =>
                              onChangePersonalBrand(e, index, memberIndex)
                            }
                          />
                        )}
                        {row.personal.length > 7 ? (
                          <TextField
                            key={index + 7}
                            defaultValue={row.personal[index + 7].brand}
                            size="small"
                            id="company"
                            align="center"
                            onChange={(e) =>
                              onChangePersonalBrand(e, index + 7, memberIndex)
                            }
                          />
                        ) : (
                          <div></div>
                        )}
                      </TableCell>
                    ))}
                    {/* <TableCell align="center">
                      {personalCount(memberIndex)}
                    </TableCell> */}
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        )}
        <div style={{ marginTop: 40, marginLeft: 500 }}>
          <Button
            align="center"
            variant="contained"
            color="primary"
            label="add"
            className={classes.button}
            style={{ marginRight: 10 }}
            onClick={(e) => addHandler(e)}
          >
            추가
          </Button>
          <Button
            align="center"
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            수정
          </Button>
        </div>
      </form>
      {add}
    </div>
  );
}

export default AssetList;
