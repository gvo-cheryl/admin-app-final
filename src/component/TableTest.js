import React, { useState, useEffect } from "react";
import { Tablet } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
        .get("/assettest", { withCredentials: true }, {})
        .then((response) => {
          console.log(response.data.rData);
        });
    }

    setLoading(false);
  }, [member.adminId, member.memberType]);

  return [assets, category, loading, row];
}

function TableTest() {
  const [assets, loading] = useConnect();
  return <div>test</div>;
}

export default TableTest;
