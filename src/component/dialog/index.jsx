import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "utils/Api";

const INITAL_STATE = { name: "", group: "jobs", url: "http://localhost:8080/taima/api/scheduler", cron: "0 0/10 * 1/1 * ? *" }

const BasicDialog = (props) => {
    const { onClose, open, onSave } = props;
    const [input, setInput] = useState(INITAL_STATE);

    const handleClose = () => {
      setInput(INITAL_STATE)
      onClose();
    };

    const handleChange = (e) => setInput({...input, [e.target.name]: e.target.value})

    const handleSave = async () => {
        await onSave({
            ...input,
            isCron: true,
            processes: [
                {
                    url: input.url,
                    processType: 0
                }
            ]
        });

        onClose();
    }
  
    return (
      <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <DialogContent>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <TextField 
                    name="name"
                    fullWidth
                    value={input.name}
                    onChange={handleChange}
                    placeholder="job name"
                />
                <TextField 
                    name="group"
                    fullWidth
                    value={input.group}
                    onChange={handleChange}
                    placeholder="job group"
                />
            </Stack>
            <Stack sx={{ marginTop: "1rem" }} direction="row">
                <TextField
                    name="url"
                    placeholder="url"
                    value={input.url}
                    onChange={handleChange}
                    fullWidth
                />
            </Stack>
            <Stack sx={{ marginTop: "1rem" }} direction="row">
                <TextField
                    name="cron"
                    placeholder="cron"
                    value={input.cron}
                    onChange={handleChange}
                    fullWidth
                />
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleSave} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default BasicDialog;