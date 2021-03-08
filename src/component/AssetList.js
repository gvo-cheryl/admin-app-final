import { TextField } from "@material-ui/core";

function AssetList({ row, onChange }) {
  return (
    <TableCell align="center">
      <TextField
        //defaultValue={detail.brand}
        size="small"
        id="company"
        align="center"
        //onChange={(e) => onChange(e, index, memberIndex)}
      />
    </TableCell>
  );
}

export default AssetList;
