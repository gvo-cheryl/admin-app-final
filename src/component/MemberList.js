import {
  NativeSelect,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Button,
} from "@material-ui/core";

export function AdminMemberList({ memberList }) {
  return (
    <>
      <TableBody>
        {memberList.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.contactA}</TableCell>
            <TableCell>{row.contactB}</TableCell>
            <TableCell>{row.joinedAt.substring(0, 16)}</TableCell>
            <TableCell align="right">{row.role}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export default function TopMemberList({
  memberList,
  onChangeContactA,
  onChangeContactB,
  onChangeRole,
}) {
  return (
    <>
      <TableBody>
        {memberList.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <TextField
                id="standard-basic"
                onChange={(e) => onChangeContactA(e, index)}
                defaultValue={row.contactA}
              />
            </TableCell>
            <TableCell>
              <TextField
                id="standard-basic"
                onChange={(e) => onChangeContactB(e, index)}
                defaultValue={row.contactB}
              />
            </TableCell>
            <TableCell>{row.joinedAt.substring(0, 16)}</TableCell>
            <TableCell align="right">
              <NativeSelect
                labelid="label"
                id="select"
                defaultValue={row.role}
                onChange={(e) => onChangeRole(e, index)}
                selected
              >
                <option value="TOP">TOP</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </NativeSelect>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={7} align="center">
            <Button type="submit" variant="outlined" size="small">
              수정
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
