import React from 'react';
import CropImageDialog from "./crop-image";
import {useTranslation} from "react-i18next";
import toast from "../util/notification-snackbar.util";
import {IconButton, Paper} from "@mui/material";
import {buildAvatarURL} from "../util/function-utils";
import {DeleteOutline, EditOutlined} from "@mui/icons-material";
import {getDataURISchema} from "./svg-user";

interface IUCMAvatar {
    setResultAvatar: React.Dispatch<React.SetStateAction<File| undefined>>
    deleteAvatar?: () => void,
    backgroundUrl? : string,
    avatarUrl?: string,
    frameHeight?: number
    frameWidth?: number,
    height?: number
    width?: number
}

const UCMAvatar = ({setResultAvatar, avatarUrl, deleteAvatar, ...props}: IUCMAvatar) => {
    const previewCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string>('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [croppedImage, setCroppedImage] = React.useState<File>();
    const {t} = useTranslation(["error"]);

    const onCropSave = (image: File) => {
        setCroppedImage(image)
        setResultAvatar(image)
    }

    const getAvatarSrc = () => {
        if (avatarUrl && !preview && !selectedFile) {
            return buildAvatarURL(avatarUrl)
        } else if (preview && (selectedFile || croppedImage)) {
            return preview;
        } else {
            return props.backgroundUrl || getDataURISchema();
        }
    }

    React.useEffect(() => {
        const image = croppedImage || selectedFile;
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.onerror = function () {
                toast.error(t('upload'))
            };
            reader.readAsDataURL(image);

        } else {
            setPreview('')
        }
    }, [selectedFile, croppedImage]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <label htmlFor="button-file">
                <input
                    type="file"
                    id="button-file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    style={{display: "none"}}
                    ref={fileInputRef}
                    onChange={(event) => {
                        const file = event.target.files && event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                            setResultAvatar(file);
                            setSelectedFile(file);
                            setCroppedImage(undefined);
                            event.target.value = ''
                        } else {
                            setResultAvatar(undefined);
                            setSelectedFile(undefined);
                            setCroppedImage(undefined);
                        }
                    }}
                />
                <Paper
                    elevation={3}
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                        width: props.frameWidth ?? 250,
                        height: props.frameHeight ?? 250
                    }}
                >
                    <img alt={selectedFile ? selectedFile.name : "avatar"}
                         style={{width: '100%', height: '100%'}}
                         src={getAvatarSrc()}/>

                </Paper>
            </label>
            { selectedFile &&
            <IconButton aria-label="edit" size="large" onClick={() => {
                setCroppedImage(undefined)
                setModalOpen(true)
            }}>
                <EditOutlined/>
            </IconButton>
            }
            {
                (selectedFile || avatarUrl) &&
                <IconButton aria-label="delete" size="large" onClick={() => {
                    if (selectedFile || croppedImage) {
                        setResultAvatar(undefined)
                        setCroppedImage(undefined)
                        setSelectedFile(undefined)
                    }
                    if (deleteAvatar && avatarUrl && !selectedFile && !croppedImage) {
                        deleteAvatar()
                    }
                }}>
                    <DeleteOutline />
                </IconButton>
            }
            {
                selectedFile &&
                <CropImageDialog
                    onSave={onCropSave}
                    openCrop={modalOpen}
                    onClose={setModalOpen}
                    imgWidth={props.width}
                    imgHeight={props.height}
                    selectedImage={selectedFile}
                />
            }
            <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
        </div>
    );
};

export default UCMAvatar;