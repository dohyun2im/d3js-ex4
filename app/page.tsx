"use client";

import {
    AddPhotoAlternateRounded,
    ChangeCircle,
    CloudDownloadTwoTone,
    CopyAll,
    Delete,
    FileUploadRounded,
    Mouse,
    PanTool,
    Upload,
} from "@mui/icons-material";
import { Alert, AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { red, teal } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import _ from "lodash";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const DropZoneContainer = styled("div")`
    width: 100%;
    height: 100%;
`;

export default function Home() {
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<string[][]>([]);

    const imageOnDrop = useCallback(async (acceptedFiles: File[]) => {
        setError("");
        if (_.isEmpty(acceptedFiles)) {
            setError("Upload only one file.");
            return;
        }

        const file = acceptedFiles?.[0];
        if (file?.size === 0 || _.isEmpty(file)) {
            setError("The file is missing.");
            return;
        }

        if (file?.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setError("Must be a file with .xlsx extension.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array", cellText: false });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });

            const arr = jsonData.filter((d: string[]) => d.length > 0);
            setData(arr);
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
        onDrop: imageOnDrop,
        noDragEventsBubbling: true,
        noClick: !_.isEmpty(data),
        maxFiles: 1,
    });

    return (
        <SnackbarProvider maxSnack={3}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ background: teal[500] }}>
                        <IconButton size="large" edge="start" color="inherit">
                            <ChangeCircle fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                            Excel To JSON Array
                        </Typography>
                        <Tooltip title="Github" arrow>
                            <a href="https://github.com/dohyun2im" target="_blank" rel="noopener noreferrer">
                                <Avatar alt="dohyun" src="./favicon.ico" sx={{ mr: 0.42 }} />
                            </a>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: "relative",
                    height: "70vh",
                    border: "2px dashed #eee",
                    m: 2,
                    mt: 7,
                    borderRadius: "8px",
                    overflow: "hidden",
                }}>
                <DropZoneContainer {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {!_.isEmpty(data) ? (
                        <>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    pl: 4,
                                    overflow: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    backgroundColor: "transparent",
                                }}>
                                <Typography variant="caption" fontWeight={600}>
                                    [
                                </Typography>
                                {data?.map((d: string[], i) => (
                                    <Typography
                                        key={i}
                                        whiteSpace="nowrap"
                                        fontWeight={600}
                                        sx={{ px: 4 }}
                                        variant="caption">
                                        {`[ ${d.join(", ")} ]`}
                                    </Typography>
                                ))}
                                <Typography fontWeight={600} variant="caption">
                                    ]
                                </Typography>
                            </Box>
                            <Tooltip title="Copy" arrow placement="top">
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 100,
                                    }}>
                                    <CopyToClipboard
                                        text={`[\n\t${data
                                            .map((subArray, index, array) => {
                                                const isLast = index === array.length - 1;
                                                const subArrayStr = `[${subArray.join(", ")}]`;
                                                return isLast ? subArrayStr : subArrayStr + ",\n\t";
                                            })
                                            .join("")}\n]`}
                                        onCopy={() =>
                                            enqueueSnackbar("Copied on your clipboard", {
                                                variant: "success",
                                            })
                                        }>
                                        <IconButton
                                            sx={{
                                                background: "#fff",
                                                "&:hover": { background: "#fff", opacity: 0.7 },
                                            }}>
                                            <CopyAll htmlColor={teal[500]} />
                                        </IconButton>
                                    </CopyToClipboard>
                                </Box>
                            </Tooltip>
                            <Tooltip title="Upload" arrow placement="top">
                                <IconButton
                                    onClick={open}
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 55,
                                        background: "#fff",
                                        "&:hover": { background: "#fff", opacity: 0.7 },
                                    }}>
                                    <Upload />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow placement="top">
                                <IconButton
                                    onClick={() => setData([])}
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        background: "#fff",
                                        "&:hover": { background: "#fff", opacity: 0.7 },
                                    }}>
                                    <Delete htmlColor={red[500]} />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : isDragAccept ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                width: "100%",
                                height: "100%",
                                background: "repeating-linear-gradient(50deg, #fff, #fff 30px, #eee 30px, #eee 60px)",
                            }}
                            {...getRootProps({ className: "dropzone" })}>
                            <CloudDownloadTwoTone
                                sx={{
                                    color: "#5cb9fb",
                                    width: 150,
                                    height: 150,
                                }}
                            />

                            <Typography
                                variant="subtitle2"
                                display="flex"
                                alignItems="center"
                                sx={{
                                    padding: "6px 30px",
                                    borderRadius: 1,
                                    color: "#666",
                                    backgroundColor: "#fff",
                                    border: "2.5px dashed #5cb9fb",
                                    opacity: 0.6,
                                }}>
                                <AddPhotoAlternateRounded sx={{ mr: 1, mb: 0.5 }} />
                                Put the file in the zone !
                            </Typography>
                        </Box>
                    ) : (
                        !isDragAccept &&
                        !isDragActive && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    ":hover": {
                                        transform: "scale(1.1)",
                                    },
                                }}>
                                <Avatar sx={{ p: 5, mb: 2 }}>
                                    <FileUploadRounded
                                        sx={{
                                            width: 100,
                                            height: 100,
                                        }}
                                    />
                                </Avatar>

                                <Typography
                                    variant="subtitle2"
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                        padding: "8px 16px",
                                        borderRadius: 1,
                                        color: "#666666",
                                        backgroundColor: "#eee",
                                    }}>
                                    <Mouse sx={{ fontSize: 16 }} />
                                    Click or
                                    <PanTool sx={{ fontSize: 16, ml: 1, mr: 0.5 }} />
                                    Drag to upload your Excel file (.xlsx).
                                </Typography>
                            </Box>
                        )
                    )}
                </DropZoneContainer>
            </Box>
            <Box sx={{ px: 4 }}>{error && <Alert severity="error">{error}</Alert>}</Box>
        </SnackbarProvider>
    );
}
