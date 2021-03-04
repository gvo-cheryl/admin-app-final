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
import { Redirect } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (member.memberType === "TOP") {
      axios
        .post("/admin/assetList", { withCredentials: true }, {})
        .then((response) => {
          setAssets(response.data.rData.assetList);
          setCategory(response.data.rData.assetList[0].personal);
        });
    } else if (member.memberType === "ADMIN") {
      axios
        .post("/admin/assetOne", { adminId: member.adminId })
        .then((response) => {
          console.log(response);
          setAssets(response.data.rData.assetList);
          setCategory(response.data.rData.assetList[0].personal);
        });
    }

    setLoading(false);
  }, [member.adminId, member.memberType]);

  return [assets, category, loading];
}

function AssetList(props) {
  const { loginSuccess } = useSelector((state) => state.User);
  const classes = useStyles();
  const [assets, category, loading] = useConnect();

  if (!loginSuccess) return <Redirect to="/login" />;

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/admin/assetListUpdate", { assets: assets })
      .then((response) => {
        if (response.data.rCode === "SUCCESS") {
          alert("수정완료");
        } else {
          alert("ERROR");
        }
        props.history.push("/assetList");
      });
  };

  const companyCount = (memberIndex) => {
    let count = 0;
    assets[memberIndex].company.map((detail) => {
      count += Number(detail.count);
    });
    return count;
  };

  const personalCount = (memberIndex) => {
    let count = 0;
    assets[memberIndex].personal.map((detail) => {
      count += Number(detail.count);
    });
    return count;
  };

  const onChangeCompanyBrand = (e, index, memberIndex) => {
    assets[memberIndex].company[index].brand = e.target.value;
    console.log(assets);
  };

  const onChangeCompanyCount = (e, index, memberIndex) => {
    assets[memberIndex].company[index].count = e.target.value;
    console.log(assets);
  };

  const onChangePersonalBrand = (e, index, memberIndex) => {
    assets[memberIndex].personal[index].brand = e.target.value;
    console.log(assets);
  };

  const onChangePersonalCount = (e, index, memberIndex) => {
    assets[memberIndex].personal[index].count = e.target.value;
    console.log(assets);
  };

  console.log(assets);

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
                <TableCell align="center" rowSpan={2}>
                  COUNT
                </TableCell>
              </TableRow>
              <TableRow>
                {category.map((detail, index) => (
                  <TableCell key={index}>{detail.name}</TableCell>
                ))}
              </TableRow>
              {assets.map((row, memberIndex) => (
                <TableBody key={memberIndex}>
                  <TableRow key={memberIndex}>
                    <TableCell rowSpan={2} key={row.id} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center" key={memberIndex}>
                      Company
                    </TableCell>
                    {row.company.map((detail, index) => (
                      <TableCell key={detail.index} align="center">
                        <TextField
                          defaultValue={detail.brand}
                          size="small"
                          id="company"
                          align="center"
                          onChange={(e) =>
                            onChangeCompanyBrand(e, index, memberIndex)
                          }
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {companyCount(memberIndex)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Personal</TableCell>
                    {row.personal.map((detail, index) => (
                      <TableCell align="center" key={detail.index}>
                        <TextField
                          defaultValue={detail.brand}
                          size="small"
                          id="company"
                          align="center"
                          onChange={(e) =>
                            onChangePersonalBrand(e, index, memberIndex)
                          }
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {personalCount(memberIndex)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                수정
              </Button>
            </Table>
          </TableContainer>
        )}
      </form>
    </div>
  );
}

export default AssetList;
