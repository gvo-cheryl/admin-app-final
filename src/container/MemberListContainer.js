import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import Title from "../component/Title";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TopMemberList, { AdminMemberList } from "../component/MemberList";

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(5),
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function useConnect() {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/admin/memberList", { withCredentials: true })
      .then((response) => {
        setMemberList(response.data.rData.memberList);
      });
    setLoading(false);
  }, [dispatch]);
  return [memberList, loading];
}

function MemberListContainer(props) {
  const { loginSuccess, response } = useSelector((state) => state.User);
  const memberType = response.rData.member.memberType;
  const classes = useStyles();
  const [memberList, loading] = useConnect();

  if (!loginSuccess) return <Redirect to="/login" />;

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/admin/member-list-update", { members: memberList })
      .then((res) => {
        console.log(res);
        if (res.data.rCode === "SUCCESS") {
          alert("수정완료");
        } else {
          alert("ERROR");
        }
        props.history.push("/memberList");
        <Redirect to="/memberList" />;
      });
  };

  const onChangeContactA = (e, index) => {
    memberList[index].contactA = e.target.value;
  };
  const onChangeContactB = (e, index) => {
    memberList[index].contactB = e.target.value;
  };

  const onChangeMemberType = (e, index) => {
    memberList[index].memberType = e.target.value;
  };

  return (
    <div className={classes.body}>
      <form onSubmit={onSubmit}>
        <Title>Member List</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>ContactA</TableCell>
              <TableCell>ContactB</TableCell>
              <TableCell>JoinedAt</TableCell>
              <TableCell align="right">MemberType</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <div> Loading...</div>
          ) : (
            <>
              {memberType === "ADMIN" ? (
                <AdminMemberList memberList={memberList} />
              ) : (
                <TopMemberList
                  memberList={memberList}
                  onChangeContactA={onChangeContactA}
                  onChangeContactB={onChangeContactB}
                  onChangeMemberType={onChangeMemberType}
                />
              )}
            </>
          )}
        </Table>
      </form>
    </div>
  );
}

export default MemberListContainer;
